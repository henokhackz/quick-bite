import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminUsername = "student";
  const adminPassword = "securePassword123";

  // Check if the admin account already exists
  const existingAdmin = await prisma.user.findUnique({
    where: {
      username: adminUsername,
    },
  });

  if (!existingAdmin) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create the admin account
    await prisma.user.create({
      data: {
        email: "student@student",
        username: "student",
        hashedPassword,
        role: "student",
      },
    });

    console.log(`Admin account created with email: ${adminUsername}`);
  } else {
    console.log("Admin account already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
