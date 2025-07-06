import React from "react";
import { doctorAgent } from "./DoctorCard";
import Image from "next/image";

type Props = {
  doctorAgent: doctorAgent;
  onSelect: () => void;
  isSelected: boolean;
};

export default function SuggestedDoctor({
  doctorAgent,
  onSelect,
  isSelected,
}: Props) {
  return (
    <div
      onClick={onSelect}
      className={`flex flex-col items-center border rounded-2xl p-5 cursor-pointer transition-all ${
        isSelected ? "border-blue-500 bg-blue-50" : "hover:border-blue-400"
      }`}
    >
      <Image
        src={doctorAgent?.image}
        width={70}
        height={70}
        alt={doctorAgent?.specialist}
        className="w-[50px] h-[50px] rounded-full object-cover mb-2"
      />
      <h2 className="font-bold text-sm text-center">{doctorAgent?.specialist}</h2>
      <p className="text-xs line-clamp-2 text-center text-muted-foreground">
        {doctorAgent?.description}
      </p>
    </div>
  );
}
