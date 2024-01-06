"use client";
import { format } from "date-fns";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { getEventDetail } from "@/redux/slices/eventSlice";
import QnaList from "../QnaList";

export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const dispatch = useAppDispatch();
  const event = useAppSelector((state) => state.event.event);
  const isLoading = useAppSelector((state) => state.event.loading);
  const error = useAppSelector((state) => state.event.error);

  useEffect(() => {
    if (!isLoading) {
      dispatch(getEventDetail(params.slug));
    }
    
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error != null) {
    return <h1>{error}</h1>;
  }
  if (event == null) {
    return <div></div>;
  }
  return (
    <>
      <div className="min-w-screen min-h-screen flex flex-col md:flex-row items-center md:items-start">
        <div className="w-auto md:w-1/4 h-1/2 m-2 mb-5 md:m-5 p-10 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <Image
            className="w-full mb-5"
            width={400}
            height={400}
            alt={`Image ${event.title}`}
            src={event.image_url??''}
          />
          <h1 className="flex w-full justify-center text-lg md:text-xl lg:text-2xl font-bold text-black dark:text-white text-center">
            {event.title}
          </h1>
          <p className="my-2 flex w-full justify-center text-md md:text-lg font-light text-center text-black dark:text-white">
            {event.speaker}
          </p>
          <h1 className="text-center text-sm md:text-md font-bold  text-black dark:text-white">
            {format(Date.parse(event!.start_at!), "dd MMM yyyy")} -{" "}
            {format(Date.parse(event!.end_at!), "dd MMM yyyy")}
          </h1>
        </div>
        <div className="w-auto md:w-2/4 md: mx-2 flex flex-col mb-5 md:my-5 md:mr-5 p-5 md:p-10 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <h1 className="mb-5 text-2xl font-bold text-black dark:text-white">
            Tanya Ustadz
          </h1>
          <div className="w-full flex justify-center">
            <textarea
              className="w-full max-h-14 focus:max-h-40 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary resize-none"
              rows={4}
              cols={50}
              maxLength={300}
              placeholder="Tulis Pertanyaan ..."
            />
            <button className="max-h-12 ml-4 w-20 btn bg-primary text-white p-2 rounded-md ">
              Kirim
            </button>
          </div>
          <div className="mt-5">
            <QnaList></QnaList>
          </div>
        </div>
      </div>
    </>
  );
}
