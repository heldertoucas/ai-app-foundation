import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import os from 'os';

const ALLOWED_COMMANDS = new Set([
  'pnpm dev',
  'pnpm start',
  'pnpm foundation:check',
  'open public/html-kit/templates/du-avaliacao-dashboard.html',
  'open public/html-kit/templates/du-dashboard.html',
  'open public/html-kit/templates/starter-cockpit.html',
  'open public/html-kit/templates/template-app-shell.html',
  'open public/html-kit/templates/du-html-app-template.html',
]);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  // 1. Guardrail de Plataforma: estritamente restrito a macOS (darwin)
  if (os.platform() !== 'darwin') {
    return NextResponse.json(
      { success: false, error: 'Abertura direta de terminal desativada por conformidade em ambientes não-macOS.' },
      { status: 403, headers: CORS_HEADERS }
    );
  }

  try {
    const body = await request.json();
    const command = String(body.command || 'pnpm dev').trim();

    // 2. Guardrail de Whitelist estrita (anti-injection & CML-Defender safe)
    if (!ALLOWED_COMMANDS.has(command)) {
      return NextResponse.json(
        { success: false, error: 'Comando não autorizado na whitelist de execução.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const workDir = process.cwd();
    // Executa AppleScript nativo do macOS para abrir a app Terminal na raiz do repositório
    const script = `tell application "Terminal" to do script "cd '${workDir}' && ${command}" activate`;
    
    exec(`osascript -e ${JSON.stringify(script)}`, (err) => {
      if (err) console.error('[open-terminal] Erro ao disparar Terminal.app:', err);
    });

    return NextResponse.json({ success: true, command }, { headers: CORS_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500, headers: CORS_HEADERS });
  }
}
