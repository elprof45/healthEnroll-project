import { auth } from "@/auth";
import AdHealthEnrollDashBoard from "@/components/Dashboard/AdHealthEnrollDashBoard";
import HealthEnrollDashBoard from "@/components/Dashboard/HealthEnrollDashBoard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "HealthEnroll DashBoard",
  description: "This is HealthEnrol lDashBoard",
};

const DashBoard = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <DefaultLayout>
        {session.user.role ? (
          <AdHealthEnrollDashBoard />
        ) : (
          <HealthEnrollDashBoard />
        )}
      </DefaultLayout>
    </>
  );
};

export default DashBoard;
