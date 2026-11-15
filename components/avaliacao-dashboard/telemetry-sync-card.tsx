'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowsClockwise,
  CheckCircle,
  Warning,
  CircleNotch,
  Database,
  Table,
  Cpu,
  ClockAfternoon,
} from '@phosphor-icons/react';
import { SyncServiceHealth, AuditEvent } from '@/lib/avaliacao/types';

interface TelemetrySyncCardProps {
  services: SyncServiceHealth[];
  auditLog: AuditEvent[];
  isSyncing: boolean;
  onForceSync: () => Promise<boolean>;
}

export function TelemetrySyncCard({
  services,
  auditLog,
  isSyncing,
  onForceSync,
}: TelemetrySyncCardProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'srv-sheets':
        return <Table size={20} className="text-emerald-500" />;
      case 'srv-db':
        return <Database size={20} className="text-blue-500" />;
      default:
        return <Cpu size={20} className="text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Barra de Controlo de Sincronização */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-card border border-border rounded-xl">
        <div>
          <h2 className="text-lg font-bold">Saúde das Sincronizações Externas</h2>
          <p className="text-sm text-muted-foreground">
            Pipeline bidirecional entre Google Sheets, base de dados transacional e pauta em memória.
          </p>
        </div>

        <Button
          onClick={() => onForceSync()}
          disabled={isSyncing}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          {isSyncing ? (
            <>
              <CircleNotch className="animate-spin" size={18} />
              <span>A Sincronizar...</span>
            </>
          ) : (
            <>
              <ArrowsClockwise size={18} />
              <span>Forçar Sincronização</span>
            </>
          )}
        </Button>
      </div>

      {/* Grid de Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((svc) => (
          <Card key={svc.id} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-muted/60">{getIcon(svc.id)}</div>
                <div>
                  <CardTitle className="text-sm font-semibold">{svc.name}</CardTitle>
                  <CardDescription className="text-xs">{svc.lastSync}</CardDescription>
                </div>
              </div>

              {/* Status Pill Canónico DU */}
              <div
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  svc.status === 'healthy'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    svc.status === 'healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <span className="capitalize">{svc.status === 'healthy' ? 'Live' : 'Drift'}</span>
              </div>
            </CardHeader>

            <CardContent className="pt-2 space-y-3">
              <p className="text-xs text-muted-foreground font-mono">{svc.details}</p>

              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Latência:</span>
                <span className="font-mono font-semibold">{svc.latencyMs} ms</span>
              </div>

              {svc.quotaPercent !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Quota Consumida:</span>
                    <span className="font-mono font-medium">{svc.quotaPercent}%</span>
                  </div>
                  <Progress value={svc.quotaPercent} className="h-1.5" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feed de Auditoria */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockAfternoon size={18} className="text-primary" />
              <CardTitle className="text-base font-semibold">Feed de Eventos e Auditoria em Tempo Real</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              {auditLog.length} registos
            </Badge>
          </div>
          <CardDescription>
            Rastreio auditável de alterações de estado de provas, logins e sincronizações da turma.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2 divide-y divide-border/40">
            {auditLog.map((event) => (
              <div key={event.id} className="pt-3 first:pt-0 flex items-start justify-between gap-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-muted-foreground">
                    {event.type === 'sync' ? (
                      <ArrowsClockwise size={14} className="text-blue-500" />
                    ) : event.type === 'exam_reopen' ? (
                      <Warning size={14} className="text-amber-500" />
                    ) : (
                      <CheckCircle size={14} className="text-emerald-500" />
                    )}
                  </span>
                  <div>
                    <div className="font-medium text-foreground">{event.actor}</div>
                    <div className="text-muted-foreground">{event.description}</div>
                  </div>
                </div>
                <div className="font-mono text-muted-foreground whitespace-nowrap">{event.timestamp}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
