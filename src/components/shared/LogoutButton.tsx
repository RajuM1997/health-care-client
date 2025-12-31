"use client";

import { logoutUser } from "@/services/auth/logout";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <Button className="cursor-pointer bg-red-600" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
