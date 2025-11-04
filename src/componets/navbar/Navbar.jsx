import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { Searchcontext } from "../../contextApi/SearchContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { query, setQuery, setSearch } = useContext(Searchcontext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      setSearch(true); // trigger search
      navigate("/");   // ✅ always go home to show search results
    }
  };

  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-20">
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
        className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full sm:w-96"
      >
        <input
          type="text"
          value={query}
          placeholder="Search videos..."
          onChange={(e) => setQuery(e.target.value)}
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
