'use client';

import { useState, useCallback, useMemo } from 'react';
import { INITIAL_TRAINEES, INITIAL_SYNC_SERVICES, INITIAL_AUDIT_EVENTS } from './mock-data';
import {
  Trainee,
  SyncServiceHealth,
  AuditEvent,
  TraineeFilterOptions,
  PaginatedResult,
} from './types';
import { generateCsv, downloadCsv } from './csv-sanitizer';

export function useAvaliacaoRepository() {
  const [trainees, setTrainees] = useState<Trainee[]>(INITIAL_TRAINEES);
  const [services, setServices] = useState<SyncServiceHealth[]>(INITIAL_SYNC_SERVICES);
  const [auditLog, setAuditLog] = useState<AuditEvent[]>(INITIAL_AUDIT_EVENTS);
  const [isSyncing, setIsSyncing] = useState(false);

  // Filtros e Paginação
  const filterTrainees = useCallback(
    (options: TraineeFilterOptions = {}): PaginatedResult<Trainee> => {
      const { searchQuery = '', status = 'all', page = 1, pageSize = 25 } = options;
      const query = searchQuery.trim().toLowerCase();

      const filtered = trainees.filter((t) => {
        const matchesQuery =
          !query ||
          t.name.toLowerCase().includes(query) ||
          t.nif.includes(query) ||
          t.id.toLowerCase().includes(query);

        const matchesStatus = status === 'all' || t.status === status;
        return matchesQuery && matchesStatus;
      });

      const total = filtered.length;
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const safePage = Math.min(Math.max(1, page), totalPages);
      const start = (safePage - 1) * pageSize;
      const items = filtered.slice(start, start + pageSize);

      return {
        items,
        total,
        page: safePage,
        pageSize,
        totalPages,
      };
    },
    [trainees]
  );

  // Ação: Reabrir Prova
  const reopenExam = useCallback((traineeId: string) => {
    setTrainees((prev) =>
      prev.map((t) =>
        t.id === traineeId
          ? {
              ...t,
              status: 'em_curso',
              submittedAt: undefined,
              score: undefined,
            }
          : t
      )
    );

    setAuditLog((prev) => [
      {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        type: 'exam_reopen',
        actor: 'Formador CMLisboa',
        description: `Prova do formando ${traineeId} reaberta para continuação.`,
      },
      ...prev,
    ]);
  }, []);

  // Ação: Forçar Sincronização com Mutex
  const forceSync = useCallback(async (): Promise<boolean> => {
    if (isSyncing) return false;
    setIsSyncing(true);

    try {
      // Simulação de latência de rede
      await new Promise((r) => setTimeout(r, 800));

      setServices((prev) =>
        prev.map((s) => ({
          ...s,
          lastSync: 'Agora mesmo',
          latencyMs: Math.floor(Math.random() * 40) + 15,
        }))
      );

      setAuditLog((prev) => [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          type: 'sync',
          actor: 'Operador Admin',
          description: 'Sincronização manual concluída com sucesso (Google Sheets + Neon DB).',
        },
        ...prev,
      ]);

      return true;
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing]);

  // Ação: Exportar Pauta CSV Sanitizada
  const exportTraineesCsv = useCallback(
    (actionCode: string = 'FD-2026-TURMA4') => {
      const headers = ['ID Formando', 'Nome', 'NIF', 'Estado', 'Hora Início', 'Hora Submissão', 'Nota (0-20)', 'Questões Respondidas'];
      const rows = trainees.map((t) => [
        t.id,
        t.name,
        t.nif,
        t.status,
        t.startedAt,
        t.submittedAt || '-',
        t.score !== undefined ? t.score.toFixed(1) : 'Em Avaliação',
        `${t.answersCount}/${t.totalQuestions}`,
      ]);

      const csv = generateCsv(headers, rows);
      const filename = `pauta-${actionCode.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`;
      downloadCsv(filename, csv);

      setAuditLog((prev) => [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          type: 'export',
          actor: 'Formador CMLisboa',
          description: `Pauta exportada em CSV (${trainees.length} formandos).`,
        },
        ...prev,
      ]);
    },
    [trainees]
  );

  // Métricas agregadas seguras contra divisão por zero
  const metrics = useMemo(() => {
    const total = trainees.length;
    const completed = trainees.filter((t) => t.status === 'concluido');
    const inProgress = trainees.filter((t) => t.status === 'em_curso');
    const pending = trainees.filter((t) => t.status === 'pendente');
    const timedOut = trainees.filter((t) => t.status === 'tempo_esgotado');

    const completedWithScore = completed.filter((t) => t.score !== undefined);
    const averageScore =
      completedWithScore.length > 0
        ? completedWithScore.reduce((acc, t) => acc + (t.score || 0), 0) / completedWithScore.length
        : 0;

    const approvalRate =
      completedWithScore.length > 0
        ? (completedWithScore.filter((t) => (t.score || 0) >= 9.5).length / completedWithScore.length) * 100
        : 0;

    return {
      total,
      completedCount: completed.length,
      inProgressCount: inProgress.length,
      pendingCount: pending.length,
      timedOutCount: timedOut.length,
      averageScore,
      approvalRate,
    };
  }, [trainees]);

  return {
    trainees,
    services,
    auditLog,
    isSyncing,
    metrics,
    filterTrainees,
    reopenExam,
    forceSync,
    exportTraineesCsv,
  };
}
