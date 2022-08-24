import Header from "./components/layout/Header";
import SidebarMenu from "./components/layout/SidebarMenu";
import Loading from "./components/shared/Loading/Loading";

function App() {
  return (
    <>
      <Header />
      <SidebarMenu />
      <main className="main"></main>
    </>
  );
}

export default App;
