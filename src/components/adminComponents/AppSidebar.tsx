
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  FolderPlus,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function AppSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      title: "Products",
      icon: Package,
      path: "/admin/products",
    },
    {
      title: "Categories",
      icon: FolderPlus,
      path: "/admin/categories",
    },
    {
      title: "Requests",
      icon: ShoppingBag,
      path: "/admin/requests",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/admin");
  };
  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span>MTFC</span>
          <span className="text-sm font-normal text-muted-foreground">Admin</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={pathname === item.path ? "bg-accent" : ""}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-6">
        <button onClick={handleLogout} className="flex w-full items-center gap-3 text-muted-foreground hover:text-foreground">
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
