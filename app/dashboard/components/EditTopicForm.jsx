'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import '../css/UpdateForm.css';

export default function EditTopicForm({ id, link,title, content, imageUrl }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(content);
  const [newFile, setNewFile] = useState(null);
  const [preview, setPreview] = useState(imageUrl); // Show existing image
  const [newImageUrl,setNewImageUrl] = useState(imageUrl);
  const [newlink,setNewLink] = useState(link);
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setNewFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedImageUrl = imageUrl; // Start with the existing image

      if (newFile) {
        // Step 1: Delete old image
        const oldFilename = imageUrl.split('/').pop(); // get filename from URL
        await fetch(`/api/images?filename=${oldFilename}`, {
          method: 'DELETE',
        });

        // Step 2: Upload new image
        const formData = new FormData();
        formData.append('file', newFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();
        updatedImageUrl = uploadData.imageUrl; // new uploaded image
      }

      // Step 3: Update post
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          newTitle,
          newDescription,
          newlink,
          updatedImageUrl, // Send updated image URL
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update');
      }
     router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-form">
    <input
      type="file"
      onChange={handleFileChange}
      className="update-input"
    />
    {preview && (
      <img src={preview} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
    )}
      
    <input 
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="update-input"
        type="text"
        placeholder="Topic title"
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="update-input"
        type="text"
        placeholder="Topic description"
      />
      <input 
        onChange={(e) => setNewLink(e.target.value)}
        value={newlink}
        className="update-input"
        type="text"
        placeholder="Topic link"
      />
     
      <button className="update-button" onClick={handleSubmit}>Update topic</button>
    </form>
  );
}
