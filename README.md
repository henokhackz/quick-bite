# ☕🏠 Smart Café & Dorm Management System

An all-in-one platform built to streamline the management of university dormitories and cafeterias. Designed for Arba Minch University, this system empowers administrators, staff, and students by automating daily operations including meal tracking, dorm assignments, QR-based attendance, real-time communication, and more.

## 🚀 Features

### ✅ Student Features
- Update personal profile and upload ID photos
- View dorm and cafeteria assignments
- Scan QR code for café check-in
- Receive announcements and notifications

### ✅ Admin & Staff Features
- **Dorm Management**: Assign students, manage dorm availability and equipment
- **Café Management**: Track meals, view attendance reports
- **Excel Import**: Seed student data via Excel file upload with automatic ID generation
- **Real-time Chat**: Group and personal messaging for admin/staff
- **Announcement System**: Send updates to all users
- **Real-time Notifications**: Delivered instantly for announcements, alerts, and system events

## 💻 Tech Stack

| Tech       | Description                              |
|------------|------------------------------------------|
| **Frontend** | Next.js, TypeScript, Tailwind CSS         |
| **Backend**  | Next.js API Routes (Edge Functions)      |
| **Database** | Prisma ORM with PostgreSQL               |
| **Auth**     | NextAuth.js               |
| **Real-time**| WebSocket / Prisma-based real-time chat  |
| **Others**   | Excel.js for file parsing, QR code packages |

## 📸 Screenshots
![Dashboard Screenshot](https://github.com/henokhackz/quick-bite/blob/ac263ad8c04b2364d65a62f52fd85fafb8eb796e/Screenshot%20from%202025-06-30%2011-09-08.png?raw=true)
![QR Code Attendance](https://github.com/henokhackz/quick-bite/blob/ac263ad8c04b2364d65a62f52fd85fafb8eb796e/Screenshot%20from%202025-06-30%2011-09-51.png?raw=true)


role:admin
username:admin2
password:password123

## 🧪 Running Locally

```bash
# Clone the repo
git clone https://github.com/henokhackz/quick-bite.git

# Navigate to the project folder
cd quick-bite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your DB URL and other environment configs

# Run Prisma migrations
npx prisma migrate dev

# Start the development server
npm run dev


DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

