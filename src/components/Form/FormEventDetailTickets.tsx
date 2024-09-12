"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setCheckout } from "@/redux/slices/orderSlice";
import { UserTicket } from "@/types/user_ticket";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const FormEventDetailTickets: React.FC<{ slug: string }> = ({
  slug,
}) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.user);
  const checkout = useAppSelector((state) => state.order.checkout);
  const error = useAppSelector((state) => state.event.error);
  const tickets = [
    { id: "ticket1", name: "Geratis", price: 0 },
    { id: "ticket2", name: "Reguler", price: 5000 },
    { id: "ticket3", name: "VIP", price: 10000 },
  ];

  const [formData, setFormData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    let form: { [key: string]: number } = {};
    for (let index in tickets) {
      const ticket = tickets[index];
      form[`${ticket.id}_qty`] = 0;
      form[`${ticket.id}_price`] = ticket.price;
    }
    setFormData(form);
  }, [setFormData]);

  const totalPayment = ()=>{
    let total = 0;
    for (let index in tickets){
      const ticket = tickets[index];
      const qty = formData[`${ticket.id}_qty`];
      const price = formData[`${ticket.id}_price`];
      total = total + (qty *price);
    }
    return total;
  }
  const increaseQty = (name: string) => {
    const current = formData[name];
    setFormData({ ...formData, [name]: current + 1 });
  };

  const decreaseQty = (name: string) => {
    const current = formData[name];
    setFormData({ ...formData, [name]: current - 1 });
  };
  const checkAllValuesAreZero = () => {
    return Object.values(formData).every((value) => value === 0);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (checkAllValuesAreZero()) {
      toast.info("Kamu belum memilih tiket 😭");
      return;
    }
    let orderTickets: UserTicket[] = [];
    for (let index in tickets) {
      const ticket = tickets[index];
      const qty = formData[`${ticket.id}_qty`];
      if (qty > 0) {
        for (let i = 0; i < qty; i++) {
          orderTickets.push({
            ticket_id: ticket.id,
            ticket_name: ticket.name,
            ticket_price: ticket.price,
            user_id: auth?.id,
          });
        }
      }
    }
    dispatch(setCheckout(orderTickets));
    route.push(`/events/${slug}/checkout`);
  };

  return (
    <>
      <section id="tickets" className="mb-4">
        <div className="px-10">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid space-y-2">
              <div className="gap-y-1 font-normal"></div>
              <div>
                <div className="mb-4">
                  <p className="font-semibold text-black text-xl ">
                    Pilihan Tiket
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {tickets.map((e) => (
                    <div
                      key={e.id}
                      className="flex flex-col overflow-hidden rounded-xl border border-black bg-yellow-200"
                    >
                      <div className="px-4 py-3">
                        <h1 className="font-sans font-semibold text-base text-black">
                          {e.name}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between gap-4 rounded-b-xl border-t-2 border-dashed border-black  px-4 py-3">
                        <h1 className="font-sans font-semibold text-sm text-black">
                          {e.price == 0
                            ? "Gratis"
                            : `Rp${e.price.toLocaleString("id-ID")}`}
                        </h1>
                        {formData[`${e.id}_qty`] == 0 ? (
                          <button
                            type="button"
                            className="text-white bg-primary focus:outline-none transition ease-in-out duration-300 px-4 py-1.5 text-sm hover:opacity-80 active:opacity-70 rounded-full font-bold border border-black shadow-custom2"
                            onClick={() => {
                              increaseQty(`${e.id}_qty`);
                            }}
                          >
                            <div className="flex items-center justify-center gap-x-2">
                              <span>Pesan</span>
                            </div>
                          </button>
                        ) : (
                          <div className="flex items-center gap-x-1">
                            <button
                              type="button"
                              onClick={() => {
                                decreaseQty(`${e.id}_qty`);
                              }}
                              className="rounded-lg text-black border-2 border-black bg-yellow-300 p-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="size-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                            <input
                              readOnly={true}
                              className="w-12 rounded-md border border-black p-1 text-center text-black bg-yellow-200"
                              name={e.name}
                              type="text"
                              value={formData[`${e.id}_qty`]}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                increaseQty(`${e.id}_qty`);
                              }}
                              className="rounded-lg text-black border-2 border-black bg-yellow-300 p-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="size-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid space-y-2">
              <div className="gap-y-1 font-normal"></div>
              <div className="mt-8 flex items-center justify-between gap-x-4 text-black">
                <p className="font-medium text-lg">Total harga</p>
                <p className="font-bold text-xl">Rp. {totalPayment().toLocaleString("id-ID")}</p>
              </div>
            </div>
            <div className="grid space-y-2">
              <div className="gap-y-1 font-normal"></div>
              <button
                type="submit"
                className="grid w-full place-items-center rounded-lg border-2 border-black p-3 text-lg font-bold bg-primary text-white shadow-custom"
              >
                Beli Tiket
              </button>
              <div className="mt-5"></div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};