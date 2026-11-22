'use client';

import React from 'react';
import { SessionHeader } from '@/components/avaliacao-dashboard/session-header';
import { AuthGuard } from '@/components/avaliacao-dashboard/auth-guard';
import { TelemetrySyncCard } from '@/components/avaliacao-dashboard/telemetry-sync-card';
import { useAvaliacaoRepository } from '@/lib/avaliacao/repository';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, CheckCircle, Clock, ChartBar } from '@phosphor-icons/react';

export default function AvaliacaoDashboardAdminPage() {
  const { services, auditLog, isSyncing, metrics, forceSync } = useAvaliacaoRepository();

  return (
    <AuthGuard allowedRole="admin">
      <div className="flex-1 flex flex-col">
        <SessionHeader />

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
          {/* Top Banner & KPI Stat Cards */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Cockpit de Administração & Telemetria</h1>
            <p className="text-sm text-muted-foreground">
              Monitorização centralizada das sincronizações da infraestrutura de exames e turmas ativas.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
                  Turmas Ativas
                </CardTitle>
                <Users size={16} className="text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono">1</div>
                <p className="text-xs text-muted-foreground mt-1">FD-2026-TURMA4</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
                  Total de Formandos
                </CardTitle>
                <ChartBar size={16} className="text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono">{metrics.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.completedCount} concluídos / {metrics.inProgressCount} em prova
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
                  Taxa Média de Sucesso
                </CardTitle>
                <CheckCircle size={16} className="text-status-live-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono text-status-live-foreground dark:text-status-live-foreground">
                  {metrics.approvalRate.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Média: {metrics.averageScore.toFixed(1)} / 20 valores
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
                  Latência de Sync p95
                </CardTitle>
                <Clock size={16} className="text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono">18 ms</div>
                <p className="text-xs text-muted-foreground mt-1">SQLite WAL local</p>
              </CardContent>
            </Card>
          </div>

          {/* Componente de Telemetria e Auditoria */}
          <TelemetrySyncCard
            services={services}
            auditLog={auditLog}
            isSyncing={isSyncing}
            onForceSync={forceSync}
          />
        </main>
      </div>
    </AuthGuard>
  );
}
