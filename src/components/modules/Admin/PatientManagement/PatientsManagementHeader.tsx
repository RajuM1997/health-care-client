"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { IPatient } from "@/types/patient.interface";
import PatientFormDialog from "./PatientFormDialog";

interface PatientManagementHeaderProps {
  patient?: IPatient;
}

const PatientsManagementHeader = ({
  patient,
}: PatientManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      <PatientFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        patient={patient}
      />

      <ManagementPageHeader
        title="Patients Management"
        description="Manage Patients information and details"
        // action={{
        //   label: "Add Doctor",
        //   icon: Plus,
        //   onClick: () => setIsDialogOpen(true),
        // }}
      />
    </>
  );
};

export default PatientsManagementHeader;
