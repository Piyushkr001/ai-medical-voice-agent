"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ChatCircle } from 'phosphor-react';
import AddNewSession from './AddNewSession';
import axios from 'axios';
import HistoryTable from './HistoryTable';
import { SessionDetail } from '@/types/session';


function History() {
    const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

    useEffect (() =>{
        GetHistoryList();
    }, []);

    const GetHistoryList = async () =>{
        const result = await axios.get('/api/session-chat?sessionId=all')
        console.log(result.data);
        setHistoryList(result.data);
    }
    return (
        <div className='mt-10'>
            {historyList.length == 0 ?
                <div className='flex flex-col items-center justify-center p-7 border-2 border-dashed rounded-2xl'>
                    <Image src="/Images/medical-assistance.png" width={150} height={150} alt='empty' />
                    <h2 className='font-bold text-2xl mt-2'>No Recent Consltations</h2>
                    <p>Its Looks Like you haven't consulted with any doctors yet.</p>
                    <AddNewSession>
                        <Button className='mt-3 cursor-pointer'>+ Start a Consultation <ChatCircle /> </Button>
                    </AddNewSession>
                </div> :
                <div>
                    <HistoryTable historyList={historyList} />
                </div>
            }
        </div>
    )
}

export default History