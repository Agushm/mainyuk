"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getOrders } from "@/redux/slices/orderSlice";
import { formatStrToDateTime } from "@/utils/convert";
import Link from "next/link";
import { useEffect } from "react";
import Loader from "../common/Loader/Loader";

export default function GridOrders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.order.orders);
  const isLoading = useAppSelector((state) => state.order.loading);
  const error = useAppSelector((state) => state.order.error);

  useEffect(() => {
    if (orders == null) {
      dispatch(getOrders());
    }
  }, []);

  if (orders == null || isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="max-w-layout xs:w-full h-full w-screen p-4 bg-yellow-400">
      <div>
        {orders.length == 0 ? (
          <div className="text-black text-md">
            Kamu belum pernah melakukan pembelian
          </div>
        ) : (
          orders?.map((e) => {
            const total =
              (e.amount ?? 0) + (e.donation ?? 0) + (e.admin_fee ?? 0);
            return (
              <div key={e.id} className="mb-4 grid gap-4">
                <Link
                  href={`/orders/${e.public_id}`}
                  className="rounded-xl border border-black bg-yellow-300 p-4 shadow-custom hover:shadow-none transition-all hover:translate-x-1 hover:translate-y-1"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="text-black">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.55281 1.60553C7.10941 1.32725 7.77344 1 9 1C10.2265 1 10.8906 1.32722 11.4472 1.6055L11.4631 1.61347C11.8987 1.83131 12.2359 1.99991 13 1.99993C14.2371 1.99998 14.9698 1.53871 15.2141 1.35512C15.5944 1.06932 16.0437 1.09342 16.3539 1.2369C16.6681 1.38223 17 1.72899 17 2.24148L17 13H20C21.6562 13 23 14.3415 23 15.999V19C23 19.925 22.7659 20.6852 22.3633 21.2891C21.9649 21.8867 21.4408 22.2726 20.9472 22.5194C20.4575 22.7643 19.9799 22.8817 19.6331 22.9395C19.4249 22.9742 19.2116 23.0004 19 23H5C4.07502 23 3.3148 22.7659 2.71092 22.3633C2.11331 21.9649 1.72739 21.4408 1.48057 20.9472C1.23572 20.4575 1.11827 19.9799 1.06048 19.6332C1.03119 19.4574 1.01616 19.3088 1.0084 19.2002C1.00194 19.1097 1.00003 19.0561 1 19V2.24146C1 1.72899 1.33184 1.38223 1.64606 1.2369C1.95628 1.09341 2.40561 1.06931 2.78589 1.35509C3.03019 1.53868 3.76289 1.99993 5 1.99993C5.76415 1.99993 6.10128 1.83134 6.53688 1.6135L6.55281 1.60553ZM3.00332 19L3 3.68371C3.54018 3.86577 4.20732 3.99993 5 3.99993C6.22656 3.99993 6.89059 3.67269 7.44719 3.39441L7.46312 3.38644C7.89872 3.1686 8.23585 3 9 3C9.76417 3 10.1013 3.16859 10.5369 3.38643L10.5528 3.39439C11.1094 3.67266 11.7734 3.9999 13 3.99993C13.7927 3.99996 14.4598 3.86581 15 3.68373V19C15 19.783 15.1678 20.448 15.4635 21H5C4.42498 21 4.0602 20.8591 3.82033 20.6992C3.57419 20.5351 3.39761 20.3092 3.26943 20.0528C3.13928 19.7925 3.06923 19.5201 3.03327 19.3044C3.01637 19.2029 3.00612 19.1024 3.00332 19ZM19.3044 20.9667C19.5201 20.9308 19.7925 20.8607 20.0528 20.7306C20.3092 20.6024 20.5351 20.4258 20.6992 20.1797C20.8591 19.9398 21 19.575 21 19V15.999C21 15.4474 20.5529 15 20 15H17L17 19C17 19.575 17.1409 19.9398 17.3008 20.1797C17.4649 20.4258 17.6908 20.6024 17.9472 20.7306C18.2075 20.8607 18.4799 20.9308 18.6957 20.9667C18.8012 20.9843 18.8869 20.9927 18.9423 20.9967C19.0629 21.0053 19.1857 20.9865 19.3044 20.9667Z"
                            fill="currentColor"
                          />
                          <path
                            d="M5 8C5 7.44772 5.44772 7 6 7H12C12.5523 7 13 7.44772 13 8C13 8.55229 12.5523 9 12 9H6C5.44772 9 5 8.55229 5 8Z"
                            fill="currentColor"
                          />
                          <path
                            d="M5 12C5 11.4477 5.44772 11 6 11H12C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13H6C5.44772 13 5 12.5523 5 12Z"
                            fill="currentColor"
                          />
                          <path
                            d="M5 16C5 15.4477 5.44772 15 6 15H12C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17H6C5.44772 17 5 16.5523 5 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>
                        <h1 className="font-semibold text-xs text-black">
                          #YNS{e.public_id}
                        </h1>
                        <p className="text-xs text-black">
                          {formatStrToDateTime(
                            e.created_at ?? "",
                            "dd MMMM yyyy HH:mm"
                          )}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <button
                          className={`h-full whitespace-nowrap rounded-full font-medium px-2 py-0.5 text-xs tag-error border-black text-white border ${
                            e.status == "paid"
                              ? "bg-success"
                              : e.status == "pending"
                              ? "bg-yellow-500"
                              : "bg-danger"
                          }`}
                        >
                          {e.status?.toUpperCase()}
                        </button>
                      </div>
                    </div>
                    <div className="my-2 border-b border-black"></div>
                    <div className="flex w-full space-x-4">
                      <div>
                        <img
                          className="lazy max-w-full rounded-lg entered loaded object-cover w-16.5 h-20"
                          src={e.event?.image_url ?? ""}
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <h1 className="font-semibold text-sm text-black">
                          {e.event?.title ?? ""}
                        </h1>
                        <div className="text-sm font-normal text-black">
                          {formatStrToDateTime(
                            e.event?.start_at ?? "",
                            "dd MMM yyyy HH:mm"
                          )}
                        </div>
                        <div className="mt-2 flex items-end justify-end gap-4">
                          <div>
                            <p className="text-xs text-black text-center">
                              Total
                            </p>
                            <h1 className="font-semibold text-xs text-black">
                              {e.amount == 0
                                ? "Gratis"
                                : `Rp ${total.toLocaleString("id-ID")}`}
                            </h1>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}

        {/* <div className="grid justify-center p-4">
            <div className="flex items-center justify-center gap-x-2 text-black">
              <span>Semua data ditampilkan</span>
            </div>
        </div> */}
      </div>
    </div>
  );
}
