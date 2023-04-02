/* eslint-disable no-template-curly-in-string */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate, Link, NavLink } from "react-router-dom";

export default function BookListLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [bookList, setBookList] = useState([]);

  const navigate =useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/bookList").then((response) => {
      setBookList(response.data);
    });
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookList.slice(indexOfFirstBook, indexOfLastBook);

console.log(currentBooks)
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(bookList.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
       
      .then((response) => {
        setBookList(bookList.filter((book) => book.id !== id));
        setTimeout(()=> navigate("/bookList"),500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Book List</h2>
      <table class="table" style={{ margin: "5%" }}>
        <thead>
          <tr>
            <th scope="col">#SL</th>
            <th scope="col">Name</th>
            <th scope="col">Author</th>
            <th scope="col">Genre</th>
            <th scope="col-2" style={{ textAlign: "center" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => {
            return (
              <tr key={book.id}>
                <th scope="row">{index+1}</th>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                <Link to={`/updateBook/${book.id}`} >
                
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Update
                  </button>
                  </Link>

                  
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteBook(book.id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div class="container " style={{ marginBottom: "10%" }}>
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <button
                    onClick={() => setCurrentPage(number)}
                    className="btn btn-outline-dark"
                    style={{ marginRight: "10px" }}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
       
        <NavLink to="/">
          <button type="submit" class="btn btn-info">
            Add more
          </button>
        </NavLink>
      </div>
    </div>
  );
}
