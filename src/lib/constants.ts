const students = [
  {
    id: 1,
    name: "Mekdes Asfaw",
    isBlacklisted: false,
    scholarshipStatus: "none",
    healthStatus: "none",
    department: "CSE",
    batch: "2014EC",
    assignedCafeteria: "Cafeteria 1",
    attendance: [
      { meal: "Breakfast", date: "2024-11-28", attended: true },
      { meal: "Lunch", date: "2024-11-28", attended: false },
      { meal: "Dinner", date: "2024-11-28", attended: true },
    ],
  },
  {
    id: 2,
    name: "Tewodros Kebede",
    isBlacklisted: false,
    scholarshipStatus: "scholarship", // Scholarship student
    healthStatus: "none",
    department: "CSE",
    batch: "2015EC",
    assignedCafeteria: "Cafeteria 1",
    attendance: [
      { meal: "Breakfast", date: "2024-11-28", attended: true },
      { meal: "Lunch", date: "2024-11-28", attended: true },
      { meal: "Dinner", date: "2024-11-28", attended: false },
    ],
  },
  {
    id: 3,
    name: "Hanna Girmay",
    isBlacklisted: true, // Blacklisted student
    scholarshipStatus: "none",
    healthStatus: "special", // Special health meal
    department: "CSE",
    batch: "2016EC",
    assignedCafeteria: "Cafeteria 1",
    attendance: [
      { meal: "Breakfast", date: "2024-11-28", attended: false },
      { meal: "Lunch", date: "2024-11-28", attended: false },
      { meal: "Dinner", date: "2024-11-28", attended: false },
    ],
  },
  {
    id: 4,
    name: "Solomon Tekle",
    isBlacklisted: false,
    scholarshipStatus: "none",
    healthStatus: "none",
    department: "CSE",
    batch: "2017EC",
    assignedCafeteria: "Cafeteria 1",
    attendance: [
      { meal: "Breakfast", date: "2024-11-28", attended: true },
      { meal: "Lunch", date: "2024-11-28", attended: true },
      { meal: "Dinner", date: "2024-11-28", attended: true },
    ],
  },
];

export const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Assigned Cafteria",
    accessor: "cafteria",
    className: "hidden md:table-cell",
  },
  {
    header: "Batch",
    accessor: "batch",
    className: "hidden lg:table-cell",
  },
  {
    header: "Department",
    accessor: "department",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
