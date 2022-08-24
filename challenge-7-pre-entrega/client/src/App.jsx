import Header from "./components/layout/Header";
import SidebarMenu from "./components/layout/SidebarMenu";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <SidebarMenu />
      <main className="main">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path={"/404"} element={<NotFound />} replace />
          <Route path={"*"} element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
