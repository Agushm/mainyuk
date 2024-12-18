import dynamic from "next/dynamic";
const OrderTicketsPage = dynamic(() => import("@/components/Pages/OrderTicketsPage"));
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Transaksi - YukNgaji Solo",
  description: "Detail transaksi tiket event YukNgaji Solo",
};

interface PageProps {
  params: Promise<{ public_id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <OrderTicketsPage params={resolvedParams} />
  );
}
