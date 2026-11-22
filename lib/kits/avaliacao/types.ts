export type TraineeStatus = 'em_curso' | 'concluido' | 'pendente' | 'tempo_esgotado';

export interface Trainee {
  id: string;
  name: string;
  nif: string;
  status: TraineeStatus;
  startedAt: string;
  submittedAt?: string;
  score?: number; // 0 a 20
  answersCount: number;
  totalQuestions: number;
}

export type SessionRole = 'trainer' | 'admin';

export interface SessionUser {
  role: SessionRole;
  actionCode?: string;
  name: string;
  loginAt: number;
}

export type ServiceStatus = 'healthy' | 'warning' | 'error';

export interface SyncServiceHealth {
  id: string;
  name: string;
  status: ServiceStatus;
  lastSync: string;
  latencyMs: number;
  details: string;
  pendingCount?: number;
  quotaPercent?: number;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  type: 'sync' | 'exam_start' | 'exam_submit' | 'exam_reopen' | 'export';
  actor: string;
  description: string;
}

export interface TraineeFilterOptions {
  searchQuery?: string;
  status?: TraineeStatus | 'all';
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
