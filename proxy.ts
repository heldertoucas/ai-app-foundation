import path from 'node:path';
import { NextResponse, type NextRequest } from 'next/server';
import { isAllowedHost } from '@/lib/security/local-request';

function normalizePathname(raw: string): string | null {
  try {
    let decoded = raw;
    for (let i = 0; i < 3; i++) {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    }
    if (decoded.includes('%')) return null;
    const normalized = path.posix.normalize(decoded).replace(/\/+$/, '') || '/';
    return normalized.toLowerCase();
  } catch {
    return null;
  }
}

function isBlockedCdnMockup(normalizedPath: string): boolean {
  if (normalizedPath.startsWith('/html-kit/examples')) return true;
  if (/^\/blueprints\/[^/]+\/mockups\/(clean|mission-control)(\.html)?$/.test(normalizedPath)) return true;
  return false;
}

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  if (forwardedHost && !isAllowedHost(forwardedHost)) {
    return new NextResponse('Host não autorizado.', { status: 403 });
  }
  if (!isAllowedHost(request.headers.get('host'))) {
    return new NextResponse('Host não autorizado.', { status: 403 });
  }
  const normalized = normalizePathname(request.nextUrl.pathname);
  if (!normalized || isBlockedCdnMockup(normalized)) {
    return new NextResponse('Não encontrado.', { status: 404 });
  }
  return NextResponse.next();
}

export const config = { matcher: '/:path*' };
