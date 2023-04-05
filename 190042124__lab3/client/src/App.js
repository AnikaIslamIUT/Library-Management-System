import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBookFormLayout from "./components/AddBookFormLayout";
import BookListLayout from "./components/BookListLayout";
import UpdateBookFormLayout from "./components/UpdateBookFormLayout";
import Registration from "./components/Registration";
import BorrowBookFormLayout from "./components/BorrowBookFormLayout";
import UserBookList from "./components/UserBookList";
import Login from "./components/Login";
function App() {
  return (
    <Router>
        <Routes>
         
          {/* //User Pages */}
          <Route path="/" element={<AddBookFormLayout />} />
          <Route path="/bookList" element={<BookListLayout />} />
          <Route path="/updateBook/:id" element={<UpdateBookFormLayout />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/borrowBook/:id" element={<BorrowBookFormLayout />} />
          <Route path="/userbookList/:id" element={<UserBookList/>} />
          </Routes>
    </Router>
  )
}

export default App;
