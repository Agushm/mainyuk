import { Metadata } from "next";
import LiveEventPage from "@/components/Pages/LiveEventPage";

export const metadata: Metadata = {
  title: "Live Event",
  description: "Live event YukNgaji regional Solo",
};

export default function LiveEvent({ params }: { params: { slug: string } }) {
  return <LiveEventPage params={params} />;
}
