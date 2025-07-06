'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SessionDetail, AgentReport } from '@/types/session';

interface Props {
  record: SessionDetail;
}

export default function ViewReport({ record }: Props) {
  if (!record?.createdOn) {
    return (
      <Button variant="link" size="sm" disabled>
        Invalid Record
      </Button>
    );
  }

  const formattedDate = moment(record.createdOn).fromNow();
  const report: AgentReport | null = record.report;

  const handleDownloadPDF = async () => {
    const safeHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #000;
            background: #fff;
            padding: 24px;
            width: 600px;
          }
          h1 { text-align: center; font-size: 22px; margin-bottom: 20px; }
          h3 { color: #2563eb; margin-top: 16px; }
          ul { margin-left: 20px; }
          p, li { font-size: 14px; line-height: 1.5; }
        </style>
      </head>
      <body>
        <h1>Medical Voice Agent Report</h1>
        <h3>Session Info</h3>
        <p><strong>Doctor Specialization:</strong> ${record.selectedDoctor?.specialist ?? 'Unknown'}</p>
        <p><strong>Consultation Date:</strong> ${formattedDate}</p>

        ${
          report?.symptoms?.length
            ? `<h3>Symptoms</h3><ul>${report.symptoms.map((s) => `<li>${s}</li>`).join('')}</ul>`
            : ''
        }

        ${
          report?.diagnosis
            ? `<h3>Diagnosis</h3><p>${report.diagnosis}</p>`
            : ''
        }

        ${
          report?.prescription?.length
            ? `<h3>Prescription</h3><ul>${report.prescription.map((m) => `<li>${m}</li>`).join('')}</ul>`
            : ''
        }

        ${
          report?.notes
            ? `<h3>Additional Notes</h3><p>${report.notes}</p>`
            : ''
        }

        ${
          !report ||
          (!report.symptoms?.length &&
            !report.diagnosis &&
            !report.prescription?.length &&
            !report.notes)
            ? `<p style="font-style:italic; color:#555;">No report data available.</p>`
            : ''
        }
      </body>
      </html>
    `;

    // Create an iframe to isolate styles
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(safeHtml);
    doc.close();

    iframe.onload = async () => {
      try {
        const canvas = await html2canvas(doc.body, { backgroundColor: '#ffffff', scale: 2 });

        const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();

        const ratio = Math.min(pageW / canvas.width, pageH / canvas.height);
        const imgW = canvas.width * ratio;
        const imgH = canvas.height * ratio;
        const x = (pageW - imgW) / 2;
        const y = 20;

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, imgW, imgH);
        pdf.save(`report-${record.sessionId}.pdf`);
      } catch (err) {
        console.error('❌ PDF generation failed:', err);
      } finally {
        document.body.removeChild(iframe);
      }
    };
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          View Report
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-3xl font-bold">Medical Voice Agent Report</h2>
          </DialogTitle>

          <DialogDescription asChild>
            <div className="mt-8 space-y-6 px-4">
              <section>
                <h3 className="font-semibold text-blue-500 text-lg mb-2">Session Info</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Doctor Specialization:</span>{' '}
                    {record.selectedDoctor?.specialist ?? 'Unknown'}
                  </div>
                  <div>
                    <span className="font-medium">Consultation Date:</span> {formattedDate}
                  </div>
                </div>
              </section>

              {!!report?.symptoms?.length && (
                <section>
                  <h3 className="font-semibold text-blue-500 text-lg mb-2">Symptoms</h3>
                  <ul className="list-disc list-inside text-sm text-gray-800">
                    {report.symptoms.map((s, i) => (
                      <li key={`symptom-${i}-${s}`}>{s}</li>
                    ))}
                  </ul>
                </section>
              )}

              {report?.diagnosis && (
                <section>
                  <h3 className="font-semibold text-blue-500 text-lg mb-2">Diagnosis</h3>
                  <p className="text-sm text-gray-800">{report.diagnosis}</p>
                </section>
              )}

              {!!report?.prescription?.length && (
                <section>
                  <h3 className="font-semibold text-blue-500 text-lg mb-2">Prescription</h3>
                  <ul className="list-disc list-inside text-sm text-gray-800">
                    {report.prescription.map((m, i) => (
                      <li key={`med-${i}-${m}`}>{m}</li>
                    ))}
                  </ul>
                </section>
              )}

              {report?.notes && (
                <section>
                  <h3 className="font-semibold text-blue-500 text-lg mb-2">Additional Notes</h3>
                  <p className="text-sm text-gray-800">{report.notes}</p>
                </section>
              )}

              {!report ||
                (!report.symptoms?.length &&
                  !report.diagnosis &&
                  !report.prescription?.length &&
                  !report.notes) && (
                  <p className="text-center text-sm text-gray-500 italic">
                    No report data available.
                  </p>
                )}

              <div className="flex justify-end">
                <Button size="sm" onClick={handleDownloadPDF}>
                  Download Report
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
