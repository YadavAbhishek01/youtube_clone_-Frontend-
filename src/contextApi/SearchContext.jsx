import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Searchcontext = createContext();

export const SearchcontextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [randomevideo,setRandomevideo]=useState([]);

  const decodeBase64 = (encoded) => {
    try {
      return JSON.parse(atob(encoded));
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      if (!search || !query) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/search?q=${query}`
        );  

        const decoded = decodeBase64(res.data.data || res.data.encoded);
        setData(decoded);
   
      } catch (err) {
        console.error("❌ Error fetching category:", err);
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
        setRandomevideo,
        randomevideo,
      }}
    >
      {children}
    </Searchcontext.Provider>
  );
};
