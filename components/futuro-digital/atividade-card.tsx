"use client";

import React from "react";
import { Download } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AtividadeCardProps {
  number: string;
  title: string;
  description: string;
  gradientClass?: string;
  badge?: string;
  openTitle?: string;
  onOpen?: () => void;
  onDownload?: () => void;
  className?: string;
}

export function AtividadeCard({
  number,
  title,
  description,
  gradientClass = "from-[#748ffc] to-[#4263eb]",
  badge,
  openTitle = "Abrir Atividade",
  onOpen,
  onDownload,
  className,
}: AtividadeCardProps) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-xl shadow-sm border border-border overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md relative",
        className
      )}
    >
      {badge && (
        <div className="absolute top-3 left-3 bg-[#ffd43b] text-black px-2.5 py-1 rounded-full text-xs font-bold shadow z-10 flex items-center gap-1">
          <span>🏆</span> {badge}
        </div>
      )}

      {/* Header com Gradiente e Número Gigante */}
      <div
        className={cn(
          "relative p-5 min-h-[130px] flex items-end justify-end text-white/75 bg-gradient-to-tr select-none",
          gradientClass
        )}
      >
        <span className="text-7xl font-extrabold leading-none tracking-tight">
          {number}
        </span>
      </div>

      {/* Corpo do Card */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground flex-1 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex gap-2 mt-auto">
          <Button
            onClick={onOpen}
            className="flex-1 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
          >
            {openTitle}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={onDownload}
            className="rounded-lg shrink-0 border-border"
            title="Descarregar Ficheiro de Apoio"
          >
            <Download className="w-5 h-5 text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
