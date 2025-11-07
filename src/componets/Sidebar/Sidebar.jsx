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
        className="sm:hidden fixed top-4 left-4 bg-white p-2 rounded-full shadow-lg z-30 border border-gray-200 hover:bg-gray-100 transition"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <ImCross size={16} className="text-gray-700" />
        ) : (
          <MdMenu size={22} className="text-gray-700" />
        )}
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm z-10 sm:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed sm:static top-0 left-0 h-full sm:h-auto bg-white shadow-lg border-r border-gray-100 w-60 transform transition-transform duration-300 ease-in-out z-20 
        ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        <div className="flex items-center justify-between sm:hidden px-4 pt-4">
          <h2 className="text-lg font-semibold text-gray-800 mt-10">Categories</h2>
          {/* <ImCross
            size={16}
            className="text-gray-600 cursor-pointer"
            onClick={() => setOpen(false)}
          /> */}
        </div>

        <div className="p-4 sm:pt-6">
          <h2 className="hidden sm:block text-xl font-semibold mb-4 text-gray-800">
            Categories
          </h2>

          <nav className="flex flex-col gap-1 text-gray-700 font-medium">
            {/* Home */}
            <button
              onClick={() => {
                navigate("/");
                setSearch(false);
                setOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
            >
              <MdHome size={20} /> Home
            </button>

            {/* Category buttons */}
            {[
              { label: "Trending", icon: <FaFire size={18} />, key: "trending" },
              { label: "Music", icon: <FaMusic size={18} />, key: "music" },
              { label: "Gaming", icon: <FaGamepad size={18} />, key: "gaming" },
              { label: "News", icon: "📰", key: "news" },
              { label: "Technology", icon: "💻", key: "technology" },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
              >
                {cat.icon} {cat.label}
              </button>
            ))}

            <hr className="my-4 border-gray-200" />

              </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
