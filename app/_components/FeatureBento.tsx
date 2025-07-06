import React from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function FeatureBentoGrid() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

// Image wrapper helper
const ImageHeader = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative w-full h-32 rounded-xl overflow-hidden">
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover"
    />
  </div>
);


const items = [
  {
    title: "24/7 Virtual Medical Assistant",
    description: "Instantly assist patients with scheduling, symptoms, and health queries using conversational AI.",
    header: <ImageHeader src="/Images/Virtual.webp" alt="Virtual Medical Assistant" />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Smart Symptom Analysis",
    description: "Leverage AI to analyze symptoms and suggest possible conditions with real-time voice input.",
    header: <ImageHeader src="/Images/Symptom.avif" alt="Smart Symptom Analysis" />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Multilingual Patient Support",
    description: "Break language barriers with AI voice agents fluent in multiple languages and dialects.",
    header: <ImageHeader src="/Images/Multilingual.webp" alt="Multilingual Patient Support" />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Automated Medical Documentation",
    description: "Transcribe conversations and generate consultation notes effortlessly to streamline workflow.",
    header: <ImageHeader src="/Images/Automated.jpg" alt="Automated Documentation" />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Secure & Compliant AI",
    description: "Ensure HIPAA-compliant data handling and secure voice communications at every step.",
    header: <ImageHeader src="/Images/Secure.webp" alt="Secure & Compliant AI" />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Voice-Powered Triage",
    description: "Classify and prioritize patient concerns before connecting them to the right specialist.",
    header: <ImageHeader src="/Images/Voice-Powered.webp" alt="Voice-Powered Triage" />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Real-time Integration",
    description: "Seamlessly integrate with EHRs and hospital systems for smooth voice-first experiences.",
    header: <ImageHeader src="/Images/RealTime.png" alt="Real-time Integration" />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
