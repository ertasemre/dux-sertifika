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
        <div style="position: absolute; left: 0; right: 0; top: 33%; text-align: center; font-family: 'Hurricane', cursive; font-size: 120px; color: #ff6b6b; padding: 8px; text-shadow: 0px 0px 1px rgba(0,0,0,0.1);">
          ${name}
        </div>
      </div>
    `;

    try {
      const canvas = await html2canvas(tempDiv.firstElementChild as HTMLElement, {
        scale: 1,
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
    <Container size="lg" p={0}>
      <Paper shadow="sm" radius="md" p="lg" withBorder>
        <Stack gap="md">
          {/* Certificate Preview */}
          <Paper radius="md" className="bg-gray-50 p-4">
            <div 
              className="relative bg-white rounded-lg shadow-sm"
              style={{ 
                width: '808px',
                maxWidth: '100%',
                margin: '0 auto',
                padding: '24px'
              }}
            >
              <div className="relative" style={{ width: '808px', height: '624px', maxWidth: '100%' }}>
                <img 
                  src="/sertifika.png" 
                  alt="Sertifika Şablonu" 
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '132%',
                    transform: 'translate(-50%, -100%)',
                    width: '808px',
                    height: '624px',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '78%',
                    fontFamily: 'Hurricane, cursive',
                    fontSize: '70px',
                    color: '#ff6b6b',
                    textShadow: '0px 0px 1px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    width: '100%',
                    zIndex: 10
                  }}
                >
                  {name || 'İsim Soyisim'}
                </div>
              </div>
            </div>
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
} 