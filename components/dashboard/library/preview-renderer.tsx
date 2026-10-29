"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { ComponentItem } from "@/lib/library/component-registry";
import { ShieldCheck } from "@phosphor-icons/react";

// Light primitives directly imported
import {
  KpiStatCard,
  KpiStatCardSkeleton,
  HealthGauge,
  StatusFilterChips,
  MetricsClientView,
} from "@/components/dashboard/metrics";

import { ChartSkeleton } from "@/components/dashboard/charts";

import {
  DataTable,
  MatrixViewModeToggle,
  MatrixClientView,
} from "@/components/dashboard/matrix";

import {
  OpenSpecKanbanBoard,
  PhaseStepper,
  ActivityTimelineFeed,
  WorkflowClientView,
} from "@/components/dashboard/workflow";

import {
  CodeDiffViewer,
  MarkdownReader,
  MaskedSecretViewer,
  FileTreeNavigator,
  InspectionClientView,
} from "@/components/dashboard/inspection";

import {
  AgentRuntimeCardGrid,
  AgentCardSkeleton,
  MultiAgentChatStream,
  HumanReviewBanner,
  AgentsClientView,
} from "@/components/dashboard/agents";

import {
  RemediationTerminalCard,
  QuickFilterToolbar,
  ActionsClientView,
} from "@/components/dashboard/actions";

import {
  Hero,
  HeroContent,
  HeroTitle,
  HeroDescription,
  HeroActions,
  FeatureGrid,
  FeatureCard,
  FeatureCardHeader,
  FeatureCardIcon,
  FeatureCardTitle,
  FeatureCardDescription,
  ProcessSteps,
  StepItem,
  StepTitle,
  StepDescription,
  ShowcaseCard,
  Callout,
  CtaBanner,
  CtaBannerTitle,
  CtaBannerDescription,
  CtaBannerActions,
  TestimonialCard,
} from "@/components/web";
import { Button } from "@/components/ui/button";
import { Sparkle, Lightbulb } from "@phosphor-icons/react";

// Lazy-loaded chart-heavy and complex matrix components
const DynamicTargetDistributionBarChart = dynamic(
  () =>
    import("@/components/dashboard/charts").then(
      (m) => m.TargetDistributionBarChart
    ),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const DynamicEvaluationRadarChart = dynamic(
  () =>
    import("@/components/dashboard/charts").then((m) => m.EvaluationRadarChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const DynamicTimelineActivityAreaChart = dynamic(
  () =>
    import("@/components/dashboard/charts").then(
      (m) => m.TimelineActivityAreaChart
    ),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const DynamicChartsClientView = dynamic(
  () => import("@/components/dashboard/charts").then((m) => m.ChartsClientView),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const DynamicCapabilityMatrixHeatmap = dynamic(
  () =>
    import("@/components/dashboard/matrix").then(
      (m) => m.CapabilityMatrixHeatmap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[240px] flex items-center justify-center text-xs text-muted-foreground animate-pulse">
        Loading Heatmap...
      </div>
    ),
  }
);

// Interactive preview wrappers
function StatusFilterChipsPreview({ mockData }: { mockData: any }) {
  const [selected, setSelected] = React.useState<any>(mockData.selected);
  return (
    <StatusFilterChips
      options={mockData.options}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

function MatrixTogglePreview() {
  const [mode, setMode] = React.useState<any>("summary");
  return <MatrixViewModeToggle mode={mode} onChange={setMode} />;
}

function FileTreePreview({ mockData }: { mockData: any }) {
  const [selectedId, setSelectedId] = React.useState("dash-layout");
  return (
    <FileTreeNavigator
      nodes={mockData.nodes}
      selectedId={selectedId}
      onSelectNode={(node) => setSelectedId(node.id)}
    />
  );
}

function QuickFilterToolbarPreview({ mockData }: { mockData: any }) {
  const [search, setSearch] = React.useState(mockData.search || "");
  const [status, setStatus] = React.useState(mockData.selectedStatus || null);

  return (
    <QuickFilterToolbar
      search={search}
      onSearchChange={setSearch}
      statusOptions={mockData.statusOptions}
      selectedStatus={status}
      onStatusSelect={setStatus}
    />
  );
}

export function ComponentPreviewRenderer({ item }: { item: ComponentItem }) {
  switch (item.id) {
    // Metrics
    case "kpi-stat-card":
      return (
        <KpiStatCard
          {...item.mockData}
          icon={<ShieldCheck className="size-4 text-emerald-500" />}
        />
      );
    case "kpi-stat-card-skeleton":
      return <KpiStatCardSkeleton />;
    case "health-gauge":
      return <HealthGauge {...item.mockData} />;
    case "status-filter-chips":
      return <StatusFilterChipsPreview mockData={item.mockData} />;
    case "metrics-client-view":
      return (
        <div className="scale-90 origin-top overflow-hidden max-h-[400px]">
          <MetricsClientView
            complianceData={item.mockData.complianceData}
            contextTelemetry={item.mockData.contextTelemetry}
          />
        </div>
      );

    // Charts
    case "target-distribution-bar-chart":
      return <DynamicTargetDistributionBarChart data={item.mockData.data} />;
    case "chart-skeleton":
      return <ChartSkeleton />;
    case "evaluation-radar-chart":
      return <DynamicEvaluationRadarChart data={item.mockData.data} />;
    case "timeline-activity-area-chart":
      return <DynamicTimelineActivityAreaChart data={item.mockData.data} />;
    case "charts-client-view":
      return (
        <div className="scale-90 origin-top overflow-hidden max-h-[400px]">
          <DynamicChartsClientView {...item.mockData} />
        </div>
      );

    // Matrix
    case "capability-matrix-heatmap":
      return (
        <DynamicCapabilityMatrixHeatmap
          targets={item.mockData.targets}
          rows={item.mockData.rows}
        />
      );
    case "data-table":
      return (
        <DataTable
          data={item.mockData.data}
          columns={item.mockData.columns}
          searchKey={item.mockData.searchKey}
          pageSize={5}
        />
      );
    case "matrix-view-mode-toggle":
      return <MatrixTogglePreview />;
    case "matrix-client-view":
      return (
        <div className="scale-90 origin-top overflow-hidden max-h-[400px]">
          <MatrixClientView initialData={item.mockData.initialData} />
        </div>
      );

    // Workflow
    case "openspec-kanban-board":
      return <OpenSpecKanbanBoard changes={item.mockData.changes} />;
    case "phase-stepper":
      return (
        <PhaseStepper
          steps={item.mockData.steps}
          currentStepIndex={item.mockData.currentStepIndex}
        />
      );
    case "activity-timeline-feed":
      return <ActivityTimelineFeed events={item.mockData.events} />;
    case "workflow-client-view":
      return (
        <div className="scale-90 origin-top overflow-hidden max-h-[400px]">
          <WorkflowClientView
            initialCandidates={item.mockData.initialCandidates}
          />
        </div>
      );

    // Inspection
    case "code-diff-viewer":
      return (
        <CodeDiffViewer
          diffLines={item.mockData.diffLines}
          title="AGENTS.md Diff"
        />
      );
    case "markdown-reader":
      return <MarkdownReader content={item.mockData.content} />;
    case "masked-secret-viewer":
      return (
        <MaskedSecretViewer
          label={item.mockData.label}
          value={item.mockData.value}
        />
      );
    case "file-tree-navigator":
      return <FileTreePreview mockData={item.mockData} />;
    case "inspection-client-view":
      return (
        <div className="scale-90 origin-top overflow-hidden max-h-[400px]">
          <InspectionClientView
            ruleSyncData={item.mockData.ruleSyncData}
            initialInvariant={item.mockData.initialInvariant}
          />
        </div>
      );

    // Agents
    case "agent-runtime-card-grid":
      return <AgentRuntimeCardGrid agents={item.mockData.agents} />;
    case "agent-card-skeleton":
      return <AgentCardSkeleton />;
    case "multi-agent-chat-stream":
      return <MultiAgentChatStream messages={item.mockData.messages} />;
    case "human-review-banner":
      return (
        <HumanReviewBanner
          title={item.mockData.title}
          description={item.mockData.description}
          onApprove={() => {}}
          onReject={() => {}}
        />
      );
    case "agents-client-view":
      return (
        <div className="scale-90 origin-top overflow-hidden max-h-[400px]">
          <AgentsClientView />
        </div>
      );

    // Actions
    case "remediation-terminal-card":
      return (
        <RemediationTerminalCard
          title="RuleSync Fix"
          commands={item.mockData.commands}
        />
      );
    case "quick-filter-toolbar":
      return <QuickFilterToolbarPreview mockData={item.mockData} />;
    case "global-command-palette":
      return (
        <div className="flex flex-col items-center justify-center p-6 border border-dashed border-border/80 rounded-xl bg-muted/20 text-center gap-2">
          <div className="text-xs font-semibold text-foreground">
            Cmd+K / Ctrl+K Command Palette
          </div>
          <div className="text-[11px] text-muted-foreground max-w-sm">
            Interactive modal registered with {item.mockData.items.length} navigation targets.
            Press shortcut in browser to trigger modal overlay.
          </div>
        </div>
      );
    case "actions-client-view":
      return (
        <div className="scale-90 origin-top overflow-hidden max-h-[400px]">
          <ActionsClientView actionCommands={item.mockData.actionCommands} />
        </div>
      );

    // Web & Marketing
    case "marketing-hero":
      return (
        <div className="rounded-lg border border-border/60 bg-background/50 p-4">
          <Hero variant="centered" className="py-8 sm:py-10">
            <HeroContent align="center">
              <HeroTitle className="text-2xl sm:text-3xl">Próxima Geração de Portais</HeroTitle>
              <HeroDescription className="text-sm">
                Framework universal e acessível para aplicações web, dashboards e plataformas educativas.
              </HeroDescription>
              <HeroActions>
                <Button size="sm">Começar Agora</Button>
                <Button variant="outline" size="sm">Documentação</Button>
              </HeroActions>
            </HeroContent>
          </Hero>
        </div>
      );

    case "feature-grid":
      return (
        <FeatureGrid columns={3} className="gap-4">
          <FeatureCard>
            <FeatureCardHeader>
              <FeatureCardIcon><Sparkle className="size-5" /></FeatureCardIcon>
              <FeatureCardTitle className="text-base">Alta Performance</FeatureCardTitle>
              <FeatureCardDescription className="text-xs">
                Renderização Server Components pura sem JS supérfluo.
              </FeatureCardDescription>
            </FeatureCardHeader>
          </FeatureCard>
          <FeatureCard>
            <FeatureCardHeader>
              <FeatureCardIcon><Sparkle className="size-5" /></FeatureCardIcon>
              <FeatureCardTitle className="text-base">Acessibilidade AA</FeatureCardTitle>
              <FeatureCardDescription className="text-xs">
                Contraste rigoroso e semântica acessível para instituições.
              </FeatureCardDescription>
            </FeatureCardHeader>
          </FeatureCard>
          <FeatureCard>
            <FeatureCardHeader>
              <FeatureCardIcon><Sparkle className="size-5" /></FeatureCardIcon>
              <FeatureCardTitle className="text-base">Zero SaaS Pago</FeatureCardTitle>
              <FeatureCardDescription className="text-xs">
                100% local e livre de licenças em nuvem obrigatórias.
              </FeatureCardDescription>
            </FeatureCardHeader>
          </FeatureCard>
        </FeatureGrid>
      );

    case "showcase-card":
      return (
        <div className="max-w-md mx-auto">
          <ShowcaseCard
            badge="Formação"
            title="Inteligência Artificial Aplicada"
            description="Capacitação prática em ferramentas modernas de produtividade, automação e modelos locais."
            metadata={[
              { label: "Duração", value: "24h" },
              { label: "Nível", value: "Intermédio" },
            ]}
            actionSlot={<Button className="w-full" size="sm">Inscrever no Módulo</Button>}
          />
        </div>
      );

    case "process-steps":
      return (
        <div className="max-w-md mx-auto p-4 border border-border/50 rounded-lg bg-card">
          <ProcessSteps orientation="vertical">
            <StepItem stepNumber={1} status="completed">
              <StepTitle>Diagnóstico Inicial</StepTitle>
              <StepDescription>Avaliação de competências digitais e definição de objetivos.</StepDescription>
            </StepItem>
            <StepItem stepNumber={2} status="active">
              <StepTitle>Capacitação Prática</StepTitle>
              <StepDescription>Sessões orientadas a projetos e exercícios colaborativos.</StepDescription>
            </StepItem>
            <StepItem stepNumber={3} status="upcoming">
              <StepTitle>Certificação</StepTitle>
              <StepDescription>Entrega do projeto final e atribuição de credencial.</StepDescription>
            </StepItem>
          </ProcessSteps>
        </div>
      );

    case "callout":
      return (
        <div className="space-y-3 max-w-xl mx-auto">
          <Callout variant="tip" icon={<Lightbulb className="size-5" />} title="Dica Prática">
            Pode alternar rapidamente entre o tema claro e escuro clicando no botão no topo do ecrã.
          </Callout>
          <Callout variant="warning" title="Atenção">
            Certifique-se de que a sua base de dados SQLite local está sincronizada antes de exportar.
          </Callout>
        </div>
      );

    case "testimonial-card":
      return (
        <div className="max-w-md mx-auto">
          <TestimonialCard
            authorName="Maria Santos"
            authorRole="Coordenadora de Formação Digital"
            quote="Esta framework permitiu-nos lançar 3 portais de capacitação num terço do tempo habitual."
            rating={5}
          />
        </div>
      );

    case "cta-banner":
      return (
        <CtaBanner variant="solid" className="p-8">
          <CtaBannerTitle className="text-2xl sm:text-3xl">Pronto para Modernizar a Sua Plataforma?</CtaBannerTitle>
          <CtaBannerDescription className="text-sm">
            Componentes prontos, acessíveis e reutilizáveis para qualquer domínio.
          </CtaBannerDescription>
          <CtaBannerActions>
            <Button variant="secondary" size="sm">Começar Agora</Button>
          </CtaBannerActions>
        </CtaBanner>
      );

    default:
      return (
        <div className="p-4 text-xs text-muted-foreground">
          No preview registered for {item.name}
        </div>
      );
  }
}
