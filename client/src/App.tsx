import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/ProtectedRoute";
import OfficerDashboard from "./pages/OfficerDashboard";
import Signup from "./pages/Signup";
import { Toaster } from "sonner";

const App: React.FC = () => (
  <AuthProvider>
    <Toaster />

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* patient routes */}
      <Route element={<ProtectedRoutes requiredRoles={["user"]} />}>
        <Route path="/patient" element={<PatientDashboard />} />
      </Route>

      {/* officer */}
      <Route element={<ProtectedRoutes requiredRoles={["officer"]} />}>
        <Route path="/officer" element={<OfficerDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

export default App;
