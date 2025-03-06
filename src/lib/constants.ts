import {
  HouseIcon,
  LogOutIcon,
  ShieldCheckIcon,
  User2Icon,
} from "lucide-react";

export const APPLICATION_NAV_ITEMS = [
  { title: "Home", url: "/dashboard", icon: HouseIcon },
  { title: "Explore", url: "/dashboard/explore", icon: User2Icon },
  {
    title: "Upgrade",
    url: "/dashboard/upgrade",
    icon: ShieldCheckIcon,
  },
  { title: "Logout", url: "#", icon: LogOutIcon },
];
