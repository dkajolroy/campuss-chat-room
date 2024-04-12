import { Route, Routes } from "react-router-dom";
import SignInForm from "./_auth/SignInForm";
import SignUpForm from "./_auth/SignUpForm";
import DiscusPage from "./_root/pages/DiscusPage";
import HomePage from "./_root/pages/HomePage";
import AuthLayout from "./layout/AuthLayout";
import RootLayout from "./layout/RootLayout";

export default function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/sign-in" element={<SignInForm />} />
        <Route path="/auth/sign-up" element={<SignUpForm />} />
      </Route>
      {/* Private route */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/:room_id" element={<DiscusPage />} />
      </Route>
    </Routes>
  );
}
