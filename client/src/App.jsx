import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Components/DashBoard";
import Player from "./Components/Player";
import Home from "./Components/Home";
import RootLayout from "./Pages/RootLayout";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import UploadNewVideoPage from "./Pages/UploadNewVideoPage";
import SearchResultspage  from './Pages/SearchResultsPage'
import SeriesPage from "./Pages/SeriesPage";
import UserPage from "./Pages/UserPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        
      },
      { path: "signUp", element: <SignUpPage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "upload",
        element: (
          <ProtectedRoute>
            <UploadNewVideoPage />
          </ProtectedRoute>
        ),
      },
      { path: "video/:id", element: <Player /> },
      {
        path: "/dashboard/analyics",
        element: (
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        ),
      },
      {path : '/results' , element : <SearchResultspage /> },
      {path : '/series/:id' , element : <SeriesPage /> },
      {path : '/user/:id' , element : <UserPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
