'use client';

import { useState } from 'react';
import { Container, Title, Text, Paper, TextInput, Stack, Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function Home() {
  const [name, setName] = useState('');

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
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <Paper shadow="sm" p="xl" radius={0} className="bg-white border-b border-gray-100">
        <Container size="lg">
          <Stack align="center" gap="xs">
            <img src="/B02.svg" alt="Logo" style={{ height: '48px' }} />
            <Text size="lg" c="dimmed" className="max-w-2xl text-center">
              Dünyanın en geçerli sertifikası
            </Text>
          </Stack>
        </Container>
      </Paper>

      {/* Main Content */}
      <Container size="lg" py="xl">
        <Paper shadow="sm" p="lg" radius="md" withBorder className="max-w-md mx-auto">
          <Stack gap="md">
            <Title order={2} size="h3">Adınız ve Soyadınız</Title>

            <TextInput
              size="lg"
              placeholder="İsim Soyisim"
              value={name}
              onChange={(e) => setName(e.target.value)}
              styles={{
                input: {
                  '&:focus': {
                    borderColor: '#228be6'
                  }
                }
              }}
            />

            <Button
              size="lg"
              leftSection={<IconDownload size={20} />}
              disabled={!name}
              onClick={downloadAsPDF}
              fullWidth
              className="bg-blue-500 hover:bg-blue-600"
            >
              Sertifika İndir (PDF)
            </Button>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}