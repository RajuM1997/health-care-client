import PatientsManagementHeader from "@/components/modules/Admin/PatientManagement/PatientsManagementHeader";
import PatientsTable from "@/components/modules/Admin/PatientManagement/PatientsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getPatients } from "@/services/admin/patientsManagement";
import { Suspense } from "react";

const DoctorManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObject = await searchParams;
  const queryString = queryStringFormatter(searchParamsObject);
  const patientResult = await getPatients(queryString);
  const totalPages = Math.ceil(
    patientResult?.meta?.total / patientResult?.meta?.limit
  );
  return (
    <div className="space-y-6">
      <PatientsManagementHeader patient={patientResult.data} />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search patents..." />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <PatientsTable patients={patientResult.data} />
        <TablePagination
          currentPage={patientResult?.meta?.page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default DoctorManagementPage;
