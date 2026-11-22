import 'server-only';
import { headers } from 'next/headers';
import { isTrustedLocalOrigin } from '@/lib/security/local-request';

export async function assertLocalAction(): Promise<void> {
  if (!isTrustedLocalOrigin(await headers())) {
    throw new Error('Origem não autorizada.');
  }
}
