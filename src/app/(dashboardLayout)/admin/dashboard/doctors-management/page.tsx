import DoctorFilters from "@/components/modules/Admin/DoctorManagement/DoctorFilters";
import DoctorsManagementHeader from "@/components/modules/Admin/DoctorManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorManagement/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";

import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { Suspense } from "react";

const DoctorManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObject = await searchParams;
  const queryString = queryStringFormatter(searchParamsObject);
  const specialitiesResult = await getSpecialities();
  const doctorsResult = await getDoctors(queryString);
  const totalPages = Math.ceil(
    (doctorsResult?.meta?.total || 1) / (doctorsResult?.meta?.limit || 10)
  );
  return (
    <div className="space-y-6">
      <DoctorsManagementHeader specialities={specialitiesResult.data || []} />
      <div className="flex space-x-2">
        <DoctorFilters specialties={specialitiesResult?.data || []} />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <DoctorsTable
          specialities={specialitiesResult?.data || []}
          doctors={doctorsResult?.data}
        />
        <TablePagination
          currentPage={doctorsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default DoctorManagementPage;
