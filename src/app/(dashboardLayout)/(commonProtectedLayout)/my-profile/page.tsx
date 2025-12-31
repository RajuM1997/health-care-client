import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";

const AdminProfilePage = async () => {
  const userData = await getUserInfo();

  return <MyProfile userInfo={userData} />;
};

export default AdminProfilePage;
