import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBookFormLayout from "./components/AddBookFormLayout";
import BookListLayout from "./components/BookListLayout";
import UpdateBookFormLayout from "./components/UpdateBookFormLayout";
function App() {
  return (
    <Router>
        <Routes>
         
          {/* //User Pages */}
          <Route path="/" element={<AddBookFormLayout />} />
          <Route path="/bookList" element={<BookListLayout />} />
          <Route path="/updateBook/:id" element={<UpdateBookFormLayout />} />
          </Routes>
    </Router>
  )
}

export default App;
