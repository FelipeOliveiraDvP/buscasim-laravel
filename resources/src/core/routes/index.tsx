import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PrivateLayout, PublicLayout } from '@/layouts';

const HomePage = lazy(() => import('@/pages/Public/Home'));
const LoginPage = lazy(() => import('@/pages/Public/Login'));
const ForgotPage = lazy(() => import('@/pages/Public/Forgot'));
const ResetPage = lazy(() => import('@/pages/Public/Reset'));

// const DashboardPage = lazy(() => import('@/pages/Private/Dashboard'));
// const CustomersPage = lazy(() => import('@/pages/Private/Customers'));
// const SchedulerPage = lazy(() => import('@/pages/Private/Scheduler'));
// const TasksPage = lazy(() => import('@/pages/Private/Tasks'));
// const ProcessesPage = lazy(() => import('@/pages/Private/Processes'));
// const UsersPage = lazy(() => import('@/pages/Private/Users'));
// const ProfilePage = lazy(() => import('@/pages/Private/Profile'));

const NotFoundPage = lazy(() => import('@/pages/Error/NotFound'));

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="resultados" element={<div>Resultados</div>} />
          <Route path="pagamento" element={<div>pagamento</div>} />
          <Route
            path="perguntas-frequentes"
            element={<div>perguntas-frequentes</div>}
          />
          <Route path="contato" element={<div>contato</div>} />
          <Route
            path="politica-de-privacidade"
            element={<div>politica-de-privacidade</div>}
          />
          <Route path="entrar" element={<LoginPage />} />
          <Route path="esqueci-minha-senha" element={<ForgotPage />} />
          <Route path="alterar-senha/:token" element={<ResetPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/app" element={<PrivateLayout />}>
          <Route index element={<div>pedidos</div>} />
          <Route path="cupons" element={<div>cupons</div>} />
          <Route path="configuracoes" element={<div>configurações</div>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
