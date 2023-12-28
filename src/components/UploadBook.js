// src/components/BookUpload.js

import React, { useState } from 'react';
import { storage, db } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const BookUpload = () => {
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    publisher: '',
    publishedDate: '',
    image: null,
  });
  const [progress, setProgress] = useState(0);

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
      const { title, author, publisher, publishedDate, image } = bookDetails;
  
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `bookImages/${image.name}`);
      const uploadTask = uploadBytes(storageRef, image);
  
      uploadTask
        .then(async (snapshot) => {
          const imageUrl = await getDownloadURL(snapshot.ref);
  
          // Add book details and image URL to Firestore
          const booksRef = collection(db, 'books');
          await addDoc(booksRef, {
            title,
            author,
            publisher,
            publishedDate,
            imageUrl,
          });
  
          // Reset form
          setBookDetails({
            title: '',
            author: '',
            publisher: '',
            publishedDate: '',
            image: null,
          });
  
          setProgress(0);
  
          console.log('Book uploaded successfully!');
        })
        .catch((error) => {
          console.error('Error uploading image:', error.message);
        });
    } catch (error) {
      console.error('Error uploading book:', error.message);
    }
  };
  

  return (
    <div>
      <h2>Upload Book</h2>
      <form>
        <label>
          Title:
          <input type="text" name="title" value={bookDetails.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Author:
          <input type="text" name="author" value={bookDetails.author} onChange={handleChange} />
        </label>
        <br />
        <label>
          Publisher:
          <input type="text" name="publisher" value={bookDetails.publisher} onChange={handleChange} />
        </label>
        <br />
        <label>
          Published Date:
          <input type="text" name="publishedDate" value={bookDetails.publishedDate} onChange={handleChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="button" onClick={handleUpload}>
          Upload Book
        </button>
      </form>
      <div>{progress}% Uploaded</div>
    </div>
  );
};

export default BookUpload;
