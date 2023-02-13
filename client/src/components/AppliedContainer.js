import React, { useState } from "react";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import CreateApp from "./pages/CreateApp";
import PreviewApp from "./pages/PreviewApp";
import UpdateApp from "./pages/UpdateApp";
import UserDash from "./pages/UserDash";
import Footer from "./Footer";

export default function AppliedContainer() {
  const [currentPage, setCurrentPage] = useState("Home");

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home />;
    }
    if (currentPage === "CreateApp") {
      return <Create />;
    }
    if (currentPage === "UpdateApp") {
      return <Update />;
    }
    if (currentPage === "PreviewApp") {
        return <Preview />;
      }
    return <Dashboard />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />

      {renderPage()}

      <Footer />
    </div>
  );
}