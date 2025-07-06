"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'phosphor-react';
import React, { useState } from 'react';

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
  subscriptionRequired: boolean;
};

type Props = {
  doctor: doctorAgent;
};

function DoctorCard({ doctor }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { has } = useAuth();
  // @ts-ignore
  const paidUser = has && has({ plan: 'pro' });

  const onStartConsultation = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/session-chat", {
        notes: 'Next Query',
        doctorAgent: doctor,
      });

      console.log("📝 Session started:", data);
      router.push(`/dashboard/medical-agent/${data.sessionId}`);
    } catch (err) {
      console.error("❌ Failed to start session:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {doctor.subscriptionRequired && (
        <Badge className="absolute m-1 right-0">Premium</Badge>
      )}
      <Image
        src={doctor.image}
        alt={doctor.specialist}
        width={200}
        height={250}
        className="w-full h-[250px] object-cover rounded-2xl"
      />
      <h2 className="font-bold mt-1">{doctor.specialist}</h2>
      <p className="line-clamp-2 text-sm text-gray-500">{doctor.description}</p>
      <Button
        className="w-full mt-2"
        onClick={onStartConsultation}
        disabled={!paidUser && doctor.subscriptionRequired}
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
        ) : (
          <ArrowRight className="mr-2 h-4 w-4" />
        )}
        Start Consultation
      </Button>
    </div>
  );
}

export default DoctorCard;
