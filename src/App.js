import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import BookUpload from "./components/UploadBook";
import MyUploadedBooks from "./components/MyUploadedBooks";
import Chat from "./components/chat";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<BookUpload />} />
        <Route path="/my-uploaded-books" element={<MyUploadedBooks />} />
        <Route path="/book-chat/:bookId" element={<Chat/>} />
      </Routes>
    </Router>
  );
};

export default App;
