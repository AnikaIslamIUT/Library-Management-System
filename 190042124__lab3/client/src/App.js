import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBookFormLayout from "./components/AddBookFormLayout";
import BookListLayout from "./components/BookListLayout";
import UpdateBookFormLayout from "./components/UpdateBookFormLayout";
import UserManagement from "./components/UserManagement";
function App() {
  return (
    <Router>
        <Routes>
         
          {/* //User Pages */}
          <Route path="/" element={<AddBookFormLayout />} />
          <Route path="/bookList" element={<BookListLayout />} />
          <Route path="/updateBook/:id" element={<UpdateBookFormLayout />} />
          <Route path="/users" element={<UserManagement />} />
          </Routes>
    </Router>
  )
}

export default App;
