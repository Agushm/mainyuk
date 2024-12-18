"use client";

import { useAppDispatch } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import { getDivisi } from "@/redux/slices/divisiSlice";
import { Divisi } from "@/types/divisi";

interface DropdownProps {
  className?: string;
  onChange: (value: string) => void;
}

const DropdownDivisi: React.FC<DropdownProps> = ({ onChange, className }) => {
  const dispatch = useAppDispatch();
  const [divisi, setDivisi] = useState<Divisi[] | null>(null);
  const [selectedDivisi, setSelectedDivisi] = useState<string>("Semua Divisi");

  useEffect(() => {
    if (divisi == null) {
      dispatch(getDivisi()).then((res) => {
        setDivisi(res.payload as Divisi[]);
      });
    }
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivisi(event.target.value);
    const newValue = event.target.value;
    onChange(newValue); // Call the parent function when an option is selected
  };

  return (
    <select
      value={selectedDivisi}
      onChange={handleSelectChange}
      name="event_id"
      className={
        className == null
          ? "select select-bordered bg-white border-2 border-black text-black font-bold dark:bg-boxdark focus:border-primary"
          : className
      }
    >
      <option value={"all"}>Semua Divisi</option>
      {divisi?.map((data, key) => (
        <option key={key} value={data.id}>
          {data.name}
        </option>
      ))}
    </select>
  );
};

export default DropdownDivisi;
