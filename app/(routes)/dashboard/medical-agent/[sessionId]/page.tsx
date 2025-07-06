'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image, { StaticImageData } from 'next/image';
import Vapi from '@vapi-ai/web';
import { Circle, Loader2, PhoneCall } from 'lucide-react';
import { PhoneDisconnect } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { doctorAgent } from '../../_components/DoctorCard';
import { SessionDetail, AgentReport } from '@/types/session';

type Message = { role: 'assistant' | 'user'; text: string };

export default function MedicalVoiceAgent() {
  const params = useParams();
  const sessionId = params.sessionId as string | undefined;

  const [sessionDetail, setSessionDetail] = useState<SessionDetail | null>(null);
  const [callStarted, setCallStarted] = useState(false);
  const [currentRole, setCurrentRole] = useState<'assistant' | 'user' | null>(null);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const vapiRef = useRef<Vapi | null>(null);

  const callStartHandler = useRef<(() => void) | null>(null);
  const callEndHandler = useRef<(() => void) | null>(null);
  const msgHandler = useRef<((m: any) => void) | null>(null);
  const speechStartHandler = useRef<(() => void) | null>(null);
  const speechEndHandler = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      try {
        const { data } = await axios.get<SessionDetail>(
          `/api/session-chat?sessionId=${sessionId}`
        );

        const fixed: SessionDetail = {
          ...data,
          report: typeof data.report === 'string'
            ? (JSON.parse(data.report) as AgentReport)
            : data.report,
        };

        setSessionDetail(fixed);
      } catch (err) {
        console.error('❌ Fetch session:', err);
        toast.error('Failed to load session.');
      }
    })();
  }, [sessionId]);

  const detachAllListeners = useCallback(() => {
    const vapi = vapiRef.current;
    if (!vapi) return;

    if (callStartHandler.current) vapi.off('call-start', callStartHandler.current);
    if (callEndHandler.current) vapi.off('call-end', callEndHandler.current);
    if (msgHandler.current) vapi.off('message', msgHandler.current);
    if (speechStartHandler.current) vapi.off('speech-start', speechStartHandler.current);
    if (speechEndHandler.current) vapi.off('speech-end', speechEndHandler.current);

    callStartHandler.current =
      callEndHandler.current =
      msgHandler.current =
      speechStartHandler.current =
      speechEndHandler.current =
        null;
  }, []);

  const startCall = async () => {
    if (callStarted || vapiRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID;
    if (!apiKey || !assistantId) {
      toast.error('Missing Vapi credentials in .env.local');
      return;
    }

    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;

    callStartHandler.current = () => setCallStarted(true);

    callEndHandler.current = () => {
      setCallStarted(false);
      setCurrentRole(null);
    };

    msgHandler.current = (m: any) => {
      if (m.type !== 'transcript') return;
      const { role, transcriptType, transcript } = m;
      if (transcriptType === 'partial') {
        setCurrentRole(role);
        setLiveTranscript(transcript);
      } else {
        setMessages((prev) => [...prev, { role, text: transcript }]);
        setLiveTranscript('');
        setCurrentRole(null);
      }
    };

    speechStartHandler.current = () => setCurrentRole('assistant');
    speechEndHandler.current = () => setCurrentRole(null);

    vapi.on('call-start', callStartHandler.current);
    vapi.on('call-end', callEndHandler.current);
    vapi.on('message', msgHandler.current);
    vapi.on('speech-start', speechStartHandler.current);
    vapi.on('speech-end', speechEndHandler.current);

    try {
      await vapi.start(assistantId);
    } catch (error) {
      console.error('❌ Failed to start call:', error);
      detachAllListeners();
      vapiRef.current = null;
      toast.error('Unable to start the voice call.');
    }
  };

  const endCall = useCallback(async () => {
    if (!vapiRef.current) return;
    setLoading(true);

    try {
      vapiRef.current.stop();
      detachAllListeners();
      vapiRef.current = null;
      setCallStarted(false);

      await axios.post('/api/medical-report', {
        messages,
        sessionDetail,
        sessionId,
      });

      toast.success('Your report has been generated ✅');
      router.replace('/dashboard');
    } catch (error) {
      console.error('❌ Error while ending call / generating report:', error);
      toast.error('Failed to generate report.');
    } finally {
      setLoading(false);
    }
  }, [detachAllListeners, messages, sessionDetail, sessionId, router]);

  useEffect(() => {
    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
        detachAllListeners();
      }
    };
  }, [detachAllListeners]);

  // ✅ Safe doctor image logic
  const getDoctorImage = (): string | StaticImageData => {
    const img = sessionDetail?.selectedDoctor?.image;
    if (typeof img === 'string' && img.trim() !== '') {
      return img;
    }
    return '/default-doctor.png';
  };

  return (
    <div className="p-5 bg-secondary border rounded-3xl">
      {/* status bar */}
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 px-2 py-1 border rounded-md">
          <Circle
            className="h-4 w-4"
            style={{ fill: callStarted ? '#22c55e' : '#ef4444' }}
          />
          {callStarted ? 'Connected…' : 'Not Connected'}
        </span>
        <span className="text-xl font-bold text-gray-400">00:00</span>
      </div>

      {sessionDetail && (
        <div className="flex flex-col items-center mt-10">
          <Image
            src={getDoctorImage()}
            alt={sessionDetail.selectedDoctor?.specialist || 'Doctor Image'}
            width={120}
            height={120}
            className="w-[100px] h-[100px] rounded-full object-cover"
            priority
          />

          <h2 className="mt-2 text-lg">
            {sessionDetail.selectedDoctor?.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          <div className="mt-12 flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72 w-full max-h-[300px] overflow-y-auto space-y-2">
            {messages.slice(-4).map((m, i) => (
              <div key={`${i}-${m.role}`} className="text-sm text-gray-800">
                <strong>{m.role}:</strong> {m.text}
              </div>
            ))}
            {liveTranscript && (
              <div className="text-sm text-blue-500">
                <strong>{currentRole}:</strong> {liveTranscript}
              </div>
            )}
          </div>

          {!callStarted ? (
            <Button className="mt-10" onClick={startCall} disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : (
                <PhoneCall className="mr-2 h-4 w-4" />
              )}
              Start Call
            </Button>
          ) : (
            <Button
              className="mt-10"
              variant="destructive"
              onClick={endCall}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : (
                <PhoneDisconnect className="mr-2 h-4 w-4" />
              )}
              Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
