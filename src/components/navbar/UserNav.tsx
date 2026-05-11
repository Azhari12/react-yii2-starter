import { useCheckAuthQuery, useLogoutMutation } from "@/hooks/useAuth.query";
import { UserAuthType } from "@/utilities/types/UserTypes";
import { LogOut, User } from "lucide-react";
import { SSO_URL } from "@/constant/CommonConstant";

const UserNav = () => {
  const { data } = useCheckAuthQuery();
  const userData = data.data as UserAuthType;
  const { mutate: logoutMutate } = useLogoutMutation();

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        window.location.href = SSO_URL || "/";
      },
    });
  };

  return (
    <div className="flex items-center gap-3 px-4">
      <div className="text-right hidden sm:block">
        <p className="text-sm font-medium">{userData.nama}</p>
        <p className="text-xs text-muted-foreground">{userData.roles?.[0] || "user"}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
        <button
          onClick={handleLogout}
          className="h-8 w-8 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
          title="Logout"
        >
          <LogOut className="h-4 w-4 text-destructive" />
        </button>
      </div>
    </div>
  );
};

export default UserNav;
