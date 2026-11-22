import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CourseIntro } from "@/components/kits/futuro-digital/course-intro";
import { StepByStep, Step } from "@/components/kits/futuro-digital/step-by-step";
import { FeatureSlide } from "@/components/kits/futuro-digital/feature-slide";
import { ProTip } from "@/components/kits/futuro-digital/protip";
import { AtividadeCard } from "@/components/kits/futuro-digital/atividade-card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Futuro Digital — Catálogo & Galeria Canónica",
  description: "Catálogo completo de componentes pedagógicos, visuais e de layout do Futuro Digital (CMLisboa).",
};

export default function FuturoDigitalGaleriaPage() {
  return (
    <div data-theme="futuro-digital" className="min-h-screen bg-background text-muted-foreground font-sans antialiased">
      {/* 1. CABEÇALHO IDÊNTICO AO INDEX */}
      <header className="bg-background shadow-sm sticky top-0 z-[1000] w-full">
        <div className="max-w-[1140px] mx-auto px-5">
          <nav className="flex justify-between items-center h-20">
            <Link href="/futuro-digital" className="h-[50px] block">
              <Image
                src="/assets/futuro-digital/L7wNgqt_Fqk0iAmk2.png"
                alt="Futuro Digital CMLisboa Logo"
                width={212}
                height={50}
                className="h-full w-auto"
                priority
              />
            </Link>

            <ul className="hidden md:flex items-center gap-[30px] list-none m-0 p-0">
              <li>
                <Link href="/futuro-digital#courses" className="text-foreground font-medium hover:text-primary transition-colors">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/futuro-digital#about-program" className="text-foreground font-medium hover:text-primary transition-colors">
                  O Programa
                </Link>
              </li>
              <li>
                <Link href="/futuro-digital#testimonials" className="text-foreground font-medium hover:text-primary transition-colors">
                  Testemunhos
                </Link>
              </li>
              <li>
                <span className="text-primary font-bold">Galeria Pedagógica</span>
              </li>
              <li>
                <Link
                  href="/futuro-digital#inscricao"
                  className="inline-block px-6 py-2.5 rounded-full font-medium transition-all duration-300 bg-primary text-primary-foreground hover:bg-[var(--fd-primary-hover)] hover:-translate-y-0.5"
                >
                  Inscrever-me
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL DA GALERIA */}
      <main className="max-w-[1140px] mx-auto px-5 py-12 space-y-16">
        {/* TITULO */}
        <div className="border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-3">
            Catálogo & Galeria Canónica de Componentes
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Todos os componentes visuais, pedagógicos e de layout do ecossistema Futuro Digital (CMLisboa), prontos a usar e em perfeita paridade entre Next.js e Zero-Build HTML.
          </p>
        </div>

        {/* ========================================== */}
        {/* PARTE 1: COMPONENTES DA PÁGINA INDEX       */}
        {/* ========================================== */}

        {/* 1.1 HERO PRINCIPAL */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Componente: Hero Principal (Landing Page)</h2>
          <p className="text-sm text-muted-foreground">O cabeçalho de abertura da página inicial com chamada para ação, tipografia responsiva e imagem oficial (sem caixas limitadoras).</p>
          <div className="bg-background py-10">
            <div className="flex flex-col md:flex-row items-center gap-[40px] md:gap-[60px]">
              <div className="flex-1 min-w-0 w-full">
                <h2 className="text-4xl md:text-[3.5rem] font-extrabold text-foreground leading-[1.2] mb-4">
                  A sua jornada de capacitação digital começa aqui.
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed my-5 mb-8">
                  Conheça os cursos do programa Futuro Digital e transforme a forma como trabalha em equipa na CMLisboa com as ferramentas Microsoft.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <span className="inline-block px-[28px] py-[12px] rounded-full font-medium bg-primary text-primary-foreground shadow-sm hover:bg-[var(--fd-primary-hover)] cursor-pointer">
                    Explorar Cursos
                  </span>
                  <span className="inline-block px-[28px] py-[12px] rounded-full font-medium border-2 border-[var(--fd-brand)] text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer">
                    Primeiro Acesso
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0 w-full text-center">
                <Image
                  src="/assets/futuro-digital/ZJvakeb_HxbQeePGQ.png"
                  alt="Hero Preview"
                  width={555}
                  height={468}
                  className="mx-auto h-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 1.2 COURSECARD HORIZONTAL */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Componente: CourseCard (Álbum de Cursos 2 Colunas)</h2>
          <p className="text-sm text-muted-foreground">Cartão horizontal do catálogo com imagem lateral (40%), título 1.5rem, tag de categoria e botões de ação.</p>
          <div className="bg-[var(--fd-surface-soft)] p-6 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
              {/* Card 1: Loop */}
              <div className="bg-background rounded-[8px] shadow-sm overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-[5px] hover:shadow-md">
                <div className="flex-none w-full md:w-[40%] relative min-h-[200px] md:min-h-auto">
                  <Image
                    src="/assets/futuro-digital/RlBJMf0_0A2NcKXIp.png"
                    alt="Microsoft Loop"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-[30px] flex flex-col flex-1">
                  <span className="inline-block px-4 py-[6px] rounded-full text-sm font-medium mb-[15px] text-primary-foreground bg-primary w-fit">
                    Trabalhar em equipa
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-[10px] leading-[1.2]">
                    Microsoft Loop
                  </h3>
                  <p className="text-base flex-grow mb-4 leading-relaxed text-muted-foreground">
                    Trabalhe de forma colaborativa com o Microsoft Loop. Centralize informações, crie listas de tarefas e organize projetos em tempo real.
                  </p>
                  <div className="flex flex-wrap gap-3 items-center mt-auto">
                    <span className="inline-block px-[24px] py-[10px] rounded-full text-base font-medium border border-border bg-background text-foreground cursor-pointer hover:bg-muted">
                      Saber mais
                    </span>
                    <span className="inline-block px-[24px] py-[10px] rounded-full text-base font-medium bg-primary text-primary-foreground cursor-pointer hover:bg-[var(--fd-primary-hover)]">
                      Inscrever
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Excel */}
              <div className="bg-background rounded-[8px] shadow-sm overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-[5px] hover:shadow-md">
                <div className="flex-none w-full md:w-[40%] relative min-h-[200px] md:min-h-auto">
                  <Image
                    src="/assets/futuro-digital/T4rwgD6_U3ezS0_hw.png"
                    alt="Microsoft Excel"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-[30px] flex flex-col flex-1">
                  <span className="inline-block px-4 py-[6px] rounded-full text-sm font-medium mb-[15px] text-primary-foreground bg-[var(--fd-success-surface)] w-fit">
                    Trabalhar em equipa
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-[10px] leading-[1.2]">
                    Microsoft Excel
                  </h3>
                  <p className="text-base flex-grow mb-4 leading-relaxed text-muted-foreground">
                    Analise dados de forma poderosa e colabore em folhas de cálculo complexas com a sua equipa na nuvem.
                  </p>
                  <div className="flex flex-wrap gap-3 items-center mt-auto">
                    <span className="inline-block px-[24px] py-[10px] rounded-full text-base font-medium border border-border bg-background text-foreground cursor-pointer hover:bg-muted">
                      Saber mais
                    </span>
                    <span className="inline-block px-[24px] py-[10px] rounded-full text-base font-medium bg-primary text-primary-foreground cursor-pointer hover:bg-[var(--fd-primary-hover)]">
                      Inscrever
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1.3 ABOUT PROGRAM */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Componente: AboutProgram (Duas Colunas Institucional)</h2>
          <p className="text-sm text-muted-foreground">Secção de apresentação institucional com imagem de apoio (555x425px) e texto explicativo sem boxes fechadas.</p>
          <div className="bg-background py-10">
            <div className="flex flex-col md:flex-row items-center gap-[40px] md:gap-[60px]">
              <div className="flex-1 min-w-0 w-full">
                <Image
                  src="/assets/futuro-digital/9U2GzTP_0KMHhaNrD.png"
                  alt="About Program"
                  width={555}
                  height={425}
                  className="rounded-[8px] h-auto max-w-full"
                />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-[1.2]">
                  Sobre o Programa Futuro Digital
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  O Programa para a Inclusão e Literacia Digital da Câmara Municipal de Lisboa tem como missão capacitar colaboradores com as competências essenciais para uma cidade conectada e eficiente.
                </p>
                <span className="inline-block px-[28px] py-[12px] rounded-full text-base font-medium bg-primary text-primary-foreground cursor-pointer hover:bg-[var(--fd-primary-hover)]">
                  Conheça os Cursos
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* PARTE 2: COMPONENTES PEDAGÓGICOS DE CURSOS */}
        {/* ========================================== */}

        {/* 2.1 ATIVIDADE CARD */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Componente: AtividadeCard (Recursos Pedagógicos & Desafios)</h2>
          <p className="text-sm text-muted-foreground">Componente de maior destaque nos cursos: gradientes coloridos, número gigante vazado e download.</p>
          <div className="border border-dashed border-border rounded-xl p-6 bg-[var(--fd-surface-soft)] grid grid-cols-1 md:grid-cols-3 gap-6">
            <AtividadeCard
              number="01.01"
              badge="Desafio 01"
              gradientClass="from-[var(--fd-gradient-blue-from)] to-[var(--fd-gradient-blue-to)]"
              title="Criação de Documento Coautorado"
              description="Aprenda a iniciar um documento no Word Online, convidar colegas e configurar permissões."
            />
            <AtividadeCard
              number="01.02"
              gradientClass="from-[var(--fd-gradient-green-from)] to-[var(--fd-gradient-green-to)]"
              title="Componentes Loop no Teams"
              description="Integre tabelas de votação rápida e listas de tarefas durante reuniões de equipa."
            />
            <AtividadeCard
              number="Manual"
              gradientClass="from-[var(--fd-gradient-purple-from)] to-[var(--fd-gradient-purple-to)]"
              title="Guia Essencial Equipa ON"
              description="Manual completo de boas práticas, estrutura de pastas no SharePoint e partilha segura."
              openTitle="Ver Manual"
            />
          </div>
        </section>

        {/* 2.2 COURSE INTRO */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Componente: CourseIntro & SessionPill</h2>
          <p className="text-sm text-muted-foreground">Abertura de módulo formativo com identificador de sessão.</p>
          <div className="border border-dashed border-border rounded-xl p-6 bg-background">
            <CourseIntro
              sessionLabel="Sessão 1"
              title="Fundamentos & Boas Práticas de Inteligência Artificial"
            />
          </div>
        </section>

        {/* 2.3 STEP-BY-STEP */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Componente: Step-by-Step (Linha Conectora Vertical)</h2>
          <p className="text-sm text-muted-foreground">Guião sequencial numerado com conector visual contínuo.</p>
          <div className="border border-dashed border-border rounded-xl p-6 bg-[var(--fd-surface-soft)]">
            <StepByStep>
              <Step number={1} title="Definir o Contexto e a Persona">
                Explique claramente ao modelo o papel pretendido (ex: Jurista Municipal ou Técnico de Comunicação).
              </Step>
              <Step number={2} title="Fornecer Dados de Entrada Estruturados">
                Utilize delimitadores claros para separar instruções dos dados de trabalho.
              </Step>
              <Step number={3} title="Validação e Revisão Humana">
                Sempre valide as conclusões geradas antes de as encaminhar para decisão administrativa.
              </Step>
            </StepByStep>
          </div>
        </section>

        {/* 2.4 PROTIP */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Componente: ProTip (Dica do Formador)</h2>
          <p className="text-sm text-muted-foreground">Caixa de destaque visual para recomendações práticas.</p>
          <div className="border border-dashed border-border rounded-xl p-6 bg-background">
            <ProTip>
              <strong>Dica do Formador:</strong> Quando solicitar sumários de deliberações, peça ao modelo para organizar as conclusões numa tabela de 3 colunas: &quot;Assunto&quot;, &quot;Impacto Orçamental&quot; e &quot;Próximo Passo&quot;.
            </ProTip>
          </div>
        </section>

        {/* 2.5 ACCORDION */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Componente: Accordion Interativo (FAQ)</h2>
          <p className="text-sm text-muted-foreground">Componente retrátil para esclarecimento de dúvidas frequentes.</p>
          <div className="border border-dashed border-border rounded-xl p-6 bg-[var(--fd-surface-soft)] max-w-2xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>Quem pode frequentar os cursos do Futuro Digital?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Todos os trabalhadores da Câmara Municipal de Lisboa, empresas municipais e juntas de freguesia parceiras.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Como descarregar o certificado do Passaporte?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Após a frequência e submissão da avaliação, o selo surge automaticamente no portal do Passaporte de Competências Digitais da CML.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* 2. RODAPÉ IDÊNTICO AO INDEX */}
      <footer className="bg-[var(--fd-footer)] text-[var(--fd-footer-foreground)] pt-[60px] mt-16">
        <div className="max-w-[1140px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 pb-10">
          <div>
            <span className="font-semibold">Futuro Digital</span>
            <p className="mb-5 leading-relaxed">
              Programa para a Inclusão e Literacia Digital da Câmara Municipal de Lisboa.
            </p>
          </div>
          <div>
            <h4 className="text-primary-foreground text-lg font-bold mb-5">Navegação</h4>
            <ul className="space-y-2.5">
              <li><Link href="/futuro-digital#courses" className="hover:text-primary-foreground transition-colors">Cursos</Link></li>
              <li><Link href="/futuro-digital#about-program" className="hover:text-primary-foreground transition-colors">O Programa</Link></li>
              <li><Link href="/futuro-digital#testimonials" className="hover:text-primary-foreground transition-colors">Testemunhos</Link></li>
              <li><Link href="/futuro-digital#inscricao" className="hover:text-primary-foreground transition-colors">Inscrição</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary-foreground text-lg font-bold mb-5">Cursos</h4>
            <ul className="space-y-2.5">
              <li><Link href="/futuro-digital#courses" className="hover:text-primary-foreground transition-colors">Word e Loop</Link></li>
              <li><Link href="/futuro-digital#courses" className="hover:text-primary-foreground transition-colors">Excel e Forms</Link></li>
              <li><Link href="/futuro-digital#courses" className="hover:text-primary-foreground transition-colors">OneDrive</Link></li>
              <li><Link href="/futuro-digital#courses" className="hover:text-primary-foreground transition-colors">Teams & SharePoint</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary-foreground text-lg font-bold mb-5">Contacto</h4>
            <p className="mb-2.5 leading-relaxed">Departamento de Formação CMLisboa<br />Email: formacao@cm-lisboa.pt</p>
            <p className="leading-relaxed">Apoio ao participante e tutoria ativa.</p>
          </div>
        </div>
        <div className="border-t border-[var(--fd-footer-border)] py-6 text-center text-xs">
          <p className="m-0">© 2026 Futuro Digital — Câmara Municipal de Lisboa. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
