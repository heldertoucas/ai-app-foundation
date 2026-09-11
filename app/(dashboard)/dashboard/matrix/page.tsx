import { getComplianceMatrixData } from "@/lib/du/compliance-adapter";
import { MatrixClientView } from "@/components/dashboard/matrix";

export default async function MatrixShowcasePage() {
  const complianceData = await getComplianceMatrixData();

  return <MatrixClientView initialData={complianceData} />;
}

