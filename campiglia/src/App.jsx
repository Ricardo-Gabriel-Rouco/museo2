import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import Load from "./components/Load/Load";
import Search from "./components/Search/Search";
import Details from "./components/Details/Details";

function App() {
  const appStyles = {
    backgroundColor: "#A4B2B6", // Cambia el color de fondo según tus preferencias
    // Otros estilos que desees aplicar
  };

  return (
    <div style={appStyles}> {/* Aplica los estilos al elemento raíz */}
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/load" element={<Load />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details/:idRegister" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
