import { Routes, Route, Router } from "react-router-dom";
import Video from "./pages/Video";
import Layout from "./componets/mainlayout/Layout"; // double-check spelling!
import Home from "./pages/Home";
import SortVideo from "./pages/SortVideo";


function App() {
  return ( 
  
    <>
   
       <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/sortvideo" element={<SortVideo/>}/>
      </Route>
    </Routes>
    </>
 
   
  );
}

export default App;
