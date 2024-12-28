import { Attendance, Feedback, Student, TicketHolder } from "../../types";

export const students: Student[] = [
    {
      id: "1",
      studentId: "STU1001",
      name: "Alice Johnson",
      role: "student",
      photos: {
        photo1: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
        photo2: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200"
      },
      qrcode: { code: "QR1001" },
      isBlacklisted: false,
      scholarshipStatus: "none",
      healthStatus: "special",
      department: "Computer Science",
      batch: "2024",
      assignedCafeteria: "Main Cafeteria",
      attendance: [
        { meal: "Breakfast", date: "2024-12-01", attended: true },
        { meal: "Lunch", date: "2024-12-01", attended: true }
      ]
    },
    {
      id: "2",
      studentId: "STU1002",
      name: "Bob Smith",
      role: "student",
      photos: {
        photo1: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
        photo2: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200"
      },
      qrcode: { code: "QR1002" },
      isBlacklisted: true,
      scholarshipStatus: "scholarship",
      healthStatus: "none",
      department: "Electrical Engineering",
      batch: "2023",
      assignedCafeteria: "North Wing Cafeteria",
      attendance: [
        { meal: "Dinner", date: "2024-12-02", attended: true }
      ]
    },
    {
      id: "3",
      studentId: "STU1003",
      name: "Clara Davis",
      role: "studentService",
      photos: {
        photo1: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
        photo2: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200"
      },
      qrcode: { code: "QR1003" },
      isBlacklisted: false,
      scholarshipStatus: "none",
      healthStatus: "none",
      department: "Mechanical Engineering",
      batch: "2025",
      assignedCafeteria: "South Wing Cafeteria",
      attendance: [
        { meal: "Lunch", date: "2024-12-03", attended: false }
      ],
      studentServices: {
        isMember: true,
        position: "Event Coordinator",
        discription: "Organizes cultural events and workshops."
      }
    },
    {
      id: "4",
      studentId: "STU1004",
      name: "David Wright",
      role: "studentService",
      photos: {
        photo1: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
        photo2: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200"
      },
      qrcode: { code: "QR1004" },
      isBlacklisted: false,
      scholarshipStatus: "none",
      healthStatus: "none",
      department: "Civil Engineering",
      batch: "2022",
      assignedCafeteria: "Main Cafeteria",
      attendance: []
    },
    {
      id: "5",
      studentId: "STU1005",
      name: "Eleanor Green",
      role: "student",
      photos: {
        photo1: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
        photo2: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200"
      },
      qrcode: { code: "QR1005" },
      isBlacklisted: false,
      scholarshipStatus: "scholarship",
      healthStatus: "none",
      department: "Architecture",
      batch: "2024",
      assignedCafeteria: "Main Cafeteria",
      attendance: [
        { meal: "Breakfast", date: "2024-12-03", attended: true }
      ]
    },
    {
      id: "6",
      studentId: "STU1006",
      name: "Frank Harris",
      role: "student",
      photos: {
        photo1: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
        photo2: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200"
      },
      qrcode: { code: "QR1006" },
      isBlacklisted: false,
      scholarshipStatus: "none",
      healthStatus: "none",
      department: "Software Engineering",
      batch: "2025",
      assignedCafeteria: "South Wing Cafeteria",
      attendance: [
        { meal: "Lunch", date: "2024-12-01", attended: true },
        { meal: "Dinner", date: "2024-12-01", attended: false }
      ]
    },
    {
      id: "7",
      studentId: "STU1007",
      name: "Grace Lee",
      role: "student",
      photos: {
        photo1: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
        photo2: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200"
      },
      qrcode: { code: "QR1007" },
      isBlacklisted: false,
      scholarshipStatus: "scholarship",
      healthStatus: "special",
      department: "Pharmacy",
      batch: "2023",
      assignedCafeteria: "East Wing Cafeteria",
      attendance: []
    },
    {
      id: "8",
      studentId: "STU1008",
      name: "Henry Miller",
      role: "studentService",
      photos: {
        photo1: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
        photo2: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200"
      },
      qrcode: { code: "QR1008" },
      isBlacklisted: false,
      scholarshipStatus: "none",
      healthStatus: "none",
      department: "Physics",
      batch: "2025",
      assignedCafeteria: "North Wing Cafeteria",
      attendance: [],
      studentServices: {
        isMember: true,
        position: "Volunteer",
        discription: "Assists in managing cafeteria logistics."
      }
    },
    {
      id: "9",
      studentId: "STU1009",
      name: "Ivy Turner",
      role: "student",
      photos: {
        photo1: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
        photo2: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200"
      },
      qrcode: { code: "QR1009" },
      isBlacklisted: false,
      scholarshipStatus: "none",
      healthStatus: "none",
      department: "Mathematics",
      batch: "2023",
      assignedCafeteria: "Main Cafeteria",
      attendance: [
        { meal: "Breakfast", date: "2024-12-02", attended: false },
        { meal: "Dinner", date: "2024-12-02", attended: true }
      ]
    },
    {
      id: "10",
      studentId: "STU1010",
      name: "Jack Wilson",
      role: "student",
      photos: {
        photo1: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200",
        photo2: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200"
      },
      qrcode: { code: "QR1010" },
      isBlacklisted: false,
      scholarshipStatus: "none",
      healthStatus: "special",
      department: "Medicine",
      batch: "2022",
      assignedCafeteria: "South Wing Cafeteria",
      attendance: []
    }
  ];
  

 
  
  export const ticketHolders: TicketHolder[] = [
    {
      id: "1",
      name: "John Doe",
      photo: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      assignedCafteria: "Main Cafeteria",
      address: "123 Maple Street, Cityville",
      phoneNumber: "123-456-7890",
      role: "TicketHolder",
    },
    {
      id: "2",
      name: "Jane Smith",
      photo: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      assignedCafteria: "South Wing Cafeteria",
      address: "456 Oak Avenue, Townsville",
      phoneNumber: "987-654-3210",
      role: "TicketHolder",
    },
    {
      id: "3",
      name: "Samuel Green",
      photo: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      assignedCafteria: "North Campus Cafeteria",
      address: "789 Pine Road, Metropolis",
      phoneNumber: "555-123-4567",
      role: "TicketHolder",
    },
    {
      id: "4",
      name: "Emily Johnson",
      photo: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      assignedCafteria: "East Hall Cafeteria",
      address: "321 Birch Lane, Villagetown",
      phoneNumber: "555-987-6543",
      role: "TicketHolder",
    },
    {
      id: "5",
      name: "Michael Brown",
      photo: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      assignedCafteria: "Central Cafeteria",
      address: "654 Cedar Drive, Hamletburg",
      phoneNumber: "444-555-6666",
      role: "TicketHolder",
    },
    {
      id: "6",
      name: "Olivia Davis",
      photo: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      assignedCafteria: "West Wing Cafeteria",
      address: "987 Walnut Street, Cityland",
      phoneNumber: "333-222-1111",
      role: "TicketHolder",
    },
    {
      id: "7",
      name: "Liam Wilson",
      photo: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      assignedCafteria: "Main Cafeteria",
      address: "159 Spruce Boulevard, Townland",
      phoneNumber: "777-888-9999",
      role: "TicketHolder",
    },
    {
      id: "8",
      name: "Sophia Martinez",
      photo: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      assignedCafteria: "South Wing Cafeteria",
      address: "753 Redwood Terrace, Capitolville",
      phoneNumber: "222-333-4444",
      role: "TicketHolder",
    },
    {
      id: "9",
      name: "Benjamin Taylor",
      photo: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      assignedCafteria: "North Campus Cafeteria",
      address: "246 Elm Street, Urbantown",
      phoneNumber: "666-555-4444",
      role: "TicketHolder",
    },
    {
      id: "10",
      name: "Charlotte White",
      photo: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200",
      assignedCafteria: "Central Cafeteria",
      address: "135 Hickory Lane, Suburbia",
      phoneNumber: "999-888-7777",
      role: "TicketHolder",
    },
  ];
  


  
  export const feedbacks: Feedback[] = [
    {
      id: "1",
      title: "Broken Cafeteria Equipment",
      description: "The coffee machine in the main cafeteria is not working properly.",
      studentId: "12345",
      status: "pending",
      createdAt: new Date("2024-11-01T10:00:00Z"),
      updatedAt: new Date("2024-11-01T10:00:00Z"),
      attachments: ["https://example.com/attachments/image1.jpg"],
      priority: "medium",
      category: "Maintenance",
      isPublic: true,
      comments: [
        {
          userId: "admin1",
          text: "We’ve informed the maintenance team. It will be fixed soon.",
          createdAt: new Date("2024-11-02T08:00:00Z"),
        },
      ],
    },
    {
      id: "2",
      title: "Insufficient Seating",
      description: "The North Campus cafeteria doesn't have enough seating during lunch hours.",
      studentId: "23456",
      status: "inProgress",
      createdAt: new Date("2024-11-02T12:30:00Z"),
      updatedAt: new Date("2024-11-03T09:00:00Z"),
      attachments: [],
      priority: "high",
      category: "Facilities",
      isPublic: true,
      comments: [
        {
          userId: "admin2",
          text: "We’re evaluating the possibility of adding more tables.",
          createdAt: new Date("2024-11-03T10:15:00Z"),
        },
      ],
    },
    {
      id: "3",
      title: "Poor Wi-Fi Connection",
      description: "The Wi-Fi in the East Hall cafeteria is very slow.",
      studentId: "34567",
      status: "resolved",
      createdAt: new Date("2024-11-01T09:15:00Z"),
      updatedAt: new Date("2024-11-02T11:45:00Z"),
      attachments: ["https://example.com/attachments/wifi_issue.jpg"],
      priority: "medium",
      category: "Technical",
      isPublic: false,
      comments: [
        {
          userId: "admin3",
          text: "Wi-Fi settings have been optimized, and performance should improve.",
          createdAt: new Date("2024-11-02T11:00:00Z"),
        },
      ],
    },
    {
      id: "4",
      title: "Food Quality Issues",
      description: "The sandwiches served in the West Wing cafeteria are stale.",
      studentId: "45678",
      status: "pending",
      createdAt: new Date("2024-11-03T08:45:00Z"),
      updatedAt: new Date("2024-11-03T08:45:00Z"),
      attachments: ["https://example.com/attachments/food_quality.jpg"],
      priority: "high",
      category: "Food",
      isPublic: true,
      comments: [],
    },
    {
      id: "5",
      title: "Request for More Vegan Options",
      description: "Can we have more vegan options available in the main cafeteria?",
      studentId: "56789",
      status: "pending",
      createdAt: new Date("2024-11-03T14:30:00Z"),
      updatedAt: new Date("2024-11-03T14:30:00Z"),
      attachments: [],
      priority: "low",
      category: "Food",
      isPublic: true,
      comments: [],
    },
    {
      id: "6",
      title: "Unclean Tables",
      description: "Tables in the South Wing cafeteria are often left unclean after lunch.",
      studentId: "67890",
      status: "inProgress",
      createdAt: new Date("2024-11-02T13:15:00Z"),
      updatedAt: new Date("2024-11-03T10:45:00Z"),
      attachments: ["https://example.com/attachments/unclean_tables.jpg"],
      priority: "medium",
      category: "Hygiene",
      isPublic: true,
      comments: [
        {
          userId: "admin4",
          text: "Cleaning schedules are being adjusted to address this.",
          createdAt: new Date("2024-11-03T10:00:00Z"),
        },
      ],
    },
    {
      id: "7",
      title: "Cafeteria Timing Issues",
      description: "The East Hall cafeteria closes too early for evening students.",
      studentId: "78901",
      status: "pending",
      createdAt: new Date("2024-11-01T16:00:00Z"),
      updatedAt: new Date("2024-11-01T16:00:00Z"),
      attachments: [],
      priority: "low",
      category: "Scheduling",
      isPublic: true,
      comments: [],
    },
    {
      id: "8",
      title: "Overpriced Snacks",
      description: "Snacks in the Central Cafeteria are more expensive than other cafeterias.",
      studentId: "89012",
      status: "resolved",
      createdAt: new Date("2024-11-02T09:45:00Z"),
      updatedAt: new Date("2024-11-03T11:30:00Z"),
      attachments: [],
      priority: "medium",
      category: "Pricing",
      isPublic: true,
      comments: [
        {
          userId: "admin5",
          text: "Pricing has been reviewed and adjusted.",
          createdAt: new Date("2024-11-03T11:00:00Z"),
        },
      ],
    },
    {
      id: "9",
      title: "Unhelpful Staff",
      description: "Some staff in the North Campus cafeteria are not courteous.",
      studentId: "90123",
      status: "pending",
      createdAt: new Date("2024-11-01T11:30:00Z"),
      updatedAt: new Date("2024-11-01T11:30:00Z"),
      attachments: ["https://example.com/attachments/staff_complaint.jpg"],
      priority: "high",
      category: "Staff",
      isPublic: false,
      comments: [],
    },
    {
      id: "10",
      title: "Request for Microwave",
      description: "It would be great to have a microwave for reheating food in the West Wing cafeteria.",
      studentId: "01234",
      status: "pending",
      createdAt: new Date("2024-11-03T08:00:00Z"),
      updatedAt: new Date("2024-11-03T08:00:00Z"),
      attachments: [],
      priority: "low",
      category: "Facilities",
      isPublic: true,
      comments: [],
    },
  ];
  

  export const attendanceData: Attendance[] = [
    {
      studentId: "S12345",
      studentName: "John Doe",
      studentPicture: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cafeteria: "Main Campus Cafeteria",
      mealType: "Breakfast",
      timestamp: new Date("2024-12-03T08:15:00Z"),
      attended: true,
      mealCost: 3.5,
      checkInMethod: "Facial Recognition",
      remarks: "Checked in within the allowed time frame."
    },
    {
      studentId: "S12346",
      studentName: "Jane Smith",
      studentPicture: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cafeteria: "North Wing Cafeteria",
      mealType: "Lunch",
      timestamp: new Date("2024-12-03T12:30:00Z"),
      attended: true,
      mealCost: 5.0,
      checkInMethod: "QR Code",
      remarks: "System delay; manually approved."
    },
    {
      studentId: "S12347",
      studentName: "Emily Johnson",
      studentPicture: "https://images.pexels.com/photos/1181414/pexels-photo-1181414.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cafeteria: "South Wing Cafeteria",
      mealType: "Dinner",
      timestamp: new Date("2024-12-02T18:45:00Z"),
      attended: true,
      mealCost: 4.0,
      checkInMethod: "Facial Recognition",
      remarks: "Late entry due to extracurricular activities."
    },
    {
      studentId: "S12348",
      studentName: "Michael Brown",
      studentPicture: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cafeteria: "Main Campus Cafeteria",
      mealType: "Breakfast",
      timestamp: new Date("2024-12-03T07:50:00Z"),
      attended: false,
      remarks: "No-show for scheduled meal."
    },
    {
      studentId: "S12349",
      studentName: "Sophia Lee",
      studentPicture: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cafeteria: "East Wing Cafeteria",
      mealType: "Lunch",
      timestamp: new Date("2024-12-03T12:10:00Z"),
      attended: true,
      mealCost: 5.5,
      checkInMethod: "QR Code"
    },
    {
      studentId: "S12350",
      studentName: "William Davis",
      studentPicture: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cafeteria: "Main Campus Cafeteria",
      mealType: "Dinner",
      timestamp: new Date("2024-12-02T19:00:00Z"),
      attended: true,
      mealCost: 4.5,
      checkInMethod: "Facial Recognition",
      remarks: "System error; meal cost adjusted."
    },
    {
      studentId: "S12351",
      studentName: "Olivia Wilson",
      studentPicture: "https://images.pexels.com/photos/774090/pexels-photo-774090.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cafeteria: "South Wing Cafeteria",
      mealType: "Breakfast",
      timestamp: new Date("2024-12-03T08:20:00Z"),
      attended: true,
      mealCost: 3.0,
      checkInMethod: "Facial Recognition"
    },
    {
      studentId: "S12352",
      studentName: "James Martinez",
      studentPicture: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cafeteria: "North Wing Cafeteria",
      mealType: "Lunch",
      timestamp: new Date("2024-12-03T13:00:00Z"),
      attended: true,
      mealCost: 5.0,
      checkInMethod: "QR Code",
      remarks: "Student was late but within acceptable limits."
    },
    {
      studentId: "S12353",
      studentName: "Isabella Garcia",
      studentPicture: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cafeteria: "Main Campus Cafeteria",
      mealType: "Dinner",
      timestamp: new Date("2024-12-03T18:30:00Z"),
      attended: true,
      checkInMethod: "QR Code",
      remarks: "Meal plan used successfully."
    },
    {
      studentId: "S12354",
      studentName: "Lucas Rodriguez",
      studentPicture: "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cafeteria: "East Wing Cafeteria",
      mealType: "Breakfast",
      timestamp: new Date("2024-12-03T07:45:00Z"),
      attended: false,
      remarks: "Missed meal; student not present."
    }
  ];
  