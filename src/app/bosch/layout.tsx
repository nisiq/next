"use client"

import "../globals.css";
import React from 'react';
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import { msalInstance } from '@/service/msal';
import UnauthenticatedBosch from "@/components/UnauthenticatedBosch";
import SideBar from "@/components/BoschUser/Sidebar";
import dashboardImage from '@/../public/dashboard.png';
import notebookImage from '@/../public/diary.png';
import tasksImage from '@/../public/tasks.png';
import settingsImage from '@/../public/settings.png';
import supportImage from '@/../public/help.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function BoschLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Menus = [
    { title: "Home", src: dashboardImage, link: "/bosch" },
    { title: "Users", src: notebookImage, link: "/bosch/users" },
    { title: "Configurações", src: settingsImage, link: "/bosch/settings" },
    { title: "Ajuda", src: supportImage, link: "/help" },
  ]
  return (
    <html lang="en">
      <body>
        <main className="flex h-auto min-h-[100vh]">
          <MsalProvider instance={msalInstance}>
            <ToastContainer />

            <AuthenticatedTemplate>
              <SideBar Menus={Menus} />
              <section className="w-full h-full pt-4 pl-5">
                {children}
              </section>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
              <UnauthenticatedBosch />
            </UnauthenticatedTemplate>
          </MsalProvider>
        </main>
      </body>
    </html>
  );
}