import { describe, it, expect } from 'vitest';
import { sanitizeCsvCell, generateCsv } from '../csv-sanitizer';
import { safeLocalStorage, safeSessionStorage } from '../safe-storage';

describe('Avaliação Security & Utilities', () => {
  describe('CSV Sanitizer & Formula Injection Defense', () => {
    it('prepends single quote to formula injection triggers', () => {
      expect(sanitizeCsvCell('=SUM(1+1)')).toBe(`"'=SUM(1+1)"`);
      expect(sanitizeCsvCell('+cmd|calc')).toBe(`"'+cmd|calc"`);
      expect(sanitizeCsvCell('-10+20')).toBe(`"'-10+20"`);
      expect(sanitizeCsvCell('@external_feed')).toBe(`"'@external_feed"`);
      expect(sanitizeCsvCell('\tmalicious_tab')).toBe(`"'\tmalicious_tab"`);
      expect(sanitizeCsvCell('\rreturn_leak')).toBe(`"'\rreturn_leak"`);
    });

    it('escapes quotes according to RFC 4180', () => {
      expect(sanitizeCsvCell('Normal Text')).toBe(`"Normal Text"`);
      expect(sanitizeCsvCell('Text with "quotes"')).toBe(`"Text with ""quotes"""`);
      expect(sanitizeCsvCell(null)).toBe('""');
      expect(sanitizeCsvCell(undefined)).toBe('""');
    });

    it('generates well-formed CSV documents', () => {
      const headers = ['ID', 'Nome', 'Nota'];
      const rows = [
        ['TRN-001', 'Ana Silva', 18.5],
        ['TRN-002', '=cmd', null],
      ];
      const csv = generateCsv(headers, rows);
      expect(csv).toContain(`"ID","Nome","Nota"`);
      expect(csv).toContain(`"TRN-001","Ana Silva","18.5"`);
      expect(csv).toContain(`"TRN-002","'=cmd",""`);
    });
  });

  describe('SafeStorage Resiliency', () => {
    it('saves and retrieves items without crashing', () => {
      safeLocalStorage.setItem('test_key', 'test_value');
      expect(safeLocalStorage.getItem('test_key')).toBe('test_value');
      safeLocalStorage.removeItem('test_key');
      expect(safeLocalStorage.getItem('test_key')).toBeNull();

      safeSessionStorage.setItem('sess_key', 'sess_val');
      expect(safeSessionStorage.getItem('sess_key')).toBe('sess_val');
      safeSessionStorage.removeItem('sess_key');
      expect(safeSessionStorage.getItem('sess_key')).toBeNull();
    });
  });
});
