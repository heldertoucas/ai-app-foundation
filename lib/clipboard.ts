/**
 * Shared resilient clipboard utility for dashboard actions and viewers.
 * Handles CRLF sanitization to prevent terminal injection and provides
 * fallback for non-secure contexts (e.g. HTTP on local network).
 */
export async function copyToClipboard(text: string): Promise<{ success: boolean; error?: string }> {
  if (!text) {
    return { success: false, error: 'No content to copy' };
  }

  // 1. Sanitize payload: strip harmful CRLF newlines and non-printable control characters
  const sanitized = text.replace(/\r\n/g, '\n').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // 2. Modern Clipboard API (available in secure contexts: localhost, HTTPS)
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(sanitized);
      return { success: true };
    } catch {
      // Fall through to fallback
    }
  }

  // 3. Fallback for non-secure contexts (e.g. Windows HTTP LAN testing)
  if (typeof document !== 'undefined') {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = sanitized;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      textarea.setAttribute('readonly', '');
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (successful) {
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to copy to clipboard' };
    }
  }

  return { success: false, error: 'Clipboard API not supported' };
}
