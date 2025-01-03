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
  "/list/attendances": ["admin", "studentService", "ticketHolder"],
  "/list/feedback": ["admin", "studentService"],
  "/list/announcements": ["admin", "studentService", "ticketHolder", "student"],
};

export const authRoutes = ["sign-in"];
