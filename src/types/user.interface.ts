import { UserRole } from "@/lib/auth-utils";

export interface UserInfo {
  email: string;
  role: UserRole;
  name: string;
}
