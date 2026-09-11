import { getMemoryCandidates } from "@/lib/du/memory-adapter";
import { WorkflowClientView } from "@/components/dashboard/workflow";

export default async function WorkflowShowcasePage() {
  const candidates = await getMemoryCandidates();

  return <WorkflowClientView initialCandidates={candidates} />;
}

