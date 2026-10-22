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
   * Returns an array of public URLs to append to divisions.gallery_images.
   */
  uploadGalleryFiles: (divisionId: string, files: File[]) => Promise<{ urls: string[]; errors: string[] }>;
  /**
   * Delete a file from storage by its full public URL.
   * Works for both buckets — the bucket is inferred from the URL.
   */
  deleteFile: (publicUrl: string) => Promise<{ error: string | null }>;
  /** Get the public URL for any stored object by bucket + path. */
  getPublicUrl: (bucket: string, path: string) => string;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Handles file uploads and deletions for division media.
 * Used in the Gallery admin page.
 *
 * @example
 * const { uploadHeroImage, uploadGalleryFiles, deleteFile } = useStorage();
 *
 * // Upload hero
 * const { url, error } = await uploadHeroImage(divisionId, file);
 * if (!error) await updateDivision(divisionId, { image: url });
 *
 * // Upload gallery
 * const { urls } = await uploadGalleryFiles(divisionId, files);
 * await updateDivision(divisionId, { gallery_images: [...existing, ...urls] });
 */
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
        upsert: true,          // overwrite the existing hero if present
        contentType: file.type,
      });

    if (error) return { url: null, error: error.message };

    return { url: getPublicUrl(HEROES_BUCKET, path), error: null };
  }, [getPublicUrl]);

  // ── Gallery media ──────────────────────────────────────────────────────────

  const uploadGalleryFiles = useCallback(async (
    divisionId: string,
    files: File[],
  ): Promise<{ urls: string[]; errors: string[] }> => {
    const urls: string[]   = [];
    const errors: string[] = [];

    await Promise.all(
      files.map(async (file) => {
        const timestamp = Date.now();
        const safeName  = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path      = `${divisionId}/${timestamp}-${safeName}`;

        const { error } = await supabase.storage
          .from(GALLERY_BUCKET)
          .upload(path, file, { contentType: file.type });

        if (error) {
          errors.push(`${file.name}: ${error.message}`);
        } else {
          urls.push(getPublicUrl(GALLERY_BUCKET, path));
        }
      }),
    );

    return { urls, errors };
  }, [getPublicUrl]);

  // ── Delete by public URL ───────────────────────────────────────────────────

  const deleteFile = useCallback(async (
    publicUrl: string,
  ): Promise<{ error: string | null }> => {
    // Determine which bucket owns this URL and extract the path after the bucket name
    let bucket: string;
    let path: string;

    if (publicUrl.includes(`/${HEROES_BUCKET}/`)) {
      bucket = HEROES_BUCKET;
      path   = publicUrl.split(`/${HEROES_BUCKET}/`)[1];
    } else if (publicUrl.includes(`/${GALLERY_BUCKET}/`)) {
      bucket = GALLERY_BUCKET;
      path   = publicUrl.split(`/${GALLERY_BUCKET}/`)[1];
    } else {
      // External URL (Unsplash, etc.) — nothing to delete in storage
      return { error: null };
    }

    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  return { uploadHeroImage, uploadGalleryFiles, deleteFile, getPublicUrl };
}

