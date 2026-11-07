 import { useCallback } from "react";
import { supabase } from "../lib/supabase";

// ─── Constants ────────────────────────────────────────────────────────────────

const HEROES_BUCKET  = "division-heroes";
const GALLERY_BUCKET = "division-gallery";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UploadResult {
  /** The full public URL of the uploaded file, ready to store in the DB. */
  url: string | null;
  error: string | null;
}

/** Result for a single file in a batch upload — index preserves the original file order. */
export interface FileUploadResult {
  /** Position of this file in the original input array. */
  index: number;
  /** Public URL if the upload succeeded, null otherwise. */
  url: string | null;
  /** Error message if the upload failed, null otherwise. */
  error: string | null;
  /** Original file name, for display in error messages. */
  fileName: string;
}

interface UseStorageReturn {
  /**
   * Upload a hero image for a division.
   * The file is stored at: division-heroes/<divisionId>/hero.<ext>
   * Returns the public URL to save back to divisions.image.
   */
  uploadHeroImage: (divisionId: string, file: File) => Promise<UploadResult>;
  /**
   * Upload one or more gallery media files for a division.
   * Files are stored at: division-gallery/<divisionId>/<timestamp>-<filename>
   * Returns one result per input file, preserving the original order via `index`.
   * This lets the caller map each URL back to the exact gallery item it belongs to,
   * even when uploads finish out of order (Promise.all does not preserve completion order).
   */
  uploadGalleryFiles: (divisionId: string, files: File[]) => Promise<{ results: FileUploadResult[] }>;
  /**
   * Delete a file from storage by its full public URL.
   * Works for both buckets — the bucket is inferred from the URL.
   */
  deleteFile: (publicUrl: string) => Promise<{ error: string | null }>;
  /** Get the public URL for any stored object by bucket + path. */
  getPublicUrl: (bucket: string, path: string) => string;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useStorage(): UseStorageReturn {

  const getPublicUrl = useCallback((bucket: string, path: string): string => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }, []);

  // ── Hero image ─────────────────────────────────────────────────────────────

  const uploadHeroImage = useCallback(async (
    divisionId: string,
    file: File,
  ): Promise<UploadResult> => {
    const ext  = file.name.split(".").pop() ?? "jpg";
    const path = `${divisionId}/hero.${ext}`;

    const { error } = await supabase.storage
      .from(HEROES_BUCKET)
      .upload(path, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) return { url: null, error: error.message };

    return { url: getPublicUrl(HEROES_BUCKET, path), error: null };
  }, [getPublicUrl]);

  // ── Gallery media ──────────────────────────────────────────────────────────

  const uploadGalleryFiles = useCallback(async (
    divisionId: string,
    files: File[],
  ): Promise<{ results: FileUploadResult[] }> => {
    // Upload each file and tag the result with its original index so the
    // caller can map URLs back to the correct gallery item — even if uploads
    // finish out of order (Promise.all doesn't preserve completion order).
    const results = await Promise.all(
      files.map(async (file, index): Promise<FileUploadResult> => {
        const timestamp = Date.now() + index; // avoid identical timestamps causing path collisions
        const safeName  = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path      = `${divisionId}/${timestamp}-${safeName}`;

        const { error } = await supabase.storage
          .from(GALLERY_BUCKET)
          .upload(path, file, { contentType: file.type });

        if (error) {
          return { index, url: null, error: error.message, fileName: file.name };
        }
        return { index, url: getPublicUrl(GALLERY_BUCKET, path), error: null, fileName: file.name };
      }),
    );

    return { results };
  }, [getPublicUrl]);

  // ── Delete by public URL ───────────────────────────────────────────────────

  const deleteFile = useCallback(async (
    publicUrl: string,
  ): Promise<{ error: string | null }> => {
    let bucket: string;
    let path: string;

    if (publicUrl.includes(`/${HEROES_BUCKET}/`)) {
      bucket = HEROES_BUCKET;
      path   = publicUrl.split(`/${HEROES_BUCKET}/`)[1];
    } else if (publicUrl.includes(`/${GALLERY_BUCKET}/`)) {
      bucket = GALLERY_BUCKET;
      path   = publicUrl.split(`/${GALLERY_BUCKET}/`)[1];
    } else {
      return { error: null };
    }

    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  return { uploadHeroImage, uploadGalleryFiles, deleteFile, getPublicUrl };
}
