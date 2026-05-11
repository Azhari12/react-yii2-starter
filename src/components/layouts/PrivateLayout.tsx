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
import React from "react";

const PrivateLayout = () => {
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <SidebarProvider>
      <AppSidebar collapsible="icon" className="dark text-primary" />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b sticky top-0 bg-white z-50">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <p className="font-bold text-lg text-primary">
              <span className="font-normal">STARTER</span> KIT
            </p>
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
                            href={item === "" ? "/" : path.slice(0, index + 1).join("/")}
                            className={cn(
                              "capitalize",
                              item === path[path.length - 1] && "font-semibold"
                            )}
                          >
                            {item.replace(/-/g, " ") || "Home"}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < path.length - 1 && path[index + 1] !== "" && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                      </React.Fragment>
                    )
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
