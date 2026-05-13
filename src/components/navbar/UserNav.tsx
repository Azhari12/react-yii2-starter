/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCheckAuthQuery, useLogoutMutation } from "@/hooks/useAuth.query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserAuthType } from "@/utilities/types/UserTypes";
import { toast } from "sonner";
import { SSO_URL } from "@/constant/CommonConstant";

const UserNav = () => {
	const { data } = useCheckAuthQuery();
	const { mutate, isPending } = useLogoutMutation();

	const userData = data.data as UserAuthType;

	const onLogout = () => {
		mutate(undefined, {
			onSuccess: () => {
				window.location.href = `${SSO_URL}/`;
			},
			onError: (error: any) => {
				toast.error(error?.response?.data?.message || "Terjadi kesalahan");
			},
		});
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative rounded-full flex items-center gap-2 mr-5 focus:outline-none focus:ring-0 focus-visible:ring-0"
				>
					<Avatar className="h-8 w-8">
						<AvatarFallback>
							{userData.nama
								.split(" ")
								.map((n) => n[0])
								.join("")
								.substring(0, 2)}
						</AvatarFallback>
					</Avatar>
					<h2 className="text-center font-normal uppercase">{userData.nama}</h2>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-72 !p-0" align="end" forceMount>
				<Card className="overflow-hidden rounded-none">
					<div className="bg-[#17a2b8] p-3 flex flex-col items-center text-white">
						<Avatar className="w-24 h-24 border-4 border-white">
							<AvatarImage src={""} alt={""} />
							<AvatarFallback className="bg-[#0A5B7A] text-white">
								{userData.nama
									.split(" ")
									.map((n) => n[0])
									.join("")
									.substring(0, 2)}
							</AvatarFallback>
						</Avatar>
						<h2 className="mt-4 text-xl font-bold text-center">
							{userData.nama}
						</h2>
						<p className="mt-1 text-sm opacity-90">{userData.username}</p>
					</div>
					<div className="p-4 flex justify-end">
						<Button
							disabled={isPending}
							onClick={onLogout}
							variant="destructive"
						>
							Keluar
						</Button>
					</div>
				</Card>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserNav;
