import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  CheckSquare,
  Wallet,
  MessageSquare,
  Ticket,
  Users,
  UserCircle,
  Settings,
  LogOut,
  Megaphone,
  MessageCircleMoreIcon,
} from "lucide-react";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        label: "Dashboard",
        icon: Home,
        href: "/",
        visible: ["admin", "student", "ticketHolder", "studentService"],
      },
      {
        label: "Attendance",
        icon: CheckSquare,
        href: "/list/attendances",
        visible: ["admin", "student"],
      },
      {
        label: "Meal Costs",
        icon: Wallet,
        href: "/list/meal-costs",
        visible: ["admin", "student"],
      },
      {
        label: "Feedbacks",
        icon: MessageSquare,
        href: "/list/feedbacks",
        visible: ["admin", "students", "studentService"],
      },
      {
        label: "Ticket Holders",
        icon: Ticket,
        href: "/list/ticket-holders",
        visible: ["admin"],
      },
      {
        label: "Students",
        icon: Users,
        href: "/list/students",
        visible: ["admin", 'ticketHolder'],
      },{
        label: "Announcements",
        icon:Megaphone,
        href: "/list/announcements",
        visible: ["admin", "ticketHolder", "studentService"],
      },{
        label: "Chats",
        icon: MessageCircleMoreIcon,
        href: "/list/chats",
        visible: ["admin","ticketHolder", "studentService"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        label: "Profile",
        icon: UserCircle,
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        label: "Logout",
        icon: LogOut,
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

export default async function Menu() {
  const session = await auth();
  if (!session?.user) return null;

  const {user:{role, image, name, email,}} = session 

  return (
    <div className="w-full bg-white backdrop-blur-2xl min-h-screen p-2 shadow-md flex flex-col items-center h-full max-h-screen overflow-y-scroll sticky top-0 left-0">
      {/* Logo */}
      <div className="w-full flex items-center justify-center flex-col mb-4  rounded-lg bg-gray-100 py-2 md:py-4 px-2">
      <Image src={image || '/avatar.png'} alt="Logo" height={40} width={40} className="mb-4 object-cover rounded-full" />
        <h1 className="text-lg font-semibold text-dashboardForeground/80 hidden md:block">{name}</h1>
        <p className="text-sm text-dashboardForeground/80 hidden md:block">{email}</p>
      </div>


      {menuItems.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-4 w-full space-y-2">
          <h2 className="text-xs font-semibold text-primary/80 mb-2">{category.title}</h2>
          <div className="h-[1px] bg-gray-200 rounded-lg"></div>
          {role &&
            category.items.map(
              (item, itemIndex) =>
                item.visible.includes(role) && (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className="flex items-center py-2 px-4 rounded-md hover:bg-gray-200 transition"
                  >
                    <item.icon className="w-5 h-5 mr-2 text-dashboardForeground/80 shrink-0 " />
                    <span className="hidden md:block text-dashboardForeground/80 text-sm">
                      {item.label}
                    </span>
                  </Link>
                )
            )}
        </div>
      ))}
    </div>
  );
}
