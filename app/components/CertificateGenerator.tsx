'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Paper, Title, Text, Button, Stack, Container } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

export interface CertificateGeneratorProps {
  name: string;
}

export default function CertificateGenerator({ name }: CertificateGeneratorProps) {
  const downloadAsPDF = async () => {
    if (!name) return;

    // Create a temporary div for the certificate
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    document.body.appendChild(tempDiv);

    // Create the certificate content
    tempDiv.innerHTML = `
      <div style="position: relative; width: 2480px; height: 1754px; background: white;">
        <img src="/sertifika.png" style="width: 100%; height: 100%; object-fit: contain;" />
        <div style="position: absolute; left: 0; right: 0; top: 33%; text-align: center; font-family: 'Hurricane', cursive; font-size: 200px; color: #ff6b6b; padding: 8px; text-shadow: 0px 0px 1px rgba(0,0,0,0.1);">
          ${name}
        </div>
      </div>
    `;

    try {
      const canvas = await html2canvas(tempDiv.firstElementChild as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        imageTimeout: 0,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4',
        compress: false
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(`${name}-sertifika.pdf`);
    } finally {
      // Clean up
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <Container size="sm" p={0} className="w-full">
      <Paper shadow="sm" radius="md" p="lg" withBorder>
        <Stack gap="md" align="center">
          <Button
            onClick={downloadAsPDF}
            disabled={!name}
            size="lg"
            leftSection={<IconDownload size={20} />}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Sertifikayı İndir
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
} 