import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Pages/Cart";
import Detail from "./Pages/Detail";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:category" element={<Home />} />
        <Route path="/detail/:product" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
