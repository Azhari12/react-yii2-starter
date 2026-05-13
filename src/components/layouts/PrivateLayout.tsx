import { Activity } from "lucide-react";
import { AppSidebar } from "../app-sidebar";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import UserNav from "../navbar/UserNav";
import { Outlet, useLocation } from "react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import ContainerTextFlip from "../ui/container-text-flip";

const PrivateLayout = () => {
	const location = useLocation();
	const path = location.pathname.split("/");
	const [openSidebar, setOpenSidebar] = useState(true);
	return (
		<SidebarProvider
			open={openSidebar}
			onOpenChange={setOpenSidebar}
		>
			<AppSidebar collapsible="icon" className="dark text-primary" />
			<SidebarInset>
				<header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b !sticky top-0 bg-white z-50">
					<div className="flex items-center gap-2 px-3">
						<SidebarTrigger />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<div className="flex items-center gap-1 text-primary">
							<Activity
								size={28}
								strokeWidth={2}
								className="activity-icon-animated"
							/>
							<p className="font-bold text-xl">
								<span className="font-normal">SIMDOK</span>
							</p>
							<ContainerTextFlip
								words={[
									"Sistem Manajemen Dokumen",
									"RSUD Arifin Achmad",
									"Selamat menikmati hari ini",
									"Jangan lupa tersenyum",
									"Semangat bekerja",
									"Semoga hari ini menyenangkan",
								]}
								interval={3000}
								animationDuration={1000}
								className="ml-2 !text-sm !text-muted-foreground ![background:linear-gradient(to_bottom,#f9fafb,#f3f4f6)] !shadow-[inset_0_-1px_#e5e7eb,inset_0_0_0_1px_#e5e7eb,_0_2px_4px_rgba(0,0,0,0.04)]"
								textClassName="!text-muted-foreground"
							/>
						</div>
					</div>
					<UserNav />
				</header>
				<div className="flex flex-1 flex-col gap-4 py-4 px-3">
					<div className="w-full flex justify-end min-h-5">
						{path[1] !== "" && (
							<Breadcrumb>
								<BreadcrumbList>
									{path.map((item, index) =>
										index === 1 && item === "" ? null : (
											<React.Fragment key={index}>
												<BreadcrumbItem className="hidden md:block">
													<BreadcrumbLink
														href={
															item === ""
																? "/"
																: path.slice(0, index + 1).join("/")
														}
														className={cn(
															"capitalize",
															item === path[path.length - 1] && "font-semibold",
														)}
													>
														{item.replace(/-/g, " ") || "Home"}
													</BreadcrumbLink>
												</BreadcrumbItem>
												{index < path.length - 1 && path[index + 1] !== "" && (
													<BreadcrumbSeparator className="hidden md:block" />
												)}
											</React.Fragment>
										),
									)}
								</BreadcrumbList>
							</Breadcrumb>
						)}
					</div>
					<div className="min-h-min bg-white p-4 drop-shadow rounded-md">
						<Outlet />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default PrivateLayout;
