'use client';
import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    if (!file || !topic || !content || !link) {
      alert("Please fill all fields including the image");
      return;
    }

    try {
      // Step 1: Upload Image
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload?folder=posts', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.imageUrl;

      // Step 2: Create Post
      const postRes = await fetch('/api/posts/index', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          link,
          imageUrl, // ← image path saved in DB
          content,
        }),
      });

      if (postRes.ok) {
        alert('Post created successfully!');
        // Optionally reset form
        setFile(null);
        setPreview(null);
        setTopic('');
        setContent('');
        setLink('');
      } else {
        alert('Failed to create post.');
      }

    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Add New Post</h2>
      <input
        type="file"
        onChange={handleChange}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '100%' }} />}
      
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
      />
      <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
      />

      <button onClick={handleSubmit}>Submit Post</button>
    </div>
  );
}
