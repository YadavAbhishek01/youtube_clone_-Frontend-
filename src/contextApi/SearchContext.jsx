import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
export const Searchcontext = createContext();

export const SearchcontextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [randomevideo, setRandomevideo] = useState([]);
  const [pagetype, setPagetype] = useState("home");
  const [sortBy, setSortBy] = useState("relevance");
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  // ✅ Fetch videos dynamically based on page type
  useEffect(() => {

    
    const fetchVideos = async () => {
      if (!search && pagetype !== "sort") return; // only trigger when needed
      console.log(pagetype)
      setLoading(true);
      try {
        let res;

        if (pagetype === "sort") {
          // ✅ If user is in sort page (whether searched or not)
          const endpoint = query
            ? `${import.meta.env.VITE_BACKEND_URL}/api/sortvideo?q=${query}&sort=${sortBy}`
            : `${import.meta.env.VITE_BACKEND_URL}/api/sortvideo?sort=${sortBy}`;
          res = await axios.get(endpoint);
        } else {
          // ✅ Normal search page
          res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/search?q=${query}`
          );
        }

        const bytes=CryptoJS.AES.decrypt(res.data.data,secretKey);
        const descrypt=JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setData(descrypt|| []);
      } catch (err) {
        console.error("❌ Error fetching videos:", err);
        toast.error(err.message || "Failed to load videos");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query, search, pagetype, sortBy]);

  return (
    <Searchcontext.Provider
      value={{
        query,
        setQuery,
        data,
        setData,
        loading,
        search,
        setSearch,
        setLoading,
        randomevideo,
        setRandomevideo,
        setPagetype,
        pagetype,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </Searchcontext.Provider>
  );
};
