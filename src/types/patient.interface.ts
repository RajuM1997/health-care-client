export interface IPatient {
  id?: string;
  name: string;
  email: string;
  password: string;
  address?: string;
  profilePhoto?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
