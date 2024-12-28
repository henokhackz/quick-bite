export const ITEM_PER_PAGE = 10

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/student(.*)": ["student"],
  "/list/meal-costs(.*)": ["admin", "studentService", "ticketHolder", "student"],
  "/student-service(.*)": ["studentService"],
  "/ticket-holder(.*)": ["ticketHolder"],
  "/list/student-services": ["admin"],
  "/list/students": ["admin", "studentService", "ticketHolder"],
  "/list/attendance": ["admin", "studentService", "ticketHolder"],
  "/list/feedback": ["admin", "studentSerivice"],
  "/list/announcements": ["admin", "studentService", "ticketHolder", "student"],
};