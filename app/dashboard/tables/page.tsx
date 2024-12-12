import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PatientTablUser from "@/components/Tables/TablePatient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HealEnroll",
  description: "",
};

const TablesPage = () => {
  // data =
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <div className="flex flex-col gap-10">
        <PatientTablUser />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
