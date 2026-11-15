import { getMemoryCandidates } from "@/lib/du/memory-adapter";
import { WorkflowClientView } from "@/components/dashboard/workflow";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WorkflowShowcasePage() {
  const candidates = await getMemoryCandidates();

  return <WorkflowClientView initialCandidates={candidates} />;
}

