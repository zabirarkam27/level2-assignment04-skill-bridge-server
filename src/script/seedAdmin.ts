import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  try {
    console.log("Seeding admin...");

    const adminData = {
      name: "Admin",
      email: "admin@skillbridge.com",
      password: "admin1234",
      role: UserRole.ADMIN,
    };

    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingUser) {
      throw new Error ("Admin already exists:");
    }

    const response = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Response: ", data);
      await prisma.user.update({
        where:{
          email:adminData.email,
        },
        data:{
          emailVerified: true,
        },
      });
      console.log("Admin seeded successfully");
    }

    console.log("Admin emailVerified set to true");
  } catch (error) {
    console.log("Error seeding admin", error);
  }
}

seedAdmin();
