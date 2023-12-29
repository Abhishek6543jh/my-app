import React, { useState } from 'react';
import { storage, db, auth } from '../config/firebase'; // Assuming 'auth' is your Firebase authentication instance
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookUpload = () => {
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    publisher: '',
    publishedDate: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setBookDetails((prevDetails) => ({ ...prevDetails, image }));
  };

  const handleUpload = async () => {
    try {
      setLoading(true);

      const { title, author, publisher, publishedDate, image } = bookDetails;

      const storageRef = ref(storage, `bookImages/${image.name}`);
      const uploadTask = uploadBytes(storageRef, image);

      uploadTask
        .then(async (snapshot) => {
          const imageUrl = await getDownloadURL(snapshot.ref);

          // Use currentUser to access the currently authenticated user
          const currentUser = auth.currentUser;

          const booksRef = collection(db, 'books');
          await addDoc(booksRef, {
            title,
            author,
            publisher,
            publishedDate,
            imageUrl,
            userId: currentUser.uid,
            displayName: currentUser.displayName,
            userPic: currentUser.photoURL,
          });

          setBookDetails({
            title: '',
            author: '',
            publisher: '',
            publishedDate: '',
            image: null,
          });

          setLoading(false);

          toast.success('Book uploaded successfully!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        })
        .catch((error) => {
          console.error('Error uploading image:', error.message);
          setLoading(false);

          toast.error(`Error uploading image: ${error.message}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });
        });
    } catch (error) {
      console.error('Error uploading book:', error.message);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload Book</h2>
      <form className="space-y-4">
        <label className="block text-white">
          <span>Title:</span>
          <input
            type="text"
            name="title"
            value={bookDetails.title}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        <label className="block text-white">
          <span>Author:</span>
          <input
            type="text"
            name="author"
            value={bookDetails.author}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        <label className="block text-white">
          <span>Publisher:</span>
          <input
            type="text"
            name="publisher"
            value={bookDetails.publisher}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        <label className="block text-white">
          <span>Published Date:</span>
          <input
            type="text"
            name="publishedDate"
            value={bookDetails.publishedDate}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        <label className="block text-white">
          <span>Image:</span>
          <div className="mt-1 p-2 border rounded-md w-full text-black bg-white focus:outline-none focus:ring focus:border-blue-300">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="inline-block cursor-pointer">
              {bookDetails.image ? bookDetails.image.name : 'No file chosen'}
            </span>
          </div>
        </label>

        {/* Loading message */}
        {loading && <p className="text-white">Please wait, uploading...</p>}

        <button
          type="button"
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Upload Book
        </button>
      </form>
    </div>
  );
};

export default BookUpload;
