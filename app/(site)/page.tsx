import Link from "next/link";
import {
  Hero,
  HeroContent,
  HeroTitle,
  HeroDescription,
  HeroActions,
  HeroVisual,
  FeatureGrid,
  FeatureCard,
  FeatureCardHeader,
  FeatureCardIcon,
  FeatureCardTitle,
  FeatureCardDescription,
  SplitSection,
  SplitSectionContent,
  SplitSectionMedia,
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
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkle,
  Cpu,
  ShieldCheck,
  Browsers,
  Lightbulb,
  GraduationCap,
  RocketLaunch,
  Kanban,
  Code,
} from "@phosphor-icons/react/dist/ssr";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden">
      {/* 1. Hero Section com variante Split */}
      <Hero variant="split" className="pt-12 sm:pt-16 pb-6">
        <HeroContent align="left">
          <Badge variant="outline" className="px-3.5 py-1 gap-2 rounded-full border-border/80 w-fit">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs tracking-wide uppercase">
              ai-app-foundation • Web & Dashboard
            </span>
          </Badge>
          <HeroTitle>
            Construa portais modernos, websites e aplicações de IA com{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              confiança total
            </span>
            .
          </HeroTitle>
          <HeroDescription>
            A fundação local-first e acessível inspirada nas melhores práticas do programa Futuro Digital:
            componentes modulares, WCAG 2.1 AA, React Server Components no Next.js 16 e SQLite em WAL mode.
          </HeroDescription>
          <HeroActions>
            <Button size="lg" asChild className="gap-2 shadow-sm font-semibold">
              <Link href="/dashboard">
                <span>Abrir Dashboard</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard/library">Explorar Componentes</Link>
            </Button>
          </HeroActions>
        </HeroContent>

        <HeroVisual className="border border-border/70 shadow-2xl bg-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-rose-500/80" />
              <span className="size-3 rounded-full bg-amber-500/80" />
              <span className="size-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-muted-foreground ml-2">platform-overview.tsx</span>
            </div>
            <Badge variant="secondary" className="text-[10px]">RSC Ready</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 py-4">
            <div className="rounded-lg bg-muted/40 p-3 border border-border/40">
              <div className="text-[11px] text-muted-foreground font-medium">Arquitetura</div>
              <div className="text-sm font-bold text-foreground mt-0.5">Compound Primitives</div>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 border border-border/40">
              <div className="text-[11px] text-muted-foreground font-medium">Acessibilidade</div>
              <div className="text-sm font-bold text-emerald-500 mt-0.5">WCAG 2.1 AA</div>
            </div>
          </div>
          <div className="rounded-lg bg-muted/30 p-3 border border-border/40 text-xs text-muted-foreground font-mono flex items-center justify-between">
            <span>pnpm typecheck && pnpm test</span>
            <span className="text-emerald-500 font-semibold">✓ 100% Passing</span>
          </div>
        </HeroVisual>
      </Hero>

      {/* 2. Callout Informativo de Arquitetura */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Callout variant="tip" icon={<Lightbulb className="size-5" />} title="Fundação Desacoplada e Agnóstica">
          Estes componentes web foram extraídos e modernizados a partir do ecossistema de formação <em>Futuro Digital</em>,
          reestruturados sem dependências rígidas de domínio para servir de fundação a SaaS, portais educativos, documentações e ferramentas internas.
        </Callout>
      </div>

      {/* 3. Feature & Bento Grid Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-10">
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <Badge variant="outline" className="w-fit">Pilares Fundacionais</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Desenhado para Desempenho e Reutilização
          </h2>
          <p className="text-muted-foreground text-base">
            Todos os blocos foram construídos para máxima compostabilidade através de subcomponentes abertos.
          </p>
        </div>

        <FeatureGrid columns="bento">
          <FeatureCard span="wide">
            <FeatureCardHeader>
              <FeatureCardIcon><Sparkle className="size-5" /></FeatureCardIcon>
              <FeatureCardTitle>Zero Dependências Cloud Obrigatórias</FeatureCardTitle>
              <FeatureCardDescription>
                Funciona 100% offline e local-first com SQLite nativo em modo WAL, Pino com ofuscação de segredos e shadcn/ui.
                Sem subscrições pagas de SaaS forçadas nem overhead de monorepo.
              </FeatureCardDescription>
            </FeatureCardHeader>
          </FeatureCard>

          <FeatureCard>
            <FeatureCardHeader>
              <FeatureCardIcon><ShieldCheck className="size-5" /></FeatureCardIcon>
              <FeatureCardTitle>Acessibilidade Rigorosa</FeatureCardTitle>
              <FeatureCardDescription>
                Conformidade com WCAG 2.1 AA essencial para entidades públicas, municípios e aplicações de grande escala.
              </FeatureCardDescription>
            </FeatureCardHeader>
          </FeatureCard>

          <FeatureCard>
            <FeatureCardHeader>
              <FeatureCardIcon><Browsers className="size-5" /></FeatureCardIcon>
              <FeatureCardTitle>React Server Components</FeatureCardTitle>
              <FeatureCardDescription>
                Renderização no servidor por omissão no Next.js 16 para First Contentful Paint instantâneo e SEO ótimo.
              </FeatureCardDescription>
            </FeatureCardHeader>
          </FeatureCard>

          <FeatureCard span="wide">
            <FeatureCardHeader>
              <FeatureCardIcon><Cpu className="size-5" /></FeatureCardIcon>
              <FeatureCardTitle>Preparado para Agentes e Automação</FeatureCardTitle>
              <FeatureCardDescription>
                Integração direta com o Development Universe (DU), protocolos OpenSpec para evolução guiada e telemetria de agentes em tempo real no dashboard.
              </FeatureCardDescription>
            </FeatureCardHeader>
          </FeatureCard>
        </FeatureGrid>
      </section>

      {/* 4. Split Content Section: Demonstração de Storytelling */}
      <SplitSection id="showcase" mediaPosition="right" className="bg-muted/20 border-y border-border/50 py-20">
        <SplitSectionContent>
          <Badge variant="outline" className="w-fit">Catálogo de Entidades</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Cards Polimórficos para Cursos, Ferramentas ou Produtos
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            O componente <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-foreground">ShowcaseCard</code> adapta-se
            automaticamente ao seu caso de uso: formações com níveis e durações, produtos com planos e preços, ou módulos de código com estatísticas.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Button asChild>
              <Link href="/dashboard/library">Ver no Component Catalog</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/metrics">Métricas do Sistema</Link>
            </Button>
          </div>
        </SplitSectionContent>

        <SplitSectionMedia className="bg-background p-6">
          <ShowcaseCard
            className="w-full shadow-lg border-border"
            badge="Futuro Digital"
            title="Inteligência Artificial e Produtividade"
            description="Percurso avançado de capacitação em agentes locais, automação de processos e ferramentas colaborativas."
            metadata={[
              { label: "Duração", value: "30 Horas", icon: <GraduationCap className="size-4" /> },
              { label: "Nível", value: "Avançado", icon: <RocketLaunch className="size-4" /> },
            ]}
            actionSlot={
              <Button className="w-full" asChild>
                <Link href="/dashboard">Entrar no Ambiente Prático</Link>
              </Button>
            }
          />
        </SplitSectionMedia>
      </SplitSection>

      {/* 5. Process Steps: Metodologia e Onboarding */}
      <section id="process" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-10">
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <Badge variant="outline" className="w-fit">Fluxo de Trabalho</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Como Criar uma Nova Aplicação em 3 Passos
          </h2>
          <p className="text-muted-foreground text-base">
            O processo estruturado do ai-app-foundation para transformar ideias em software em produção.
          </p>
        </div>

        <div className="border border-border/70 rounded-xl p-6 sm:p-10 bg-card">
          <ProcessSteps orientation="horizontal">
            <StepItem stepNumber={1} status="completed">
              <StepTitle>Composição de Layouts</StepTitle>
              <StepDescription>
                Selecione os blocos de <code className="text-xs font-mono bg-muted px-1 rounded">components/web</code> para montar a landing page pública ou catálogo de cursos.
              </StepDescription>
            </StepItem>
            <StepItem stepNumber={2} status="active">
              <StepTitle>Integração com o Dashboard</StepTitle>
              <StepDescription>
                Ligue as áreas autenticadas aos módulos de métricas, Kanban de tarefas e terminais de remediação.
              </StepDescription>
            </StepItem>
            <StepItem stepNumber={3} status="upcoming">
              <StepTitle>Garantia de Qualidade</StepTitle>
              <StepDescription>
                Valide os quality gates com <code className="text-xs font-mono bg-muted px-1 rounded">pnpm typecheck && pnpm test && pnpm build</code>.
              </StepDescription>
            </StepItem>
          </ProcessSteps>
        </div>
      </section>

      {/* 6. Prova Social e Testemunhos */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-8">
        <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-2">
          <Badge variant="outline">Feedback e Prova Social</Badge>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Validado em Casos Reais
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TestimonialCard
            authorName="Helder Toucas"
            authorRole="Lead Architect • Futuro Digital"
            quote="A separação clara entre os componentes de website e os cockpits de agentes permite criar portais institucionais sem poluir a arquitetura central."
            rating={5}
          />
          <TestimonialCard
            authorName="Equipa Pedagógica"
            authorRole="Coordenação de Capacitação Digital"
            quote="A conformidade com acessibilidade AA e a flexibilidade dos cards tornam a fundação ideal para expandir qualquer catálogo formativo municipal."
            rating={5}
          />
        </div>
      </section>

      {/* 7. CTA Final de Conversão */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <CtaBanner variant="solid">
          <CtaBannerTitle>Pronto para Começar a Desenvolver?</CtaBannerTitle>
          <CtaBannerDescription>
            Aceda ao Dashboard interativo ou inspecione todos os componentes prontos no catálogo visual.
          </CtaBannerDescription>
          <CtaBannerActions>
            <Button variant="secondary" size="lg" asChild className="font-semibold">
              <Link href="/dashboard">Aceder ao Dashboard</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/dashboard/library">Ver Component Catalog</Link>
            </Button>
          </CtaBannerActions>
        </CtaBanner>
      </div>
    </div>
  );
}
