import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
const PatientTablUser = async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  async function PatientDatas() {
    if (session?.user.role) {
      const datas = await prisma.patient.findMany({
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
      return datas;
    } else {
      const datas = await prisma.patient.findMany({
        where: {
          professionalId: session?.user.id as string,
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
      return datas;
    }
  }

  const datas = await PatientDatas();
  return (
    <div className="rounded-sm border border-stroke bg-white px-1 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="items-start justify-between md:flex mb-6">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Liste des patients
          </h3>
        </div>
        <div className="mt-3 md:mt-0">
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full px-4 py-1 font-medium duration-150 border rounded-lg focus:outline-blue-600 xl:w-70"
            />
            <button className="ml-2 py-1 xl:w-4 mr-6">
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
            </button>
            <Link
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              href={"/dashboard/enroll"}
            >
              Enroler un patient
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[10px] px-2 py-2 font-medium text-black dark:text-white xl:pl-1">
                id
              </th>
              <th className="min-w-[200px] px-2 py-2 font-medium text-black dark:text-white xl:pl-11">
                Informations
              </th>
              <th className="min-w-[120px] px-2 py-2 font-medium text-black dark:text-white">
                Sexe
              </th>
              <th className="min-w-[120px] px-2 py-2 font-medium text-black dark:text-white">
                Date de Naissance
              </th>
              <th className="min-w-[150px] px-2 py-2 font-medium text-black dark:text-white">
                {"Date D'enrôlement"}
              </th>

              <th className="px-2 py-2 font-medium text-black dark:text-white"></th>
            </tr>
          </thead>
          <tbody>
            {datas.map((patient, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-2 py-1 dark:border-strokedark">
                  {key + 1}
                </td>
                <td className="border-b border-[#eee] px-2 py-2 dark:border-strokedark">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* <div className="h-12.5 w-15 rounded-md">
                      <Image
                        src={"/images/product/product-01.png"}
                        width={50}
                        height={50}
                        alt="Product"
                      />
                    </div> */}
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {patient.lastName} {patient.firstName}
                      </span>
                      <span className="block text-gray-700 text-xs">
                        {patient.emailAddress}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {patient.patientGender}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
                  <p
                    className={
                      "inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium"
                    }
                  >
                    {" "}
                    {`le ${patient.dateOfBirth.toLocaleString("fr", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}`}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
                  <p className="bg-opacity-10 px-3 py-1 text-sm font-medium">
                    {`le ${patient.createdAt.toLocaleString("fr", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}`}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
                  <Link
                    className="flex items-center space-x-3.5"
                    href={
                      session.user.role
                        ? `/dashboard/view/patient/${patient.patientId}`
                        : `/dashboard/patient/${patient.patientId}`
                    }
                  >
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center my-4">
        <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 gap-4">
          <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
            Précedante
          </button>
          <button className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
            1
          </button>
          <button className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
            2
          </button>
          <button className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
            Suivante
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientTablUser;
