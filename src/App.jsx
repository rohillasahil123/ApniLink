// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/DeshBoard";
import ProPage from "./Pages/ProPage";
import PublicPage from "./Pages/PublicPage";
import Success from "./Pages/Success";
import Upgrade from "./Pages/Upgrade";
import AnalyticsPage from "./Pages/AnalyticsPage";
import NotPro from "./Pages/NotPro";
import Home_Page from "./Pages/Home_Page";
import ThemeCustomizer from "./Components/ThemeCustomizer";

// Layout and Context
import ProtectedRoute from "./Components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext"; // ⬅️ Add this
import Layout from "./Components/Layout";

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <Layout>
                  <Home_Page />
                </Layout>
              }
            />
            <Route path="/success" element={<Success />} />
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/:username" element={<PublicPage />} />
            <Route path="/pro-only" element={<NotPro />} />
            <Route path="/customize" element={<ThemeCustomizer />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pro"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ProPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute proOnly={true}>
                  <Layout>
                    <AnalyticsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/home" element={<Navigate to="/dashboard" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
