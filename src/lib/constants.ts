import {
  ClipboardCheckIcon,
  Grid2X2CheckIcon,
  HouseIcon,
  LightbulbIcon,
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

export const STEPPER_OPTIONS = [
  {
    id: 1,
    title: "Category",
    icon: Grid2X2CheckIcon,
  },
  {
    id: 2,
    title: "Topic",
    icon: LightbulbIcon,
  },
  {
    id: 3,
    title: "Description",
    icon: ClipboardCheckIcon,
  },
];

export const CATEGORY_LIST = [
  {
    id: 1,
    title: "Programming",
    icon: "/programming.png",
    prompt: "",
  },
  {
    id: 2,
    title: "Math",
    icon: "/math.png",
    prompt: "",
  },
  {
    id: 3,
    title: "Problem Solving",
    icon: "/problem-solving.png",
    prompt: "",
  },
  {
    id: 4,
    title: "Health",
    icon: "/health.png",
    prompt: "",
  },
  {
    id: 5,
    title: "Creative",
    icon: "/creativity.png",
    prompt: "",
  },
];
