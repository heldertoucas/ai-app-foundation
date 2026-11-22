const ALLOWED_ORIGINS = new Set(['http://localhost:4300', 'http://127.0.0.1:4300']);
const ALLOWED_HOSTS = new Set(['localhost:4300', '127.0.0.1:4300']);

export function isAllowedHost(host: string | null): boolean {
  return Boolean(host && ALLOWED_HOSTS.has(host));
}

/** Validates browser origin and Host. It depends on the server being bound to loopback (WP-07). */
export function isTrustedLocalOrigin(headers: Headers): boolean {
  const origin = headers.get('origin');
  return Boolean(origin && ALLOWED_ORIGINS.has(origin) && isAllowedHost(headers.get('host')));
}

/** JSON forces a CORS preflight, which this app never approves. */
export function isTrustedLocalRequest(request: Request): boolean {
  const contentType = request.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase();
  return isTrustedLocalOrigin(request.headers) && contentType === 'application/json';
}
