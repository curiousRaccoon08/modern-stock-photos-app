import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Photo from "./Photo";
const clientID = `?client_id=PPdRsWv8spvgxbzmBPw60HNj_aMNEGNeTbhZS1P5Wvg`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState(false);
  const mounted = useRef(false);
  const [page, setPage] = useState(1);
  const [toggleTheme, setToggleTheme] = useState(true);

  useEffect(() => {
    if (toggleTheme) {
      document.body.style.backgroundColor = "white";
    } else {
      document.body.style.backgroundColor = "#181818";
    }
  }, [toggleTheme]);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const queryPage = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${queryPage}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((prevdata) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...prevdata, ...data.results];
        }
        return [...prevdata, ...data];
      });
      console.log(photos);
      setNewPhotos(false);
      setLoading(false);
    } catch (error) {
      setNewPhotos(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newPhotos) return;
    if (loading) return;
    setPage((prev) => prev + 1);
    // eslint-disable-next-line
  }, [newPhotos]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewPhotos(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  const queryHandler = (value) => {
    setQuery(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
    }
    setPage(1);
  };

  return (
    <main className="App">
      <section className="navbar-sticky">
        <Navbar
          queryHandler={queryHandler}
          submitHandler={submitHandler}
          toggleTheme={toggleTheme}
          setToggleTheme={setToggleTheme}
        />
      </section>
      <section className="photos">
        {photos.map((photo, index) => {
          return <Photo {...photo} key={index} />;
        })}
      </section>
      {loading && (
        <h2 className={`${toggleTheme ? "loadinglight" : "loadingdark"}`}>
          Loading...
        </h2>
      )}
    </main>
  );
}

export default App;
