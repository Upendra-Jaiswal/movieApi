import React, { useRef, useState } from "react";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
  const [title, setTitle] = useState("");
  const [openingText, setopeningText] = useState("");
  const [releaseDate, setreleaseDate] = useState("");

  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(movie);
    setTitle("");
    setopeningText("");
    setreleaseDate("");
  }

  const titleHandler = (event) => {
    setTitle(event.target.value);
    
  };

  const openTextHandler = (event) => {
    setopeningText(event.target.value);
  };

  const releaseHandler = (event) => {
    setreleaseDate(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          onChange={titleHandler}
          value={title}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea
          rows="5"
          id="opening-text"
          ref={openingTextRef}
          onChange={openTextHandler}
          value={openingText}
        ></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input
          type="text"
          id="date"
          ref={releaseDateRef}
          onChange={releaseHandler}
          value={releaseDate}
        />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
