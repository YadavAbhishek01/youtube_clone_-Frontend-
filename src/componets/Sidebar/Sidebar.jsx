import React, { useContext, useState } from "react";
import { FaFire, FaGamepad, FaMusic } from "react-icons/fa";
import { MdHome, MdSubscriptions, MdVideoLibrary, MdMenu } from "react-icons/md";
import { Searchcontext } from "../../contextApi/SearchContext";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setQuery, setSearch } = useContext(Searchcontext);
  const [open, setOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setQuery(category);
    setSearch(true);
    navigate("/");
    setOpen(false);
  };

  return (
    <>
      {/* Toggle button (mobile only) */}
      <button
        className="sm:hidden fixed top-4 left-4 bg-white p-2 rounded-full shadow-md z-30"
        onClick={() => setOpen(!open)}
      >
        {open ? <ImCross size={18} className="text-gray-700" /> : <MdMenu size={22} className="text-gray-700" />}
      </button>

      {/* Dark overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-40 z-10 sm:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed sm:static top-0 left-0 h-full sm:h-auto bg-white shadow-md p-4 border-r border-gray-200 w-56 transform transition-transform duration-300 z-20
        ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        <h2 className="text-lg font-semibold mb-3 mt-10 sm:mt-0 text-gray-800">Categories</h2>

        <nav className="flex flex-col gap-3 text-gray-600">
          {[
            { label: "Trending", icon: <FaFire />, key: "trending" },
            { label: "Music", icon: <FaMusic />, key: "music" },
            { label: "Gaming", icon: <FaGamepad />, key: "gaming" },
            { label: "News", icon: "📰", key: "news" },
            { label: "Technology", icon: "💻", key: "technology" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className="flex items-center gap-2 hover:text-red-500 transition"
            >
              {cat.icon} {cat.label}
            </button>
          ))}

          <hr className="my-2" />

          <button
            onClick={() => {
              navigate("/");
              setSearch(false);
              setOpen(false);
            }}
            className="flex items-center gap-2 hover:text-red-500 transition"
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
    </>
  );
};

export default Sidebar;
