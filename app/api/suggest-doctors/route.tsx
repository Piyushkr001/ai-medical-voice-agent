import { openai } from "@/config/OpenAiModal";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { notes } = await req.json();
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash-preview-05-20",
            messages: [
                { role: "system", content: JSON.stringify(AIDoctorAgents) },
                { role: "user", content: "User Notes/Symptoms:"+notes+", Depends on user notes and symptons, Please suggest list of doctors, Return object in JSON only" }
            ],
        });
        const rawResp = completion.choices[0].message;
        //@ts-ignore
        const Resp = rawResp.content.trim().replace('```json','').replace('```','')
        const JSONResp = JSON.parse(Resp);
        return NextResponse.json (JSONResp);
    } catch (e) {
        return NextResponse.json({ e });
    }
}