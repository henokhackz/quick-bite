export const ITEM_PER_PAGE = 10;

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/student(.*)": ["student"],
  "/list/meal-costs(.*)": [
    "admin",
    "studentService",
    "ticketHolder",
    "student",
  ],
  "/student-service(.*)": ["studentService", "admin"],
  "/ticket-holder(.*)": ["ticketHolder"],
  "/list/ticket-holders": ["admin"],
  "/list/student-services": ["admin"],
  "/list/students": ["studentService", "ticketHolder", "admin"],
  "/list/attendances": ["admin", "studentService", "ticketHolder", "student"],
  "/list/feedback": ["admin", "studentService", "ticketHolder", "student"],
  "/list/feedbacks": ["admin", "studentService", "ticketHolder", "student"],
  "/list/chats(.*)": ["admin", "studentService", "ticketHolder", "student"],
  "/list/announcements": ["admin", "studentService", "ticketHolder", "student"],
};

// roleRoutes.js
export const roleRoutes: {
  [key in "ticketHolder" | "studentService" | "admin" | "student"]: string;
} = {
  ticketHolder: "/ticket-holder",
  studentService: "/student-service",
  admin: "/admin",
  student: "/student",
};

export const authRoutes = ["sign-in"];
