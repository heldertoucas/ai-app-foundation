/**
 * Shared resilient clipboard utility for dashboard actions and viewers.
 * Handles CRLF sanitization to prevent terminal injection and provides
 * fallback for non-secure contexts (e.g. HTTP on local network).
 */
export async function copyToClipboard(text: string): Promise<{ success: boolean; error?: string }> {
  if (!text) {
    return { success: false, error: 'No content to copy' };
  }

  // 1. Sanitize payload: strip non-printable control characters
  const sanitized = text.replace(/\r\n/g, '\n').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  return executeCopy(sanitized);
}

/**
 * Hardened clipboard utility specifically for terminal commands.
 * Strips ALL newlines (\r and \n) to eliminate pastejacking execution risks (SEC-03).
 */
export async function copyTerminalCommand(command: string): Promise<{ success: boolean; error?: string }> {
  if (!command) {
    return { success: false, error: 'No command to copy' };
  }

  // Strictly eliminate all line breaks and control characters to prevent immediate execution on paste
  const safeCommand = command
    .replace(/[\r\n]+/g, ' ')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();

  return executeCopy(safeCommand);
}

async function executeCopy(payload: string): Promise<{ success: boolean; error?: string }> {
  // 2. Modern Clipboard API (available in secure contexts: localhost, HTTPS)
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(payload);
      return { success: true };
    } catch {
      // Fall through to fallback
    }
  }

  // 3. Fallback for non-secure contexts (e.g. Windows HTTP LAN testing)
  if (typeof document !== 'undefined') {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = payload;
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

