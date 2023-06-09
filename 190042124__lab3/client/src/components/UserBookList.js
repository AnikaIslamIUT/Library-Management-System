/* eslint-disable no-template-curly-in-string */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";

export default function BookListLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [bookList, setBookList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/bookList").then((response) => {
      setBookList(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  let currentBooks = bookList.slice(indexOfFirstBook, indexOfLastBook);

  if (searchTerm) {
    currentBooks = currentBooks.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filter) {
    currentBooks = currentBooks.filter(
      (book) =>
        book.name.toLowerCase().includes(filter.toLowerCase()) ||
        book.author.toLowerCase().includes(filter.toLowerCase()) ||
        book.genre.toLowerCase().includes(filter.toLowerCase()) 
    );
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(currentBooks.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((response) => {
        setBookList(bookList.filter((book) => book.id !== id));
        setTimeout(() => navigate("/bookList"), 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Book List</h2>
      <div className="row mb-3">
        <div className="col-sm-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by book name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-sm-6">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by name, author, genre"
            value={filter}
            onChange={handleFilter}
          />
        </div>
      </div>
      <table className="table" style={{ margin: "5%" }}>
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
                <th scope="row">{index + 1}</th>
                <td>{book.name}</td>
                <td>{book.author}</td>

                <td>{book.genre}</td>
                
                <td>
                <Link to={`/borrowBook/${book.id}`} >
                
                  <button
                    type="button"
                    class="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Borrow
                  </button>
                  </Link>

                  
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
       
        
      </div>
    </div>
  );
}
