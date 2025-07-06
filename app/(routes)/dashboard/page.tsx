"use client";

import React, { useEffect, useState } from "react";
import History from "./_components/History";
import { Button } from "@/components/ui/button";
import { FirstAid } from "phosphor-react";
import Doctors from "./_components/Doctors";
import { useAuth, useUser } from "@clerk/nextjs";
import AddNewSession from "./_components/AddNewSession";
import axios from "axios";
import { SessionDetail } from "@/types/session";

export default function Dashboard() {
  const { user } = useUser();
   const { has } = useAuth()
   const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
    //@ts-ignore
    const paidUser = has && has({ plan: 'pro' })

    useEffect (() =>{
            GetHistoryList();
        }, []);
    
        const GetHistoryList = async () =>{
            const result = await axios.get('/api/session-chat?sessionId=all')
            console.log(result.data);
            setHistoryList(result.data);
        }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome {' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-600 to-violet-800">{user?.fullName}</span>{' '}
          To Dashboard </h2>
        <AddNewSession>
          <Button
            size="sm"
            className="w-full sm:w-auto flex items-center gap-2"
            disabled = {!paidUser && historyList?.length>=1}
          >
            {/* Label adapts to screen size */}
            <span className="hidden sm:inline cursor-pointer">Consult with Doctor</span>
            <span className="inline sm:hidden">Consult</span> 
            <FirstAid className="h-5 w-5" weight="bold" />
          </Button>
        </AddNewSession>
      </header>

      {/* Main content */}
      <section className="space-y-12">
        <History />
        <Doctors />
      </section>
    </div>
  );
}
