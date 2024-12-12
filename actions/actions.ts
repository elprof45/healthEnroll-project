"use server";
import { auth, signIn } from "@/auth";
import { createPatientSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";

export async function getUserByEmail(email: string) {
  return prisma.professional.findUnique({
    where: {
      email,
    },
  });
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.professional.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch {
    return null;
  }
}

export async function gePatientById(patientID: string, professionalId: string) {
  try {
    const patient = await prisma.patient.findFirst({
      where: {
        patientId: patientID,
        professionalId: professionalId,
      },
    });
    if (!patient) {
      throw new Error("patient not found ");
    }
    return patient;
  } catch (error) {
    throw new Error("error ");
  }
}

export async function getPatientByProfessionnal() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  const datas = await prisma.patient.findMany({
    where: {
      professionalId: session.user.id as string,
    },
    select: {
      address: true,
      bloodGroup: true,
      country: true,
      createdAt: true,
      currentMedications: true,
      dateOfBirth: true,
      emailAddress: true,
      firstName: true,
      ID: true,
      lastName: true,
      patientGender: true,
      phoneNumber: true,
      profession: true,
    },
  });
  return datas;
}
export async function createPatient(formData: FormData) {
  const session = await auth();
  if (!session) {
    return null;
  }
  const form = Object.fromEntries(formData.entries());
  const parse = createPatientSchema.safeParse(form);

  if (!parse.success) {
    return { message: "Oof Tout les champs doivent étre remplis !!" };
  }
  const time = Date.now().toString();
  const randomN = Math.floor(Math.random() * 1000).toString();
  const result = `${time}${randomN}`.slice(-8);
  try {
    await prisma.patient.create({
      data: {
        firstName: parse.data.fistName,
        lastName: parse.data.lastName,
        dateOfBirth: parse.data.dateOfBirth,
        patientGender: parse.data.patientGender,
        country: parse.data.country,
        address: parse.data.address,
        phoneNumber: parse.data.phoneNumber,
        emailAddress: parse.data.emailAddress,
        currentMedications: parse.data.currentMedications,
        profession: parse.data.profession,
        bloodGroup: parse.data.bloodGroup,
        ID: result,
        professionalId: session.user.id as string,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.cause === "P2002") {
        return {
          isError: true,
          message: "Un patient avec cette information exist deja. ",
        };
      }
    }
    return {
      isError: true,
      message: "Une erreur s'est produite lors de la creation du patient. ",
    };
  }
  revalidatePath("/dashboard/tables");
  return {
    isError: false,
    message: "la patient est enregister avec success !",
  };
}
export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const about = formData.get("bio") as string;
  const specialty = formData.get("domaine") as string;
  const password = await hash(formData.get("password") as string, 12);
  try {
    await prisma.professional.create({
      data: {
        name: name,
        email: email,
        password: password,
        specialty: specialty,
        about: about,
      },
    });


  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          isError: true,
          message: "Un compte avec cette email exist deja. ",
        };
      }
      console.log(error)
    }
  }

  console.info('tout est ok')
  redirect("/signin");

}

export async function updateUser(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  const name = formData.get("fullName") as string;
  const about = formData.get("bio") as string;
  const specialty = formData.get("specialty") as string;

  await prisma.professional.update({
    where: {
      id: session?.user.id,
    },
    data: {
      name: name,
      specialty: specialty,
      about: about,
    },
  });
  revalidatePath("/dashboard/settings");
}

// ...

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type) {
        return {
          isError: true,
          message: "Invalid credentials.",
        };
      } else {
        return {
          isError: true,
          message: "Something went wrong.",
        };
      }
    }
    throw error;
  }
}