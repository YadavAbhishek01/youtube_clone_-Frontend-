import React, { useContext } from 'react';
import { FaFire, FaGamepad, FaMusic } from 'react-icons/fa';
import { MdHome, MdSubscriptions, MdVideoLibrary } from 'react-icons/md';
import { Searchcontext } from '../../contextApi/SearchContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const { setQuery, setSearch } = useContext(Searchcontext);

  const handleCategoryClick = (category) => {
    setQuery(category);
    setSearch(true);   // ✅ trigger API call
    navigate('/');     // ✅ always go home to display results
  };

  return (
    <aside className="hidden sm:flex flex-col bg-white w-56 shadow-md p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Categories</h2>

      <nav className="flex flex-col gap-3 text-gray-600">
        <button
          onClick={() => handleCategoryClick("trending")}
          className="flex items-center gap-2 hover:text-red-500 transition"
        >
          <FaFire /> Trending
        </button>

        <button
          onClick={() => handleCategoryClick("music")}
          className="flex items-center gap-2 hover:text-red-500 transition"
        >
          <FaMusic /> Music
        </button>

        <button
          onClick={() => handleCategoryClick("gaming")}
          className="flex items-center gap-2 hover:text-red-500 transition"
        >
          <FaGamepad /> Gaming
        </button>

        <button
          onClick={() => handleCategoryClick("news")}
          className="flex items-center gap-2 hover:text-red-500 transition"
        >
          📰 News
        </button>

        <button
          onClick={() => handleCategoryClick("technology")}
          className="flex items-center gap-2 hover:text-red-500 transition"
        >
          💻 Technology
        </button>

        <hr className="my-2" />

        <button
          className="flex items-center gap-2 hover:text-red-500 transition"
          onClick={() => {
            navigate('/');
            setSearch(false);
          }}
        >
          <MdHome /> Home
        </button>

        <button className="flex items-center gap-2 hover:text-red-500 transition">
          <MdSubscriptions /> Subscriptions
        </button>

        <button className="flex items-center gap-2 hover:text-red-500 transition">
          <MdVideoLibrary /> Library
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
