export interface SiteSettingEntry {
  key: string;
  label: string;
  value: string;
}

export const DEFAULT_SETTINGS: SiteSettingEntry[] = [
  { key: "phone_primary",    label: "Primary Phone",            value: "+234 (0) 800 360 AKOY" },
  { key: "phone_whatsapp",   label: "WhatsApp Number",          value: "2348123456789" },
  { key: "email_general",    label: "General Email",            value: "contact@akoy360.com" },
  { key: "email_diaspora",   label: "Diaspora Email",           value: "diaspora@akoy360.com" },
  { key: "address_hq",       label: "HQ Address",               value: "Victoria Island / Ikoyi Commercial Corridor, Lagos, Nigeria" },
  { key: "address_london",   label: "London Desk Address",      value: "London, United Kingdom" },
  { key: "address_houston",  label: "Houston Desk Address",     value: "Houston, Texas, USA" },
  { key: "social_twitter",   label: "Twitter / X URL",          value: "https://twitter.com/akoy360" },
  { key: "social_instagram", label: "Instagram URL",            value: "https://instagram.com/akoy360" },
  { key: "social_linkedin",  label: "LinkedIn URL",             value: "https://linkedin.com/company/akoy360" },
  { key: "whatsapp_message", label: "Default WhatsApp Message",  value: "Hello AKOY 360, I would like to learn more about your services." },
  { key: "office_hours",     label: "Office Hours",              value: "Mon - Sat, 8:00 AM - 6:00 PM (WAT)" },
];

export const SETTING_GROUPS: { title: string; keys: string[] }[] = [
  { title: "Contact Details",  keys: ["phone_primary", "phone_whatsapp", "email_general", "email_diaspora", "office_hours"] },
  { title: "Office Locations", keys: ["address_hq", "address_london", "address_houston"] },
  { title: "Social Media",     keys: ["social_twitter", "social_instagram", "social_linkedin"] },
  { title: "Messaging",        keys: ["whatsapp_message"] },
];

const STORAGE_KEY = "akoy360_site_settings";

export function loadSettings(): SiteSettingEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore parse errors */ }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: SiteSettingEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function resetSettings(): SiteSettingEntry[] {
  localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_SETTINGS;
}
