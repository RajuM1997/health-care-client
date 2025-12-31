"use client";

import { DateCell } from "@/components/shared/Cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/Cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/Cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IPatient } from "@/types/patient.interface";

export const patientColumns: Column<IPatient>[] = [
  {
    header: "Patient",
    accessor: (patient) => (
      <UserInfoCell
        name={patient.name}
        email={patient.email}
        photo={patient.profilePhoto}
        address={patient.address}
      />
    ),
  },
  {
    header: "Status",
    accessor: (patient) => <StatusBadgeCell isDeleted={patient.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (patient) => <DateCell date={patient.createdAt} />,
  },
];
