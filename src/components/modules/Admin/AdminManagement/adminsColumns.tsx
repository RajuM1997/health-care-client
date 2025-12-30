"use client";

import { DateCell } from "@/components/shared/Cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/Cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/Cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IAdmin } from "@/types/admin.interface";

export const adminsColumns: Column<IAdmin>[] = [
  {
    header: "Admin",
    accessor: (admin) => (
      <UserInfoCell
        name={admin.name}
        email={admin.email}
        photo={admin.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact",
    accessor: (admin) => (
      <div className="flex flex-col">
        <span className="text-sm">{admin.contactNumber}</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (admin) => <StatusBadgeCell isDeleted={admin.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (admin) => <DateCell date={admin.createdAt} />,
    sortKey: "createdAt",
  },
];
