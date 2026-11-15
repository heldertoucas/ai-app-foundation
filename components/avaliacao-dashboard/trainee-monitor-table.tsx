'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MagnifyingGlass,
  ArrowClockwise,
  DownloadSimple,
  CheckCircle,
  Clock,
  WarningCircle,
  Hourglass,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react';
import { Trainee, TraineeStatus } from '@/lib/avaliacao/types';

interface TraineeMonitorTableProps {
  trainees: Trainee[];
  actionCode?: string;
  onReopenExam: (traineeId: string) => void;
  onExportCsv: (actionCode: string) => void;
}

export function TraineeMonitorTable({
  trainees,
  actionCode = 'FD-2026-TURMA4',
  onReopenExam,
  onExportCsv,
}: TraineeMonitorTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TraineeStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Debounce de 150ms para pesquisa fluida sem UI freeze
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 150);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredTrainees = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim();
    return trainees.filter((t) => {
      const matchesText =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.nif.includes(q) ||
        t.id.toLowerCase().includes(q);

      const matchesStatus = selectedStatus === 'all' || t.status === selectedStatus;
      return matchesText && matchesStatus;
    });
  }, [trainees, debouncedSearch, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredTrainees.length / pageSize));
  const paginatedTrainees = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTrainees.slice(start, start + pageSize);
  }, [filteredTrainees, currentPage]);

  const getStatusBadge = (status: TraineeStatus) => {
    switch (status) {
      case 'em_curso':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Em Curso
          </span>
        );
      case 'concluido':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <CheckCircle size={12} weight="bold" />
            Concluído
          </span>
        );
      case 'pendente':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Hourglass size={12} weight="bold" />
            Pendente
          </span>
        );
      case 'tempo_esgotado':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20">
            <WarningCircle size={12} weight="bold" />
            Tempo Esgotado
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Barra de Filtros e Pesquisa */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Input de Pesquisa */}
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlass
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por nome, NIF ou ID..."
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* Filtros de Estado */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              { id: 'all', label: 'Todos' },
              { id: 'em_curso', label: 'Em Curso' },
              { id: 'concluido', label: 'Concluídos' },
              { id: 'pendente', label: 'Pendentes' },
              { id: 'tempo_esgotado', label: 'Expirados' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setSelectedStatus(filter.id);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedStatus === filter.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Botão de Exportação CSV */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExportCsv(actionCode)}
          className="flex items-center gap-1.5 h-9 whitespace-nowrap text-xs"
        >
          <DownloadSimple size={15} />
          <span>Exportar CSV</span>
        </Button>
      </div>

      {/* Tabela de Formandos */}
      <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[100px] text-xs font-semibold">ID</TableHead>
              <TableHead className="text-xs font-semibold">Nome do Formando</TableHead>
              <TableHead className="text-xs font-semibold">NIF</TableHead>
              <TableHead className="text-xs font-semibold">Estado</TableHead>
              <TableHead className="text-xs font-semibold">Horários</TableHead>
              <TableHead className="text-xs font-semibold text-center">Progresso</TableHead>
              <TableHead className="text-xs font-semibold text-right">Nota</TableHead>
              <TableHead className="text-xs font-semibold text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTrainees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center text-sm text-muted-foreground">
                  Nenhum formando encontrado para os filtros selecionados.
                </TableCell>
              </TableRow>
            ) : (
              paginatedTrainees.map((trainee) => (
                <TableRow key={trainee.id} className="text-sm">
                  <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                    {trainee.id}
                  </TableCell>
                  <TableCell className="font-medium">{trainee.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{trainee.nif}</TableCell>
                  <TableCell>{getStatusBadge(trainee.status)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    <div>Início: {trainee.startedAt}</div>
                    {trainee.submittedAt && <div>Fim: {trainee.submittedAt}</div>}
                  </TableCell>
                  <TableCell className="text-center font-mono text-xs">
                    {trainee.answersCount} / {trainee.totalQuestions}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold">
                    {trainee.score !== undefined ? (
                      <span className={trainee.score >= 9.5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}>
                        {trainee.score.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-normal text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {(trainee.status === 'concluido' || trainee.status === 'tempo_esgotado') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onReopenExam(trainee.id)}
                        className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1 ml-auto"
                        title="Reabrir prova para o formando"
                      >
                        <ArrowClockwise size={13} />
                        <span>Reabrir</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Controles de Paginação */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 px-1">
        <div>
          Mostrando {filteredTrainees.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} até{' '}
          {Math.min(currentPage * pageSize, filteredTrainees.length)} de {filteredTrainees.length} formandos
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="h-8 w-8 p-0"
          >
            <CaretLeft size={14} />
          </Button>
          <span className="font-mono">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="h-8 w-8 p-0"
          >
            <CaretRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
