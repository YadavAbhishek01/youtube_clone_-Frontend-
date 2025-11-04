import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Video from "./pages/video";
import Layout from "./componets/mainlayout/Layout"; // double-check spelling!

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/video/:id" element={<Video />} />
      </Route>
    </Routes>
  );
}

export default App;
