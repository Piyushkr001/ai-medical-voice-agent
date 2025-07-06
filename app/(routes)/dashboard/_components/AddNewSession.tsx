"use client";

import React, { ReactElement, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import SuggestedDoctor from "./SuggestedDoctor";
import { doctorAgent } from "./DoctorCard";
import { useRouter } from "next/navigation";


interface AddNewSessionProps {
  children: ReactElement;
}

export default function AddNewSession({ children }: AddNewSessionProps) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[] | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent | null>(null);
  const router = useRouter();
  

  const handleNext = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/suggest-doctors", { notes: note });

      if (data?.error) {
        alert(data.error.message || "Failed to get suggestions.");
        return;
      }

      if (Array.isArray(data)) {
        setSuggestedDoctors(data);
      } else {
        console.error("❌ Unexpected data format. Expected array, got:", data);
        setSuggestedDoctors([]);
      }
    } catch (err: any) {
      console.error("❌ Failed to fetch doctors:", err);
      alert(err.response?.data?.error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onStartConsultation = async () => {
    if (!selectedDoctor) return;

    try {
      setLoading(true);
      const { data } = await axios.post("/api/session-chat", {
        notes: note,
        selectedDoctor,
      });

      console.log("📝 Session started:", data);

      // Optionally close dialog
      document.getElementById("close-add-session")?.click();

      // ✅ Redirect to the new session
      router.push(`/dashboard/medical-agent/${data.sessionId}`);
    } catch (err) {
      console.error("❌ Failed to start session:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {suggestedDoctors ? "Suggested Doctors" : "Add Basic Details"}
          </DialogTitle>
          <DialogDescription>
            {suggestedDoctors
              ? "Based on your symptoms, we recommend these specialists"
              : "Add symptoms or any other details below"}
          </DialogDescription>
        </DialogHeader>

        {!suggestedDoctors ? (
          <div className="space-y-3 mt-4">
            <Textarea
              placeholder="Add your symptoms or any other details"
              className="h-[200px]"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <h2 className="text-sm font-medium">Select a doctor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestedDoctors.map((doctor, index) => (
                <SuggestedDoctor
                  key={index}
                  doctorAgent={doctor}
                  isSelected={selectedDoctor?.id === doctor.id}
                  onSelect={() => setSelectedDoctor(doctor)}
                />
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button id="close-add-session" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>

          {!suggestedDoctors ? (
            <Button
              onClick={handleNext}
              disabled={!note.trim() || loading}
              className="flex items-center gap-1"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Next <ArrowRight className="h-4 w-4" /></>}
            </Button>
          ) : (
            <Button
              onClick={onStartConsultation}
              disabled={!selectedDoctor || loading}
              className="flex items-center gap-1"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Start Consultation"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
