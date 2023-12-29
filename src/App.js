import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import BookUpload from "./components/UploadBook";
import MyUploadedBooks from "./components/MyUploadedBooks";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<BookUpload />} />
        <Route path="/my-uploaded-books" element={<MyUploadedBooks />} />
      </Routes>
    </Router>
  );
};

export default App;
