import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "@/pages/auth";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ContactMessages from "./pages/master/contact_messages/ContactMessages";
import ContactMessageForm from "./pages/master/contact_messages/ContactMessagesForm";
function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />

      <Route
        path="/auth/*"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      {/* <Route path="master/contact-messages" element={<ContactMessages />} />
      <Route path="master/contact-messages/create" element={<ContactMessageForm />} /> */}
    </Routes>
  );
}

export default App;