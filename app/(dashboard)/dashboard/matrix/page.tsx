import { getComplianceMatrixData } from "@/lib/du/compliance-adapter";
import { MatrixClientView } from "@/components/dashboard/matrix";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MatrixShowcasePage() {
  const complianceData = await getComplianceMatrixData();

  return <MatrixClientView initialData={complianceData} />;
}

