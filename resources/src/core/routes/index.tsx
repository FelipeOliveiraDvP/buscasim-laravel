import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PrivateLayout, PublicLayout } from "@/layouts";

const LoginPage = lazy(() => import("@/pages/Public/Login"));
const ForgotPage = lazy(() => import("@/pages/Public/Forgot"));
const ResetPage = lazy(() => import("@/pages/Public/Reset"));

const DashboardPage = lazy(() => import("@/pages/Private/Dashboard"));
const CustomersPage = lazy(() => import("@/pages/Private/Customers"));
const SchedulerPage = lazy(() => import("@/pages/Private/Scheduler"));
const TasksPage = lazy(() => import("@/pages/Private/Tasks"));
const ProcessesPage = lazy(() => import("@/pages/Private/Processes"));
const UsersPage = lazy(() => import("@/pages/Private/Users"));
const ProfilePage = lazy(() => import("@/pages/Private/Profile"));

const NotFoundPage = lazy(() => import("@/pages/Error/NotFound"));

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="forgot" element={<ForgotPage />} />
          <Route path="reset/:token" element={<ResetPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/app" element={<PrivateLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="scheduler" element={<SchedulerPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="processes" element={<ProcessesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
