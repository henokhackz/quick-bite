import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        label: "Dashboard",
        icon: () => (
          <img src="/home.png" alt="Home Icon" className="w-5 h-5 mr-2" />
        ),
        href: "/",
        visible: ["admin", "student", "ticketHolder", "studentService"],
      },
      {
        label: "Attendance",
        icon: () => (
          <img
            src="/attendance.png"
            alt="Attendance Icon"
            className="w-5 h-5 mr-2"
          />
        ),
        href: "/list/attendances",
        visible: ["admin", "student"],
      },
      {
        label: "Meal Costs",
        icon: () => (
          <img
            src="/finance.png"
            alt="Meal Costs Icon"
            className="w-5 h-5 mr-2"
          />
        ),
        href: "/list/meal-costs",
        visible: ["admin", "student"],
      },
      {
        label: "Feedback",
        icon: () => (
          <img
            src="/message.png"
            alt="Feedback Icon"
            className="w-5 h-5 mr-2"
          />
        ),
        href: "/list/feedbacks",
        visible: ["admin", "students", "studentService"],
      },
      {
        label: "Ticket Holders",
        icon: () => (
          <img
            src="/ticket-holders.png"
            alt="Feedback Icon"
            className="w-5 h-5 mr-2"
          />
        ),
        href: "/list/ticket-holders",
        visible: ["admin"],
      },
      {
        label: "Student Service",
        icon: () => (
          <img
            src="/student-service.png"
            alt="Feedback Icon"
            className="w-5 h-5 mr-2"
          />
        ),
        href: "/list/student-services",
        visible: ["admin"],
      },
      {
        label: "Students",
        icon: () => (
          <img
            src="/student.png"
            alt="Student Management Icon"
            className="w-5 h-5 mr-2"
          />
        ),
        href: "/list/students",
        visible: ["admin"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        label: "Profile",
        icon: () => (
          <img src="/profile.png" alt="Profile Icon" className="w-5 h-5 mr-2" />
        ),
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        label: "Settings",
        icon: () => (
          <img
            src="/setting.png"
            alt="Settings Icon"
            className="w-5 h-5 mr-2"
          />
        ),
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        label: "Logout",
        icon: () => (
          <img src="/logout.png" alt="Logout Icon" className="w-5 h-5 mr-2" />
        ),
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

export default async function Menu() {
  const session = await auth();

  const role = session?.user.role;

  return (
    <div className="w-full bg-white min-h-screen p-2 shodow-md gap-4 flex flex-col items-center h-full  max-h-screen overflow-y-scroll top-0 left-0 sticky">
      {/* Logo */}
      <Image
        src="/logo.jpeg"
        alt="Logo"
        className="w-15 h-15 mb-4"
        height={40}
        width={40}
      />

      {menuItems.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-4 w-full space-y-4">
          {/* Category Title */}
          <h2 className="text-xs font-semibold text-gray-500 mb-4 mt-4">
            {category.title}
          </h2>

          {/* Items in Category */}
          {role &&
            category.items.map(
              (item, itemIndex) =>
                item.visible.includes(role) && (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className="flex items-center py-2 px-4 rounded-md hover:bg-gray-200"
                  >
                    {/* Icon */}
                    {item.icon()}

                    {/* Label */}
                    <span className="hidden md:block xl:hidden text-dashboardForeground text-sm">
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
