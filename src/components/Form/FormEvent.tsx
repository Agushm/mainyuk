"use client";

import { useAppDispatch } from "@/hooks/hooks";
import { getEvents, postEvent } from "@/redux/slices/eventSlice";
import { useState } from "react";
import { Event as EventYN } from "@/types/event";
import { useRouter } from "next/navigation";

const FormEvent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "Fun Match Futsal",
    desc: "Yuk sini futsal bareng kita kita, ikuti keseruannya dan jadilah kang gajul handal",
    speaker: "@solofunsport",
    image_url:
      "https://scontent-xsp2-1.cdninstagram.com/v/t51.2885-15/416434755_1546340782797611_8959410460795897837_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyIn0&_nc_ht=scontent-xsp2-1.cdninstagram.com&_nc_cat=111&_nc_ohc=qktukPrn510AX8-1tc3&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzI3MzUzODY3NzQ0NTQ5NjMwOA%3D%3D.2-ccb7-5&oh=00_AfAahS8OlhvnMV_viwsrLzmwSgSBMHHfRKJ59aOXWcRDoA&oe=65A1ECEF&_nc_sid=ee9879",
    divisi_id: "1",
    start_at: "",
    end_at: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    dispatch(postEvent(formData as EventYN))
      .unwrap()
      .then((res) => {
        if (res != null) {
          dispatch(getEvents());
          router.replace("/dashboard/events");
        }
      })
      .catch((error) => {
        // Handle errors here if needed
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Event <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={formData["title"]}
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder="Masukan nama event"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Pengisi <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={formData["speaker"]}
                    onChange={handleChange}
                    name="speaker"
                    type="text"
                    placeholder="Masukan pengisi acara"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Deskripsi <span className="text-meta-1">*</span>
                </label>
                <textarea
                  value={formData["desc"]}
                  onChange={handleChange}
                  name="desc"
                  rows={6}
                  placeholder="Masukan deskripsi event"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Url Poster <span className="text-meta-1">*</span>
                </label>
                <input
                  value={formData["image_url"]}
                  onChange={handleChange}
                  name="image_url"
                  type="text"
                  placeholder="Masukan gambar CDN poster yang dipost di Instagram"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Divisi
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={formData["divisi_id"]}
                    onChange={handleChange}
                    name="divisi_id"
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Pilih divisi</option>
                    <option value="1">Sports</option>
                    <option value="2">Kajian Pekanan</option>
                    <option value="3">KEY</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tanggal Mulai <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={formData["start_at"]}
                    onChange={handleChange}
                    name="start_at"
                    type="date"
                    placeholder="Masukan tanggal mulai event"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tanggal Selesai <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={formData["end_at"]}
                    onChange={handleChange}
                    name="end_at"
                    type="date"
                    placeholder="Masukan tanggal berakhir event"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormEvent;
