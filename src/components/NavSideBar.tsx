import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";

export const NavSideBar = () => {
  return (
    <Sidebar
      variant="floating"
      side="right"
    >
      <SidebarContent className="flex flex-col py-20 px-10 h-full items-center bg-background">
        <SidebarMenu className="flex flex-col text-[20px] items-center gap-7">
          <SidebarMenuItem>
            <Button asChild>
              <a
                href="/blogs"
                className="!py-1 text-[22px] !rounded-full"
              >
                Blogs
              </a>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button asChild>
              <a
                href="https://liam-kyle.works"
                target="_blank"
                rel="noopener noreferrer"
                className="!py-1 text-[22px] !rounded-full"
              >
                Portfolio
              </a>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ThemeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default NavSideBar;
