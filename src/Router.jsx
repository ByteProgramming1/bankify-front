import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Landing views (home & auth)
const HomeView = lazy(() => import("./views/HomeView"));
const LoginView = lazy(() => import("./views/auth/LoginView"));
const RegisterView = lazy(() => import("./views/auth/RegisterView"));

// App views
const AppLayout = lazy(() => import("./components/app/AppLayout"));
const DashboardView = lazy(() => import("./views/app/DashboardView"));
const TransferencesView = lazy(() => import("./views/app/TransferencesView"));
const CreditsView = lazy(() => import("./views/app/CreditsView"));
const AdminView = lazy(() => import("./views/app/AdminView"));

const Router = () => {
  return (
    <Suspense fallback={<h1>Cargando...</h1>}> {/* Crear luego un loader para esto */}
      <Routes>
        {/* Landing (home & auth) */}
        <Route path="/" index element={<HomeView />} />
        <Route path="/auth/login" element={<LoginView />} />
        <Route path="/auth/register" element={<RegisterView />} />

        {/* App */}
        <Route path="/app" element={<AppLayout />}>
          <Route path="dashboard" element={<DashboardView />} />
          <Route path="transferences" element={<TransferencesView />} />
          <Route path="credits" element={<CreditsView />} />
          <Route path="admin" element={<AdminView />} />

          {/* NOT FOUND */}
          <Route path="*" element={<h1>ERROR 404, NOT FOUND (ON APP)</h1>} />
        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<h1>ERROR 404, NOT FOUND</h1>} />
      </Routes>
    </Suspense>
  )
}

export default Router