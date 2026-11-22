'use client';

import React from 'react';
import { SessionHeader } from '@/components/kits/avaliacao/session-header';
import { AuthGuard } from '@/components/kits/avaliacao/auth-guard';
import { TraineeMonitorTable } from '@/components/kits/avaliacao/trainee-monitor-table';
import { useAvaliacaoRepository } from '@/lib/kits/avaliacao/repository';
import { useSession } from '@/lib/kits/avaliacao/auth-store';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Clock, CheckCircle, Hourglass, WarningCircle } from '@phosphor-icons/react';

export default function AvaliacaoDashboardTrainerPage() {
  const { user } = useSession();
  const { trainees, metrics, reopenExam, exportTraineesCsv } = useAvaliacaoRepository();
  const actionCode = user?.actionCode || 'FD-2026-TURMA4';

  return (
    <AuthGuard allowedRole="trainer">
      <div className="flex-1 flex flex-col" data-blueprint="cockpit" data-kit="avaliacao">
        <SessionHeader />

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
          {/* Topo da Turma & Contadores de Estado */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Monitorização de Turma</h1>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
                  {actionCode}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Acompanhamento individual em tempo real, gestão de tempos e emissão da pauta de avaliação.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-lg border border-border">
              <span>Sessão: <strong>01h 15m</strong> decorridos</span>
            </div>
          </div>

          {/* Cartões Rápidos de Resumo */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" data-region="summary">
            <Card className="bg-card/60">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Total Turma</div>
                  <div className="text-xl font-bold font-mono">{metrics.total}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-status-live/10 text-status-live-foreground">
                  <Clock size={20} className="animate-pulse" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Em Prova</div>
                  <div className="text-xl font-bold font-mono text-status-live-foreground dark:text-status-live-foreground">
                    {metrics.inProgressCount}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Submetidos</div>
                  <div className="text-xl font-bold font-mono">{metrics.completedCount}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-status-drift/10 text-status-drift-foreground">
                  <Hourglass size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Pendentes / Ausentes</div>
                  <div className="text-xl font-bold font-mono text-status-drift-foreground dark:text-status-drift-foreground">
                    {metrics.pendingCount + metrics.timedOutCount}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabela Interativa de Formandos */}
          <section data-region="content">
            <TraineeMonitorTable
              trainees={trainees}
              actionCode={actionCode}
              onReopenExam={reopenExam}
              onExportCsv={exportTraineesCsv}
            />
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}
