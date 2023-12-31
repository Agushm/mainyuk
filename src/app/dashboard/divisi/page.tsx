import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableDivisi from "@/components/Tables/TableDivisi";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Event | YukNgaji Solo",
  description: "Halaman event YukNgaji Solo",
  // other metadata
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Divisi" />
      <div className="flex flex-col gap-10">
        <TableDivisi />
      </div>
    </>
  );
};

export default TablesPage;
