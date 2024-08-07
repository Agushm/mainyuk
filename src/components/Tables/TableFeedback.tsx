"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getFeedback } from "@/redux/slices/feedbackSlice";
import { formatStrToDateTime } from "@/utils/convert";
import { useEffect } from "react";

const TableFeedback = () => {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector((state) => state.feedback.data);
  const isLoading = useAppSelector((state) => state.feedback.loading);
  const error = useAppSelector((state) => state.feedback.error);

  useEffect(() => {
    if(feedback == null && !isLoading){
      dispatch(getFeedback());
    }
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error != null) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="rounded-sm border-2 border-black bg-white px-5 pt-6 pb-2.5 shadow-bottom dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto mb-3">
          <thead className="border border-black">
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Nama
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Pesan
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Event
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Dibuat
              </th>
            </tr>
          </thead>
          <tbody>
            {feedback?.map((data, key) => (
              <tr key={key}>
                <td className="border-b border-black py-5 px-4 pl-9 xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {data.user.name}
                  </h5>
                </td>
                <td className="border-b border-black py-5 px-4">
                  <p className="text-black dark:text-white">{data.message}</p>
                </td>
                <td className="border-b border-black py-5 px-4 pl-9 xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {data.event.title}
                  </h5>
                  <p>{data.event.speaker}</p>
                </td>
                <td className="border-b border-black py-5 px-4">
                  <p className="text-black dark:text-white">
                  {formatStrToDateTime(data.created_at!, "dd MMM yyyy HH:mm")}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableFeedback;
