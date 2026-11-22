import { describe, expect, it } from 'vitest';
import { isTrustedLocalRequest } from '@/lib/security/local-request';

const request = (headers: Record<string, string>) =>
  new Request('http://localhost:4300/api/open-terminal', { method: 'POST', headers });
const valid = { origin: 'http://localhost:4300', host: 'localhost:4300', 'content-type': 'application/json' };

describe('isTrustedLocalRequest', () => {
  it('accepts a same-machine JSON request', () => expect(isTrustedLocalRequest(request(valid))).toBe(true));
  it('accepts JSON with a charset', () =>
    expect(isTrustedLocalRequest(request({ ...valid, 'content-type': 'application/json; charset=utf-8' }))).toBe(true));
  it('rejects an external origin', () =>
    expect(isTrustedLocalRequest(request({ ...valid, origin: 'https://evil.example' }))).toBe(false));
  it('rejects a null origin', () => expect(isTrustedLocalRequest(request({ ...valid, origin: 'null' }))).toBe(false));
  it('rejects a missing origin', () => {
    const { origin: _origin, ...rest } = valid;
    expect(isTrustedLocalRequest(request(rest))).toBe(false);
  });
  it('rejects DNS rebinding through Host', () =>
    expect(isTrustedLocalRequest(request({ ...valid, host: 'evil.example:4300' }))).toBe(false));
  it('rejects text/plain requests that skip preflight', () =>
    expect(isTrustedLocalRequest(request({ ...valid, 'content-type': 'text/plain' }))).toBe(false));
});
