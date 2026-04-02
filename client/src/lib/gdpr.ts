/**
 * GDPR Compliance Helpers
 * Handles consent management, data access, and deletion requests
 */

export interface GDPRConsent {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: number;
}

const CONSENT_STORAGE_KEY = "gdpr-consent";

/**
 * Get current user consent status
 */
export function getConsent(): GDPRConsent {
  if (typeof localStorage === "undefined") {
    return {
      analytics: false,
      marketing: false,
      functional: true,
      timestamp: Date.now(),
    };
  }

  const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  return {
    analytics: false,
    marketing: false,
    functional: true,
    timestamp: Date.now(),
  };
}

/**
 * Update user consent preferences
 */
export function setConsent(consent: Partial<GDPRConsent>): void {
  if (typeof localStorage === "undefined") return;

  const current = getConsent();
  const updated: GDPRConsent = {
    ...current,
    ...consent,
    timestamp: Date.now(),
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent("gdpr-consent-updated", { detail: updated }));
}

/**
 * Check if user has given consent for a specific category
 */
export function hasConsent(category: keyof Omit<GDPRConsent, "timestamp">): boolean {
  const consent = getConsent();
  return consent[category] || false;
}

/**
 * Withdraw all consent
 */
export function withdrawConsent(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}

/**
 * Generate GDPR data export payload
 * In production, this would fetch actual user data from backend
 */
export function generateDataExportPayload(email: string): object {
  return {
    email,
    exportedAt: new Date().toISOString(),
    dataCategories: {
      newsletter: "Email subscription data",
      contact: "Contact form submissions",
      analytics: "Website usage analytics",
      preferences: "User preferences and language settings",
    },
    note: "Please contact support@hiddennarratives.com for complete data export",
  };
}

/**
 * Request data deletion
 * In production, this would trigger backend deletion process
 */
export async function requestDataDeletion(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // In production, call backend API
    console.log(`Data deletion request for: ${email}`);
    return {
      success: true,
      message: "Your data deletion request has been submitted. We will process it within 30 days.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to submit data deletion request. Please try again.",
    };
  }
}

/**
 * Request data access/export
 * In production, this would trigger backend export process
 */
export async function requestDataAccess(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // In production, call backend API
    console.log(`Data access request for: ${email}`);
    return {
      success: true,
      message: "Your data access request has been submitted. You will receive your data within 30 days.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to submit data access request. Please try again.",
    };
  }
}

/**
 * Get GDPR privacy notice text
 */
export function getPrivacyNotice(language: "en" | "ar"): string {
  if (language === "en") {
    return `We use cookies and analytics to improve your experience. By continuing, you consent to our use of cookies. 
    See our Privacy Policy for details on how we handle your data.`;
  }
  return `نحن نستخدم ملفات تعريف الارتباط والتحليلات لتحسين تجربتك. بالمتابعة، فإنك توافق على استخدامنا لملفات تعريف الارتباط. 
  راجع سياسة الخصوصية الخاصة بنا للحصول على تفاصيل حول كيفية التعامل مع بيانات المستخدم.`;
}
