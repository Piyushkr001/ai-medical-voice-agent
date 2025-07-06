'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SessionDetail } from '@/types/session';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import ViewReport from './ViewReport';

type Props = {
  historyList: SessionDetail[];
};

function HistoryTable({ historyList }: Props) {
  return (
    <div>
      <Table>
        <TableCaption>Previous Consultation Reports</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">AI Medical Specialist</TableHead>
            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyList.map((record, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {record.selectedDoctor?.specialist || 'Unknown'}
              </TableCell>
              <TableCell>{record.notes || 'No notes available'}</TableCell>
              <TableCell>
                {record.createdOn
                  ? moment(new Date(record.createdOn)).fromNow()
                  : 'Date not available'}
              </TableCell>
              <TableCell className="text-right">
                <ViewReport record={record} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryTable;
