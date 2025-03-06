import {
  HouseIcon,
  LogOutIcon,
  ShieldCheckIcon,
  User2Icon,
} from "lucide-react";

export const APPLICATION_NAV_ITEMS = [
  { title: "Home", url: "/dashboard", icon: HouseIcon },
  { title: "Explore", url: "#", icon: User2Icon },
  {
    title: "Upgrade",
    url: "#",
    icon: ShieldCheckIcon,
  },
  { title: "Logout", url: "#", icon: LogOutIcon },
];
