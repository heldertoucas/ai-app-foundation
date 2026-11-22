import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Avaliação Dashboard — Template Canónico',
  description: 'Cockpit operacional de avaliação e sincronização de pautas em tempo real.',
};

export default function AvaliacaoDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col w-full bg-muted/10 min-h-screen">
      {children}
    </div>
  );
}
