import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Searchcontext = createContext();

export const SearchcontextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [randomevideo, setRandomevideo] = useState([]);

  // ✅ Decode Base64 (matches backend)


  useEffect(() => {
    const fetchVideos = async () => {
      if (!search || !query) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/search?q=${query}`
        );

      
     
        setData(res.data.data);
 
      } catch (err) {
        console.error("❌ Error fetching videos:", err);
        toast.error(err.message)
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query, search]);

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
      }}
    >
      {children}
    </Searchcontext.Provider>
  );
};
