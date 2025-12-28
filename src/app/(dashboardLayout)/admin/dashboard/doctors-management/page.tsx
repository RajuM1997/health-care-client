import DoctorsManagementHeader from "@/components/modules/Admin/DoctorManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorManagement/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";
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
    doctorsResult?.meta?.total / doctorsResult?.meta?.limit
  );
  return (
    <div className="space-y-6">
      <DoctorsManagementHeader specialities={specialitiesResult.data} />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
        <SelectFilter
          paramName="speciality" // ?speciality="Cardiology"
          options={specialitiesResult.data.map((speciality: ISpecialty) => ({
            label: speciality.title,
            value: speciality.title,
          }))}
          placeholder="Filter by speciality"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <DoctorsTable
          specialities={specialitiesResult.data}
          doctors={doctorsResult.data}
        />
        <TablePagination
          currentPage={doctorsResult?.meta?.page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default DoctorManagementPage;
