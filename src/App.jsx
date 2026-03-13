import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/main.css";

import Home from "./pages/Home";
import ImageDetails from "./pages/ImageDetails";
import CreateImage from "./pages/CreateImage";
import EditImage from "./pages/EditImage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/image/:id" element={<ImageDetails />} />

        <Route path="/create" element={<CreateImage />} />

        <Route path="/edit/:id" element={<EditImage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;