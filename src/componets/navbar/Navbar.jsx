import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Searchcontext } from "../../contextApi/SearchContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { setQuery, setSearch } = useContext(Searchcontext);
  const [inputValue, setInputValue] = useState(""); // local input state

  // ✅ Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue.trim() !== "") {
        setQuery(inputValue);
        setSearch(true);
      } else {
        setSearch(false);
      }
    }, 2000); // ⏱ wait 600ms after user stops typing

    // cleanup if user keeps typing
    return () => clearTimeout(handler);
  }, [inputValue, setQuery, setSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setQuery(inputValue);
      setSearch(true);
      navigate("/");
        
    }
    
  
  };
  return (
    <header className="w-full bg-white shadow-md py-3 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-20 gap-3">
      <h1
        className="text-2xl font-bold text-red-500 tracking-wide cursor-pointer"
        onClick={() => {
          navigate("/");
          setSearch(false);
        }}
      >
        🎥 MiniView
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-full sm:w-96 max-w-md"
      >
        <input
          type="text"
          placeholder="Search videos..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex bg-transparent outline-none px-2 text-gray-700 w-full"
        />
        <button
          type="submit"
          className="text-gray-600 hover:text-red-500 transition-colors"
        >
          <CiSearch size={22} />
        </button>
      </form>
    </header>
  );
};

export default Navbar;
