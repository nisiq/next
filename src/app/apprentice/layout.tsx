"use server"

import dashboardImage from '@/../public/dashboard.png';
import notebookImage from '@/../public/diary.png';
import supportImage from '@/../public/help.png';
import projectsImage from '@/../public/projects.svg';
import settingsImage from '@/../public/settings.png';
import tasksImage from '@/../public/tasks.png';
import AuthComponent from "@/components/Auth";
import SideBar from "@/components/SideBar";
import SessionProviderWrapper from "@/utils/sessionProviderWrapper";
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../globals.css";


export default async function ApprendiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Menus = [
    { title: "Dashboard", src: dashboardImage, link: "/apprentice" },
    { title: "Diário de bordo", src: notebookImage, link: "/apprentice/diario" },
    { title: "Tarefas", src: tasksImage, link: "/apprentice/tasks" },
    { title: "Meus projetos", src: projectsImage, link: "/apprentice/project" },
    { title: "Configurações", src: settingsImage, link: "/apprentice/settings" },
    { title: "Ajuda", src: supportImage, link: "/help" },
  ]

  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <main className="flex h-auto min-h-[100vh]">
            <ToastContainer />
            <AuthComponent />
            <SideBar Menus={Menus} />
            <section className="w-full h-full pt-4 pl-5">
              {children}
            </section>
          </main>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
