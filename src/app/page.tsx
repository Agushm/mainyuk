import Admin from "@/components/Dashboard/Admin";
import { Metadata } from "next";
import MyCounter from "@/components/MyCounter";

export const metadata: Metadata = {
  title: "YukNgaji | Solo",
  description: "Dashboard admin YukNgaji regional Solo",
  // other metadata
};

export default function Home() {
  return (
    <>
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-30 mb-10 text-7xl text-primary font-bold">YukNgaji</h1>
      <form className="my-5">
        <input className="p-2 mr-3" type="text" placeholder="Masukan Kode" />
        <button className="btn bg-primary text-white p-2 rounded-md ">Masuk</button>
      </form>
      </div>
    </>
  );
}
