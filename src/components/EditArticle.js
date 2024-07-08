// src/components/EditArticle.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// styles
import './edit.css'

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      const ref = doc(db, 'articles', id);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setAuthor(data.author);
        setDescription(data.description);
      } else {
        console.log('No such article!');
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = doc(db, 'articles', id);
    await updateDoc(ref, {
      title,
      author,
      description,
    });
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };


  return (
    <div className="edit">
      <form onSubmit={handleSubmit}>

<label>
  <span>Title:</span>
  <input 
    type="text" 
    onChange={(e) => setTitle(e.target.value)}
    value={title}
    required
  />
</label>

<label>
  <span>Author:</span>
  <input 
    type="text" 
    onChange={(e) => setAuthor(e.target.value)}
    value={author}
    required
  />
</label>

<label>
  <span>Description:</span>
  <textarea 
    onChange={(e) => setDescription(e.target.value)}
    value={description}
    required
  />
</label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleCancel}>Cancel Edit</button>
      </form>
    </div>
  );
};

export default EditArticle;
