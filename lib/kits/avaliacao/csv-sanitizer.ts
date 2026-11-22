/**
 * DU CSV Sanitizer (RFC 4180 & Formula Injection Mitigation)
 * Previne injeção de fórmulas (=, +, -, @, \t, \r) em Microsoft Excel / Google Sheets
 * e garante citação estrita de campos.
 */

const DANGEROUS_PREFIXES = ['=', '+', '-', '@', '\t', '\r'];

export function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }

  let str = String(value);

  // Mitigação de Formula Injection: prepend ' se começar por caractere de gatilho de fórmula
  if (DANGEROUS_PREFIXES.some((prefix) => str.startsWith(prefix))) {
    str = `'${str}`;
  }

  // RFC 4180: duplicar aspas internas e envolver entre aspas
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

export function generateCsv(headers: string[], rows: (string | number | undefined | null)[][]): string {
  const headerLine = headers.map(sanitizeCsvCell).join(',');
  const rowLines = rows.map((row) => row.map(sanitizeCsvCell).join(','));
  return [headerLine, ...rowLines].join('\r\n');
}

export function downloadCsv(filename: string, csvContent: string): void {
  if (typeof window === 'undefined') return;
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
