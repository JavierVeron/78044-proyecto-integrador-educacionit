import Alta from "./components/Alta";
import CarritoDeCompras from "./components/CarritoDeCompras";
import Catalogo from "./components/Catalogo";
import Checkout from "./components/Checkout";
import APIContextProvider from "./components/context/APIContext";
import Error404 from "./components/Error404";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <APIContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={"/"} element={<Catalogo />} />
            <Route path={"/productos"} element={<Catalogo />} />
            <Route path={"/categoria/:id"} element={<Catalogo />} />
            <Route path={"/alta"} element={<Alta />} />
            <Route path={"/carrito"} element={<CarritoDeCompras />} />
            <Route path={"/checkout"} element={<Checkout />} />
            <Route path={"*"} element={<Error404 />} />
          </Routes>  
        </BrowserRouter>
      </APIContextProvider>
    </>
  )
}

export default App
