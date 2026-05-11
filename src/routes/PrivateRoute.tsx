import ForbiddenPage from "@/components/ForbiddenPage";
import PrivateLayout from "@/components/layouts/PrivateLayout";
import { useCheckAuthQuery } from "@/hooks/useAuth.query";
import { hasPermission } from "@/utilities/helper";
import { UserAuthType } from "@/utilities/types/UserTypes";
import { useLocation } from "react-router";

const PrivateRoute = () => {
  const { data } = useCheckAuthQuery();
  const userData = data.data as UserAuthType;
  const path = useLocation();
  const urlPath = path.pathname.split("/")[1] ?? "";

  if (!hasPermission(userData.permissions, [urlPath]) && urlPath) {
    return <ForbiddenPage />;
  }

  return <PrivateLayout />;
};

export default PrivateRoute;
