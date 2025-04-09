import '@mantine/core/styles.css';
import ClientLayout from './ClientLayout';
import { metadata } from './metadata';

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Hurricane&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
