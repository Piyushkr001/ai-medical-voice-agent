// Absolute import path "@/types/session" assumes "@/…"
// is set in your tsconfig.json "paths". Otherwise use a relative path.

import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface AgentReport {
  symptoms?: string[];
  diagnosis?: string;
  prescription?: string[];
  notes?: string;
}

export interface SessionDetail {
  id: number;
  createdOn: string;                 // ISO string
  sessionId: string;
  notes: string;
  selectedDoctor: {
    image: string | StaticImport;
    specialist?: string;
  };
  report: AgentReport | null;        // null until generated
}
