import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FuturoDigitalClientToolbar } from "./client-toolbar";

export const metadata: Metadata = {
  title: "Futuro Digital CMLisboa",
  description: "A sua jornada de capacitação digital começa aqui. Transforme a forma como trabalha em equipa na CMLisboa.",
};


const COURSES = [
  {
    id: "word",
    title: "Microsoft Word",
    description: "Domine a criação e redação de documentos profissionais com o poder da coautoria em tempo real.",
    tag: "Trabalhar em equipa",
    tagColor: "bg-[#5271FF]",
    imageUrl: "https://ik.imagekit.io/htuazpop/banco-de-imagens/HODzPjK_dKyC9Ajn1.png",
  },
  {
    id: "excel",
    title: "Microsoft Excel",
    description: "Analise dados de forma poderosa e colabore em folhas de cálculo complexas com a sua equipa na nuvem.",
    tag: "Trabalhar em equipa",
    tagColor: "bg-[#35B729]",
    imageUrl: "https://ik.imagekit.io/htuazpop/banco-de-imagens/T4rwgD6_U3ezS0_hw.png",
  },
  {
    id: "loop",
    title: "Microsoft Loop",
    description: "Trabalhe de forma colaborativa com o Microsoft Loop. Centralize informações, crie listas de tarefas e organize projetos em tempo real.",
    tag: "Trabalhar em equipa",
    tagColor: "bg-[#5271FF]",
    imageUrl: "https://ik.imagekit.io/htuazpop/banco-de-imagens/RlBJMf0_0A2NcKXIp.png",
  },
  {
    id: "excelforms",
    title: "Microsoft Excel e Forms",
    description: "Crie inquéritos, recolha respostas automaticamente e analise resultados em tempo real com o Excel na nuvem.",
    tag: "Trabalhar em equipa",
    tagColor: "bg-[#35B729]",
    imageUrl: "https://ik.imagekit.io/htuazpop/banco-de-imagens/T4rwgD6_U3ezS0_hw.png",
  },
];

export default function FuturoDigitalHomePage() {
  return (
    <div data-theme="futuro-digital" className="min-h-screen bg-white text-[#575757] font-sans antialiased">
      {/* 1. CABEÇALHO FAC-SÍMILE */}
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
                <a href="#courses" className="text-[#151515] font-medium hover:text-[#5271FF] transition-colors">
                  Cursos
                </a>
              </li>
              <li>
                <a href="#about-program" className="text-[#151515] font-medium hover:text-[#5271FF] transition-colors">
                  O Programa
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-[#151515] font-medium hover:text-[#5271FF] transition-colors">
                  Testemunhos
                </a>
              </li>
              <li>
                <Link href="/futuro-digital/galeria" className="text-[#5271FF] font-semibold">
                  Galeria Pedagógica
                </Link>
              </li>
              <li>
                <a
                  href="#inscricao"
                  className="inline-block px-6 py-2.5 rounded-full font-medium transition-all duration-300 bg-[#5271FF] text-white hover:bg-[#3a5de0] hover:-translate-y-0.5"
                >
                  Inscrever-me
                </a>
              </li>
              <li>
                <FuturoDigitalClientToolbar />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 2. HERO COMPONENT FAC-SÍMILE */}
      <section id="hero" className="py-[100px] bg-white">
        <div className="max-w-[1140px] mx-auto px-5 flex flex-col md:flex-row items-center gap-[60px]">
          <div className="flex-1">
            <h1 className="fd-hero-title-exact text-[3.5rem] font-extrabold leading-[1.2] text-[#151515] mb-4" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.2, color: '#151515' }}>
              A sua jornada de capacitação digital começa aqui.
            </h1>
            <p className="fd-hero-desc-exact text-[1.2rem] my-[20px] mb-[30px] leading-relaxed text-[#575757]" style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#575757' }}>
              Conheça os cursos do programa Futuro Digital e transforme a forma como trabalha em equipa na CMLisboa com as ferramentas Microsoft.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#courses"
                className="inline-block px-[28px] py-[12px] rounded-full font-medium transition-all duration-300 bg-[#5271FF] text-white hover:bg-[#3a5de0] hover:-translate-y-[2px]"
              >
                Explorar Cursos
              </a>
              <a
                href="#about-program"
                className="inline-block px-[28px] py-[12px] rounded-full font-medium transition-all duration-300 border-2 border-[#5271FF] text-[#5271FF] hover:bg-[#5271FF] hover:text-white hover:-translate-y-[2px]"
              >
                Primeiro Acesso
              </a>
            </div>
          </div>
          <div className="flex-1 text-center">
            <Image
              src="https://ik.imagekit.io/htuazpop/banco-de-imagens/ZJvakeb_HxbQeePGQ.png"
              alt="Ilustração de uma pessoa a interagir com elementos digitais"
              width={555}
              height={468}
              priority
              className="max-w-full h-auto mx-auto"
            />
          </div>
        </div>
      </section>

      {/* 3. ÁLBUM DE CURSOS FAC-SÍMILE */}
      <section id="courses" className="bg-[#fafbff] py-20">
        <div className="max-w-[1140px] mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-[2.5rem] font-bold text-[#151515] mb-4 leading-[1.2]">
              Cursos Disponíveis
            </h2>
            <p className="text-[1.1rem] max-w-[600px] mx-auto text-[#575757]">
              Formações práticas e focadas nas ferramentas que potenciam a colaboração e produtividade da sua equipa no dia a dia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
              >
                <div className="flex-none w-full md:w-[40%] relative min-h-[200px] md:min-h-auto">
                  <Image
                    src={course.imageUrl}
                    alt={`Ilustração do curso ${course.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-[30px] flex flex-col flex-1">
                  <span className={`inline-block px-4 py-[6px] rounded-full text-[0.9rem] font-medium mb-[15px] text-white w-fit ${course.tagColor}`}>
                    {course.tag}
                  </span>
                  <h3 className="text-[1.5rem] font-bold text-[#151515] mb-[10px] leading-[1.2]">
                    {course.title}
                  </h3>
                  <p className="text-[1rem] flex-grow mb-4 leading-relaxed text-[#575757]">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-3 items-center mt-auto">
                    <Link
                      href="/futuro-digital/galeria"
                      className="inline-block px-[24px] py-[10px] rounded-full font-medium transition-all duration-300 border border-[#e0e0e0] bg-white text-[#151515] hover:bg-[#f4f4f4]"
                    >
                      Saber mais
                    </Link>
                    <a
                      href="#inscricao"
                      className="inline-block px-[24px] py-[10px] rounded-full font-medium transition-all duration-300 bg-[#5271FF] text-white hover:bg-[#3a5de0]"
                    >
                      Inscrever
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT PROGRAM FAC-SÍMILE */}
      <section id="about-program" className="bg-white py-20">
        <div className="max-w-[1140px] mx-auto px-5 flex flex-col md:flex-row items-center gap-[60px]">
          <div className="flex-1">
            <Image
              src="https://ik.imagekit.io/htuazpop/banco-de-imagens/9U2GzTP_0KMHhaNrD.png"
              alt="Equipa a colaborar num projeto digital"
              width={555}
              height={425}
              className="rounded-[8px] max-w-full h-auto"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-[2.5rem] font-bold text-[#151515] mb-4 leading-[1.2]">
              Sobre o Programa Futuro Digital
            </h2>
            <p className="text-[1.1rem] text-[#575757] mb-6 leading-relaxed">
              O Programa para a Inclusão e Literacia Digital da Câmara Municipal de Lisboa tem como missão capacitar os seus colaboradores e todos os cidadãos com as competências digitais essenciais para os desafios do presente e do futuro, promovendo uma cidade mais conectada, eficiente e inclusiva.
            </p>
            <a
              href="https://lisbon.cityoflearning.eu/pt/activities/21650"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-[28px] py-[12px] rounded-full font-medium transition-all duration-300 bg-[#5271FF] text-white hover:bg-[#3a5de0] hover:-translate-y-[2px]"
            >
              Conheça os Cursos
            </a>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SLIDER */}
      <section id="testimonials" className="bg-[#fafbff] py-20">
        <div className="max-w-[1140px] mx-auto px-5 text-center">
          <h2 className="text-[2.5rem] font-bold text-[#151515] mb-4 leading-[1.2]">
            O Que Dizem os Nossos Formandos
          </h2>
          <p className="text-[1.1rem] max-w-[600px] mx-auto text-[#575757] mb-12">
            Testemunhos reais de participantes que melhoraram a sua forma de trabalhar.
          </p>
          <div className="max-w-[800px] mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="text-[#f39c12] text-2xl mb-4">★★★★★</div>
            <p className="text-xl italic text-[#575757] mb-4">
              “Excelente formação! Muito prática e com impacto direto no meu trabalho diário. Consegui automatizar relatórios que me demoravam horas.”
            </p>
            <p className="font-bold text-[#151515]">- Maria Silva, Departamento de Ação Social</p>
          </div>
        </div>
      </section>

      {/* 6. REGISTRATION CARDS */}
      <section id="inscricao" className="bg-[#f4f4f4] py-20">
        <div className="max-w-[1140px] mx-auto px-5 text-center">
          <h2 className="text-[2.5rem] font-bold text-[#151515] mb-4 leading-[1.2]">
            Pronto para Começar?
          </h2>
          <p className="text-[1.1rem] max-w-[600px] mx-auto text-[#575757] mb-10">
            O curso está aberto a todos os cidadãos maiores de 18 anos e trabalhadores da CMLisboa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] text-left">
            <div className="bg-white p-10 rounded-[8px] shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
              <h3 className="text-[1.5rem] font-bold text-[#151515] mb-[15px] leading-[1.2]">
                Trabalhadores CMLisboa
              </h3>
              <p className="text-[1rem] text-[#575757] mb-[30px] leading-relaxed">
                A inscrição é feita através da aplicação do Departamento de Desenvolvimento de Formação (disponível na rede interna) ou descarregando a ficha de inscrição.
              </p>
              <a
                href="#contacto"
                className="inline-block px-[28px] py-[12px] rounded-full font-medium transition-all duration-300 bg-[#5271FF] text-white hover:bg-[#3a5de0] hover:-translate-y-[2px]"
              >
                Inscrição Trabalhador/a
              </a>

            </div>

            <div className="bg-white p-10 rounded-[8px] shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
              <h3 className="text-[1.5rem] font-bold text-[#151515] mb-[15px] leading-[1.2]">
                Cidadãos
              </h3>
              <p className="text-[1rem] text-[#575757] mb-[30px] leading-relaxed">
                Todos os cidadãos com mais de 18 anos podem inscrever-se diretamente através do formulário de inscrição online. Garanta a sua vaga!
              </p>
              <a
                href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-[28px] py-[12px] rounded-full font-medium transition-all duration-300 bg-[#5271FF] text-white hover:bg-[#3a5de0] hover:-translate-y-[2px]"
              >
                Inscrição Cidadãos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RODAPÉ FAC-SÍMILE */}
      <footer className="bg-[#1b1b1b] text-[#a9a9a9] pt-[60px]">
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
              <li><a href="#courses" className="hover:text-white transition-colors">Cursos</a></li>
              <li><a href="#about-program" className="hover:text-white transition-colors">O Programa</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testemunhos</a></li>
              <li><a href="#inscricao" className="hover:text-white transition-colors">Inscrição</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[1.1rem] font-bold mb-5">Cursos</h4>
            <ul className="space-y-2.5">
              <li><a href="#courses" className="hover:text-white transition-colors">Word e Loop</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Excel e Forms</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">OneDrive</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Teams & SharePoint</a></li>
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
