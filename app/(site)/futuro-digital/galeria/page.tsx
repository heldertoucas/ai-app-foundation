import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FuturoDigitalClientToolbar } from "../client-toolbar";
import { CourseIntro } from "@/components/futuro-digital/course-intro";
import { StepByStep, Step } from "@/components/futuro-digital/step-by-step";
import { FeatureSlide } from "@/components/futuro-digital/feature-slide";
import { ProTip } from "@/components/futuro-digital/protip";
import { AtividadeCard } from "@/components/futuro-digital/atividade-card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Futuro Digital — Catálogo & Galeria Canónica",
  description: "Catálogo completo de componentes pedagógicos, visuais e de layout do Futuro Digital (CMLisboa).",
};

export default function FuturoDigitalGaleriaPage() {
  return (
    <div data-theme="futuro-digital" className="min-h-screen bg-white text-[#575757] font-sans antialiased">
      {/* 1. CABEÇALHO IDÊNTICO AO INDEX */}
      <header className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] sticky top-0 z-[1000] w-full">
        <div className="max-w-[1140px] mx-auto px-5">
          <nav className="flex justify-between items-center h-20">
            <Link href="/futuro-digital" className="h-[50px] block">
              <Image
                src="https://ik.imagekit.io/htuazpop/banco-de-imagens/L7wNgqt_Fqk0iAmk2.png"
                alt="Futuro Digital CMLisboa Logo"
                width={212}
                height={50}
                className="h-full w-auto"
                priority
              />
            </Link>

            <ul className="hidden md:flex items-center gap-[30px] list-none m-0 p-0">
              <li>
                <Link href="/futuro-digital#courses" className="text-[#151515] font-medium hover:text-[#5271FF] transition-colors">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/futuro-digital#about-program" className="text-[#151515] font-medium hover:text-[#5271FF] transition-colors">
                  O Programa
                </Link>
              </li>
              <li>
                <Link href="/futuro-digital#testimonials" className="text-[#151515] font-medium hover:text-[#5271FF] transition-colors">
                  Testemunhos
                </Link>
              </li>
              <li>
                <span className="text-[#5271FF] font-bold">Galeria Pedagógica</span>
              </li>
              <li>
                <Link
                  href="/futuro-digital#inscricao"
                  className="inline-block px-6 py-2.5 rounded-full font-medium transition-all duration-300 bg-[#5271FF] text-white hover:bg-[#3a5de0] hover:-translate-y-0.5"
                >
                  Inscrever-me
                </Link>
              </li>
              <li>
                <FuturoDigitalClientToolbar />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL DA GALERIA */}
      <main className="max-w-[1140px] mx-auto px-5 py-12 space-y-16">
        {/* TITULO */}
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#151515] tracking-tight mb-3">
            Catálogo & Galeria Canónica de Componentes
          </h1>
          <p className="text-lg text-[#575757] leading-relaxed max-w-3xl">
            Todos os componentes visuais, pedagógicos e de layout do ecossistema Futuro Digital (CMLisboa), prontos a usar e em perfeita paridade entre Next.js e Zero-Build HTML.
          </p>
        </div>

        {/* ========================================== */}
        {/* PARTE 1: COMPONENTES DA PÁGINA INDEX       */}
        {/* ========================================== */}

        {/* 1.1 HERO PRINCIPAL */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#151515]">Componente: Hero Principal (Landing Page)</h2>
          <p className="text-sm text-[#575757]">O cabeçalho de abertura da página inicial com chamada para ação, tipografia responsiva e imagem oficial (sem caixas limitadoras).</p>
          <div className="bg-white py-10">
            <div className="flex flex-col md:flex-row items-center gap-[40px] md:gap-[60px]">
              <div className="flex-1">
                <h1 className="text-[2.2rem] md:text-[3.5rem] font-extrabold text-[#151515] leading-[1.2] mb-4">
                  A sua jornada de capacitação digital começa aqui.
                </h1>
                <p className="text-[1.1rem] md:text-[1.2rem] text-[#575757] leading-relaxed my-5 mb-8">
                  Conheça os cursos do programa Futuro Digital e transforme a forma como trabalha em equipa na CMLisboa com as ferramentas Microsoft.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <span className="inline-block px-[28px] py-[12px] rounded-full font-medium bg-[#5271FF] text-white shadow-sm hover:bg-[#3a5de0] cursor-pointer">
                    Explorar Cursos
                  </span>
                  <span className="inline-block px-[28px] py-[12px] rounded-full font-medium border-2 border-[#5271FF] text-[#5271FF] hover:bg-[#5271FF] hover:text-white cursor-pointer">
                    Primeiro Acesso
                  </span>
                </div>
              </div>
              <div className="flex-1 text-center">
                <Image
                  src="https://ik.imagekit.io/htuazpop/banco-de-imagens/ZJvakeb_HxbQeePGQ.png"
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
          <h2 className="text-2xl font-bold text-[#151515]">Componente: CourseCard (Álbum de Cursos 2 Colunas)</h2>
          <p className="text-sm text-[#575757]">Cartão horizontal do catálogo com imagem lateral (40%), título 1.5rem, tag de categoria e botões de ação.</p>
          <div className="bg-[#fafbff] p-6 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
              {/* Card 1: Loop */}
              <div className="bg-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
                <div className="flex-none w-full md:w-[40%] relative min-h-[200px] md:min-h-auto">
                  <Image
                    src="https://ik.imagekit.io/htuazpop/banco-de-imagens/RlBJMf0_0A2NcKXIp.png"
                    alt="Microsoft Loop"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-[30px] flex flex-col flex-1">
                  <span className="inline-block px-4 py-[6px] rounded-full text-[0.9rem] font-medium mb-[15px] text-white bg-[#5271FF] w-fit">
                    Trabalhar em equipa
                  </span>
                  <h3 className="text-[1.5rem] font-bold text-[#151515] mb-[10px] leading-[1.2]">
                    Microsoft Loop
                  </h3>
                  <p className="text-[1rem] flex-grow mb-4 leading-relaxed text-[#575757]">
                    Trabalhe de forma colaborativa com o Microsoft Loop. Centralize informações, crie listas de tarefas e organize projetos em tempo real.
                  </p>
                  <div className="flex flex-wrap gap-3 items-center mt-auto">
                    <span className="inline-block px-[24px] py-[10px] rounded-full text-[0.95rem] font-medium border border-[#e0e0e0] bg-white text-[#151515] cursor-pointer hover:bg-[#f4f4f4]">
                      Saber mais
                    </span>
                    <span className="inline-block px-[24px] py-[10px] rounded-full text-[0.95rem] font-medium bg-[#5271FF] text-white cursor-pointer hover:bg-[#3a5de0]">
                      Inscrever
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Excel */}
              <div className="bg-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
                <div className="flex-none w-full md:w-[40%] relative min-h-[200px] md:min-h-auto">
                  <Image
                    src="https://ik.imagekit.io/htuazpop/banco-de-imagens/T4rwgD6_U3ezS0_hw.png"
                    alt="Microsoft Excel"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-[30px] flex flex-col flex-1">
                  <span className="inline-block px-4 py-[6px] rounded-full text-[0.9rem] font-medium mb-[15px] text-white bg-[#35B729] w-fit">
                    Trabalhar em equipa
                  </span>
                  <h3 className="text-[1.5rem] font-bold text-[#151515] mb-[10px] leading-[1.2]">
                    Microsoft Excel
                  </h3>
                  <p className="text-[1rem] flex-grow mb-4 leading-relaxed text-[#575757]">
                    Analise dados de forma poderosa e colabore em folhas de cálculo complexas com a sua equipa na nuvem.
                  </p>
                  <div className="flex flex-wrap gap-3 items-center mt-auto">
                    <span className="inline-block px-[24px] py-[10px] rounded-full text-[0.95rem] font-medium border border-[#e0e0e0] bg-white text-[#151515] cursor-pointer hover:bg-[#f4f4f4]">
                      Saber mais
                    </span>
                    <span className="inline-block px-[24px] py-[10px] rounded-full text-[0.95rem] font-medium bg-[#5271FF] text-white cursor-pointer hover:bg-[#3a5de0]">
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
          <h2 className="text-2xl font-bold text-[#151515]">Componente: AboutProgram (Duas Colunas Institucional)</h2>
          <p className="text-sm text-[#575757]">Secção de apresentação institucional com imagem de apoio (555x425px) e texto explicativo sem boxes fechadas.</p>
          <div className="bg-white py-10">
            <div className="flex flex-col md:flex-row items-center gap-[40px] md:gap-[60px]">
              <div className="flex-1">
                <Image
                  src="https://ik.imagekit.io/htuazpop/banco-de-imagens/9U2GzTP_0KMHhaNrD.png"
                  alt="About Program"
                  width={555}
                  height={425}
                  className="rounded-[8px] h-auto max-w-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-[2rem] md:text-[2.5rem] font-bold text-[#151515] mb-4 leading-[1.2]">
                  Sobre o Programa Futuro Digital
                </h3>
                <p className="text-[1rem] md:text-[1.1rem] text-[#575757] leading-relaxed mb-6">
                  O Programa para a Inclusão e Literacia Digital da Câmara Municipal de Lisboa tem como missão capacitar colaboradores com as competências essenciais para uma cidade conectada e eficiente.
                </p>
                <span className="inline-block px-[28px] py-[12px] rounded-full text-[0.95rem] font-medium bg-[#5271FF] text-white cursor-pointer hover:bg-[#3a5de0]">
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
          <h2 className="text-2xl font-bold text-[#151515]">Componente: AtividadeCard (Recursos Pedagógicos & Desafios)</h2>
          <p className="text-sm text-[#575757]">Componente de maior destaque nos cursos: gradientes coloridos, número gigante vazado e download.</p>
          <div className="border border-dashed border-gray-300 rounded-xl p-6 bg-[#fafbff] grid grid-cols-1 md:grid-cols-3 gap-6">
            <AtividadeCard
              number="01.01"
              badge="Desafio 01"
              gradientClass="from-[#748ffc] to-[#4263eb]"
              title="Criação de Documento Coautorado"
              description="Aprenda a iniciar um documento no Word Online, convidar colegas e configurar permissões."
            />
            <AtividadeCard
              number="01.02"
              gradientClass="from-[#63e6be] to-[#20c997]"
              title="Componentes Loop no Teams"
              description="Integre tabelas de votação rápida e listas de tarefas durante reuniões de equipa."
            />
            <AtividadeCard
              number="Manual"
              gradientClass="from-[#e599f7] to-[#be4bdb]"
              title="Guia Essencial Equipa ON"
              description="Manual completo de boas práticas, estrutura de pastas no SharePoint e partilha segura."
              openTitle="Ver Manual"
            />
          </div>
        </section>

        {/* 2.2 COURSE INTRO */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#151515]">Componente: CourseIntro & SessionPill</h2>
          <p className="text-sm text-[#575757]">Abertura de módulo formativo com identificador de sessão.</p>
          <div className="border border-dashed border-gray-300 rounded-xl p-6 bg-white">
            <CourseIntro
              sessionLabel="Sessão 1"
              title="Fundamentos & Boas Práticas de Inteligência Artificial"
            />
          </div>
        </section>

        {/* 2.3 STEP-BY-STEP */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#151515]">Componente: Step-by-Step (Linha Conectora Vertical)</h2>
          <p className="text-sm text-[#575757]">Guião sequencial numerado com conector visual contínuo.</p>
          <div className="border border-dashed border-gray-300 rounded-xl p-6 bg-[#fafbff]">
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
          <h2 className="text-2xl font-bold text-[#151515]">Componente: ProTip (Dica do Formador)</h2>
          <p className="text-sm text-[#575757]">Caixa de destaque visual para recomendações práticas.</p>
          <div className="border border-dashed border-gray-300 rounded-xl p-6 bg-white">
            <ProTip>
              <strong>Dica do Formador:</strong> Quando solicitar sumários de deliberações, peça ao modelo para organizar as conclusões numa tabela de 3 colunas: &quot;Assunto&quot;, &quot;Impacto Orçamental&quot; e &quot;Próximo Passo&quot;.
            </ProTip>
          </div>
        </section>

        {/* 2.5 ACCORDION */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#151515]">Componente: Accordion Interativo (FAQ)</h2>
          <p className="text-sm text-[#575757]">Componente retrátil para esclarecimento de dúvidas frequentes.</p>
          <div className="border border-dashed border-gray-300 rounded-xl p-6 bg-[#fafbff] max-w-2xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>Quem pode frequentar os cursos do Futuro Digital?</AccordionTrigger>
                <AccordionContent className="text-[#575757]">
                  Todos os trabalhadores da Câmara Municipal de Lisboa, empresas municipais e juntas de freguesia parceiras.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Como descarregar o certificado do Passaporte?</AccordionTrigger>
                <AccordionContent className="text-[#575757]">
                  Após a frequência e submissão da avaliação, o selo surge automaticamente no portal do Passaporte de Competências Digitais da CML.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* 2. RODAPÉ IDÊNTICO AO INDEX */}
      <footer className="bg-[#1b1b1b] text-[#a9a9a9] pt-[60px] mt-16">
        <div className="max-w-[1140px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 pb-10">
          <div>
            <Image
              src="https://ik.imagekit.io/htuazpop/banco-de-imagens/tYc9GgI_Dl4bUtSCi.png"
              alt="Câmara Municipal de Lisboa Logo"
              width={189}
              height={45}
              className="h-[45px] w-auto mb-5"
            />
            <p className="mb-5 leading-relaxed">
              Programa para a Inclusão e Literacia Digital da Câmara Municipal de Lisboa.
            </p>
          </div>
          <div>
            <h4 className="text-white text-[1.1rem] font-bold mb-5">Navegação</h4>
            <ul className="space-y-2.5">
              <li><Link href="/futuro-digital#courses" className="hover:text-white transition-colors">Cursos</Link></li>
              <li><Link href="/futuro-digital#about-program" className="hover:text-white transition-colors">O Programa</Link></li>
              <li><Link href="/futuro-digital#testimonials" className="hover:text-white transition-colors">Testemunhos</Link></li>
              <li><Link href="/futuro-digital#inscricao" className="hover:text-white transition-colors">Inscrição</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[1.1rem] font-bold mb-5">Cursos</h4>
            <ul className="space-y-2.5">
              <li><Link href="/futuro-digital#courses" className="hover:text-white transition-colors">Word e Loop</Link></li>
              <li><Link href="/futuro-digital#courses" className="hover:text-white transition-colors">Excel e Forms</Link></li>
              <li><Link href="/futuro-digital#courses" className="hover:text-white transition-colors">OneDrive</Link></li>
              <li><Link href="/futuro-digital#courses" className="hover:text-white transition-colors">Teams & SharePoint</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[1.1rem] font-bold mb-5">Contacto</h4>
            <p className="mb-2.5 leading-relaxed">Departamento de Formação CMLisboa<br />Email: formacao@cm-lisboa.pt</p>
            <p className="leading-relaxed">Apoio ao participante e tutoria ativa.</p>
          </div>
        </div>
        <div className="border-t border-[#333333] py-6 text-center text-xs">
          <p className="m-0">© 2026 Futuro Digital — Câmara Municipal de Lisboa. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
