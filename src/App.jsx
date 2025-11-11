import { Routes, Route } from "react-router-dom";
import Video from "./pages/Video";
import Layout from "./componets/mainlayout/Layout"; 
import Home from "./pages/Home";
import SortVideo from "./pages/SortVideo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 👈 Important import

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/video/:id" element={<Video />} />
          <Route path="/sortvideo" element={<SortVideo />} />
        </Route>
      </Routes>

      {/* 👇 Add this at the bottom of your app */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        // theme="colored"
      />
    </>
  );
}

export default App;
