import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";

const Navbar = ({
  queryHandler,
  submitHandler,
  toggleTheme,
  setToggleTheme,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    queryHandler(query);
    // eslint-disable-next-line
  }, [query]);

  return (
    <article className={`${toggleTheme ? "navbar-light" : "navbar-dark"}`}>
      <div className="navbar-search">
        <img src="./unsplash.png" alt="" />
        <input
          type="text"
          placeholder="Your Query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className={`${toggleTheme ? "light" : "dark"}`}
        />
        <button
          type="submit"
          onClick={submitHandler}
          className={`${toggleTheme ? "light" : "dark"}`}
        >
          Search
        </button>
      </div>
      <div className="navbar-logotext">
        <input
          type="checkbox"
          className="navbar-logotext-toggle"
          id="navbar-logotext-toggle"
          onClick={() => setToggleTheme((prev) => !prev)}
        />
        <label
          htmlFor="navbar-logotext-toggle"
          className="navbar-logotext-label"
        >
          <BsMoonFill
            style={{
              color: "pink",
            }}
          />
          <BsSunFill
            style={{
              color: "yellow",
            }}
          />
          <div className="ball"></div>
        </label>
        <h3
          className={`${
            toggleTheme
              ? "navbar-logotext-titlelight"
              : "navbar-logotext-titledark"
          }`}
        >
          Unsplash
        </h3>
      </div>
    </article>
  );
};

export default Navbar;
