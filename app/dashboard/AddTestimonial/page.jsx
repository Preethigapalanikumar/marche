'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './css/AddTopicForm.css'
export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [username, setUsername] = useState('');
  const [position, setPosition] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const router = useRouter('');
  
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !username || !content ||!position|| !link) {
      alert("Please fill all fields including the image");
      return;
    }

    try {
      // Step 1: Upload Image
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload?folder=post', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.imageUrl;

      // Step 2: Create Post
      const postRes = await fetch('/api/testimonial/index', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          position,
          link,
          imageUrl, // ← image path saved in DB
          content,
        }),
      });

      if (postRes.ok) {
        alert('Testimonial created successfully!');
        // Optionally reset form
        setFile(null);
        setPreview(null);
        setUsername('');
        setPosition("");
        setContent('');
        
        setLink('');

        router.push('/dashboard');
      } else {
        alert('Failed to create post.');
      }

    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong.');
    }
  };

  return (
   <form onSubmit={handleSubmit} className="add-topic-form">
      <h2>Add New Testimonial</h2>
      <input
        type="file"
        onChange={handleChange}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '100%' }} />}
      
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="add-topic-input"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="add-topic-input"
      />
      <input
        type="text"
        placeholder="Designation"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="add-topic-input"
      />
      <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
       className="add-topic-input"
      />

      <button  className="add-topic-button">Submit</button>
      </form>
  );
}
