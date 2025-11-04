import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Searchcontext = createContext();

export const SearchcontextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch only when `search` changes to true and `query` exists
  useEffect(() => {
    if (search && query.trim() !== "") {
      fetchData();
    }
  }, [search,query]);
const fetchData = async () => {
  try {
    setLoading(true);
    const res = await axios.get(`http://localhost:3000/api/search?q=${query}`);
    console.log("✅ YouTube results from backend:", res.data);
    setData(res.data || []);
  } catch (error) {
    console.error("❌ Fetch error:", error.response?.data || error.message);
  } finally {
    setLoading(false);
   
  }
};



  return (
    <Searchcontext.Provider
      value={{
        data,
        setQuery,
        query,
        setSearch,
        search,
        loading,
        setData,
      }}
    >
      {children}
    </Searchcontext.Provider>
  );
};
