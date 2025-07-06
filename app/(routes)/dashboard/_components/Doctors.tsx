import { AIDoctorAgents } from '@/shared/list';
import React from 'react';
import DoctorCard from './DoctorCard';

export default function Doctors() {
  return (
    <section className="mt-10 space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
        AI Specialist Doctor Agents
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
        {AIDoctorAgents.map((doctor, index) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
}
