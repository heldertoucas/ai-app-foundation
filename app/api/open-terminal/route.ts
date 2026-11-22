import { NextResponse } from 'next/server';
import { execFile } from 'node:child_process';
import os from 'node:os';
import { promisify } from 'node:util';
import { isTrustedLocalRequest } from '@/lib/security/local-request';

const execFileAsync = promisify(execFile);

const ALLOWED_COMMANDS = new Set([
  'pnpm dev',
  'pnpm start',
  'pnpm foundation:check',
]);

const OPEN_TERMINAL_SCRIPT = [
  'on run argv',
  'set commandText to "cd " & quoted form of (item 1 of argv) & " && " & (item 2 of argv)',
  'tell application "Terminal"',
  'activate',
  'do script commandText',
  'end tell',
  'end run',
];

export async function POST(request: Request) {
  if (!isTrustedLocalRequest(request)) {
    return NextResponse.json({ success: false, error: 'Origem não autorizada.' }, { status: 403 });
  }

  if (os.platform() !== 'darwin') {
    return NextResponse.json(
      { success: false, error: 'Abertura direta de terminal desativada por conformidade em ambientes não-macOS.' },
      { status: 403 },
    );
  }

  let command: string;
  try {
    const body = await request.json();
    command = String(body.command ?? '').trim();
  } catch {
    return NextResponse.json({ success: false, error: 'Pedido inválido.' }, { status: 400 });
  }

  if (!ALLOWED_COMMANDS.has(command)) {
    return NextResponse.json(
      { success: false, error: 'Comando não autorizado na whitelist de execução.' },
      { status: 400 },
    );
  }

  try {
    const args = OPEN_TERMINAL_SCRIPT.flatMap((line) => ['-e', line]);
    await execFileAsync('osascript', [...args, process.cwd(), command], { timeout: 5000 });
    return NextResponse.json({ success: true, command });
  } catch (err) {
    console.error('[open-terminal] Erro ao disparar Terminal.app:', err);
    return NextResponse.json({ success: false, error: 'Não foi possível abrir o Terminal.' }, { status: 500 });
  }
}
