import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Settings, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { type ReactNode } from "react";

const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { data: sessionData } = useSession();
  return (
    <header className="flex items-center justify-between">
      <div>{children}</div>
      <div className="flex items-center gap-4">
        <span>Welcome back</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            <Avatar>
              <AvatarImage src={sessionData?.user.image ?? ""} alt="@ecrax" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>{sessionData?.user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" /> Profile
              </div>
              <span className="">⌘+L</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </div>
              <span>⌘+,</span>
            </DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
