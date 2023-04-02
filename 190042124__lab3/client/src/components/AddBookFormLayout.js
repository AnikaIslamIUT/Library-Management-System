import axios from "axios";
import React, { useState } from "react";
import { useNavigate,NavLink } from "react-router-dom";

export default function AddBookFormLayout() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [nameError, setNameError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [bookList, setBookList] = useState([]);

  const navigate =useNavigate();


  const addBook = () => {
    axios
      .post("http://localhost:3001/insert", {
        name: name,
        author: author,
        genre: genre,
      })

      setBookList([
        ...bookList,
        {name:name,author:author,genre:genre}
      ])
      setTimeout(()=> navigate("/bookList"),500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let nameRegex = /^[a-zA-Z]+$/;
  
  let isFormValid = true;

  if (!name) {
    setNameError("Please enter a name");
    isFormValid = false;
  } else if (!nameRegex.test(name)) {
    setNameError("Please enter a valid name with combination of A-Z and a-z.");
    isFormValid = false;
  } else {
    setNameError("");
  }
  
  if (!author) {
    setAuthorError("Please enter an author name");
    isFormValid = false;
  } else {
    let authorWords = author.split(" ");
    if (authorWords.length < 2) {
      setAuthorError("Please enter at least two words for author");
      isFormValid = false;
    } else {
      setAuthorError("");
    }
  }
  
  if (!genre) {
    setGenreError("Please select a genre");
    isFormValid = false;
  } else {
    setGenreError("");
  }
  
  // Validate form inputs
  if (isFormValid) {
    console.log("Form submitted");
    console.log(e);
    addBook(); // Call the function to submit the data to the database
  } else {
    console.log("Please fill out all fields");
  }
};

  return (
    <div className="container" style={{ margin: "5%" }}>
      <div class="row g-3">
        <form onSubmit={handleSubmit}>
          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Name :{" "}
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                class="form-control"
                id="inputEmail3"
              />
               <div className="text-danger">{nameError}</div>
            </div>
          </div>
          
          <br />
          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Author :
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                class="form-control"
                id="inputEmail3"
              />
               <div className="text-danger">{authorError}</div>
            </div>
          </div>

          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Genre :
            </label>
            <div class="col-sm-10">
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                style={{ width: "100%", height: "100%" }}
              >
                <option value="">Select Genre</option>
                <option value="fiction">Fiction</option>
                <option value="novel">Novel</option>
                <option value="non-fiction">Non-fiction</option>
              </select>
              <div className="text-danger">{genreError}</div>
            </div>
          </div>
          <div className="button" style={{ textAlign: "center" }}>
         
            <button type="submit" onClick={handleSubmit } class="btn btn-info">
              Add
            </button>
            
          </div>
        </form>

        <NavLink to="/bookList">
          {" "}
          <button type="button" class="btn btn-primary">
            Show books
          </button>
        </NavLink>
      </div>
    </div>
  );
}
