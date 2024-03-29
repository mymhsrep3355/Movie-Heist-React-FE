import React, { useState, useEffect } from "react";
import logo from "../assets/Movieheist.png";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosLogOut, IoMdArrowDropdown } from "react-icons/io";
import { firebaseAuth } from "../global/Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const AppNavigation = () => {
  const [isDrop, setDrop] = useState(false);
  const navigate = useNavigate();
  // const [displaySearch, setDisplaySearch] = useState(false);
  // const [valueFocus, setValueFocus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const links = [
    { name: "Movies", link: "/movies" },
    { name: "TV shows", link: "/tv" },
    { name: "My Favorites", link: "/favList" },
    { name: "Recommendations", link: "/recommended" },
    { name: "My Reviews", link: "/reviews" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setIsLoggedIn(!!user);
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="z-20 w-full p-2 flex justify-evenly items-center absolute">
      <div className="flex w-1/5 items-center">
        <Link to="/">
          <img className="h-32 cursor-pointer" src={logo} alt="app home logo" />
        </Link>
      </div>
      <div className="flex w-3/5 p-10 justify-center">
        <ul className="flex items-center gap-10 cursor-pointer">
          {links.map(({ name, link }) => (
            <li key={link}>
              <Link to={link}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {isLoggedIn ? (
        <div className="flex justify-center px-6 w-1/4">
          <div className="flex justify-between items-center gap-2">
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/search")}
              >
                <FaSearch className="text-white" />
              </button>
            </div>
            <div className="flex">
              <button onClick={() => signOut(firebaseAuth)}>
                <IoIosLogOut className="text-white text-xl" />
              </button>
            </div>
            <div className="relative flex">
              <IoMdArrowDropdown
                onClick={() => setDrop(!isDrop)}
                className="cursor-pointer h-8 flex text-xl"
              />
              {isDrop && (
                <div className="absolute top-full bg-black border border-white rounded overflow-hidden">
                  <ul>
                    <li>
                      <Link
                        to="/favList"
                        className="block p-2 text-white hover:text-red-500"
                      >
                        My Favorites
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/recommended"
                        className="block p-2 text-white hover:text-red-500"
                      >
                        Recommended
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/forgot-password"
                        className="block p-2 text-white hover:text-red-500"
                      >
                        Forgot Password
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => signOut(firebaseAuth)}
                        className="block p-2 text-white hover:text-red-500"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-2">
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      )}
    </div>
  );
};

export default AppNavigation;
