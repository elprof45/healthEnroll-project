import { auth } from "@/auth";
import QRCodePage from "@/components/QrCode";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    patientID: string;
  };
};

const PatientInfo = async ({ params }: Props) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const patient = await prisma.patient.findFirst({
    where: {
      patientId: params.patientID,
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
      patientId: true,
    },
  });

  if (!patient) {
    redirect("/dashboard/not-found");
  }
  return (
    <div className="max-w-7xl mx-auto mt-5 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border rounded p-8">
          {/* <!-- Section d'information du patient --> */}
          <div className="col-span-1 md:col-span-3">
            <div className="flex items-center mb-4">
              <div className="avatar placeholder ">
                <div className="w-14 bg-blue-600 text-neutral-content rounded-full">
                  <span className="text-4xl font-semibold text-white">
                    {patient.lastName[0]}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">
                  {patient.lastName} {patient.firstName}
                </h2>
                <p className="text-gray-600">ID: {patient.ID}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Date de Naissance</h3>
                <p>
                  {" "}
                  {`le ${patient.dateOfBirth.toLocaleString("fr", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}`}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Sexe</h3>
                <p>{patient.patientGender}</p>
              </div>
              <div>
                <h3 className="font-medium">Pays</h3>
                <p>{patient.country}</p>
              </div>
              <div>
                <h3 className="font-medium">Adresse</h3>
                <p>{patient.address}</p>
              </div>
              <div>
                <h3 className="font-medium">Téléphone</h3>
                <p>{patient.phoneNumber}</p>
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p>{patient.emailAddress}</p>
              </div>
              <div>
                <h3 className="font-medium">Profession</h3>
                <p>{patient.profession}</p>
              </div>
              <div>
                <h3 className="font-medium">Groupe Sanguin</h3>
                <p>{patient.bloodGroup}</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <h3 className="font-medium">Médications</h3>
                <p>{patient.currentMedications}</p>
              </div>
              <div>
                <h3 className="font-medium">Hopitale / Clinice / Centre</h3>
                <p>{"hospital St Josheph de Yaoudé"}</p>
              </div>
              <div>
                <h3 className="font-medium">Date</h3>
                <p>
                  {`le ${patient.createdAt.toLocaleString("fr", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}`}
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Section QR Code --> */}
          <div className="col-span-1 flex flex-col justify-between">
            <div className="bg-gray-100 flex justify-center items-center  ">
              <QRCodePage
                patientID={{
                  patientID: patient.patientId,
                }}
              />
            </div>

            <p className="text-xl font-medium mb-6 mt-4 text-right">
              by HealthEnroll
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
