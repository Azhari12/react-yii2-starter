/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import iconRsud from "@/assets/favicon.ico";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import {
	ChevronRight,
	FolderOpen,
	Home,
	Key,
	Route,
	UserCog,
	Users,
} from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";
import { hasPermission } from "@/utilities/helper";
import { useCheckAuthQuery } from "@/hooks/useAuth.query";
import { UserAuthType } from "@/utilities/types/UserTypes";

const dataNav = {
	navMain: [
		{
			title: "Dashboard",
			url: "/",
			icon: <Home />,
		},
		{
			title: "Categories",
			url: "categories",
			icon: <FolderOpen />,
			permissions: ["categories"],
		},
	],
	RBAC: [
		{
			title: "Route",
			url: "rbac/route",
			icon: <Route />,
			permissions: ["rbac"],
		},
		{
			title: "Permission",
			url: "rbac/permission",
			icon: <Key />,
			permissions: ["rbac"],
		},
		{
			title: "Role",
			url: "rbac/role",
			icon: <Users />,
			permissions: ["rbac"],
		},
		{
			title: "Assignment",
			url: "rbac/assignment",
			icon: <UserCog />,
			permissions: ["rbac"],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const path = useLocation();
	const urlPath = path.pathname.split("/")[1];

	const { data } = useCheckAuthQuery();
	const userData = data.data as UserAuthType;

	return (
		<Sidebar {...props} variant="floating">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/">
								<img
									src={iconRsud}
									alt="RSUD Arifin Achmad Icon"
									className="size-8"
								/>
								<div className="flex gap-1 leading-none text-lg">
									<span className="font-semibold">SIMDOK</span>
									<span className="">v1.0.0</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{dataNav.navMain.map((item: any) => {
							const isShow = !item.permissions || hasPermission(
								userData.permissions,
								item.permissions
							);
							if (!isShow) return null;
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={
											!urlPath && item.url === "/" ? true : urlPath === item.url
										}
									>
										<Link
											to={item.url}
											className=" flex items-center gap-2 font-semibold text-sm"
										>
											{item.icon} {item.title}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
				{hasPermission(userData.permissions, ["rbac", "root"]) && (
					<Collapsible
						key={"rbac"}
						title={"rbac"}
						defaultOpen
						className="group/collapsible"
					>
						<SidebarGroup>
							<SidebarGroupLabel asChild className="group/label hover:bg-muted">
								<CollapsibleTrigger>
									RBAC{" "}
									<ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
								</CollapsibleTrigger>
							</SidebarGroupLabel>
							<CollapsibleContent>
								<SidebarMenu>
									{dataNav.RBAC.map((item) => {
										const isShow = hasPermission(
											userData.permissions,
											item.permissions
										);
										if (!isShow) return null;
										return (
											<SidebarMenuItem key={item.title}>
												<SidebarMenuButton asChild>
													<Link
														to={item.url}
														className=" flex items-center gap-2 font-semibold text-sm"
													>
														{item.icon} {item.title}
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</CollapsibleContent>
						</SidebarGroup>
					</Collapsible>
				)}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
