import { NextResponse, type NextRequest } from 'next/server';
import { isAllowedHost } from '@/lib/security/local-request';

function isEncodedBlueprintPath(pathname: string): boolean {
  try {
    const decoded = decodeURIComponent(pathname);
    return decoded !== pathname && decoded.toLowerCase().startsWith('/blueprints/');
  } catch {
    return true;
  }
}

export function proxy(request: NextRequest) {
  if (!isAllowedHost(request.headers.get('host'))) {
    return new NextResponse('Host não autorizado.', { status: 403 });
  }
  if (isEncodedBlueprintPath(request.nextUrl.pathname)) {
    return new NextResponse('Não encontrado.', { status: 404 });
  }
  return NextResponse.next();
}

export const config = { matcher: '/:path*' };
