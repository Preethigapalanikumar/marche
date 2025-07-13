'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './css/AddTopicForm.css';

export default function AddVideoForm() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: '',
    title: '',
    description: ''
  });
  const [newSubcategory, setNewSubcategory] = useState('');

  const [videoTitle, setVideoTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/videoCat/index');
      const data = await res.json();
      setCategories(data?.posts || []);
    };
    fetchCategories();
  }, []);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoTitle || !videoLink || !thumbnail) {
      alert("All fields required including thumbnail");
      return;
    }

    try {
      // Upload thumbnail
      const formData = new FormData();
      formData.append('file', thumbnail);
      const uploadRes = await fetch('/api/upload?folder=video-thumbnails', {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();
      const thumbnailUrl = uploadData.imageUrl;

      // Prepare request
      const payload = {
        category: selectedCategoryId,
        subcategory: selectedSubcategoryId,
        video: {
          name: videoTitle,
          link: videoLink,
          thumbnail: thumbnailUrl
        }
      };

      const res = await fetch('/api/video-categories/add-video', {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Video added!");
        router.push('/dashboard');
      } else {
        alert("Failed to add video");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    }
  };

  const addCategory = async () => {
    if (!newCategory.name) return;
    
    const res = await fetch('/api/video-categories/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        category: newCategory.name,
        title: newCategory.title,
        description: newCategory.description
      })
    });
    
    const data = await res.json();
    setCategories([...categories, data.category]);
    setSelectedCategoryId(data.category.category);
    setNewCategory({
      name: '',
      title: '',
      description: ''
    });
  };

  const addSubcategory = async () => {
    if (!newSubcategory || !selectedCategoryId) return;
    
    const res = await fetch('/api/video-categories/add-subcategory', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        categoryId: selectedCategoryId, 
        subcategoryName: newSubcategory 
      })
    });
    
    const updated = await res.json();
    const updatedCats = categories.map(c => c._id === updated.updated._id ? updated.updated : c);
    setCategories(updatedCats);
    setSelectedSubcategoryId(newSubcategory);
    setNewSubcategory('');
  };

  const selectedCategory = categories.find(c => c.category === selectedCategoryId);
  const subcategories = selectedCategory?.subcategories || [];

  return (
    <form onSubmit={handleSubmit} className="add-topic-form">
      <h2>Add Video</h2>

      {/* Category Selection */}
      <label>Category</label>
      <div className="category-selection">
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="add-topic-input"
        >
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
             <option key={cat._id} value={cat.category}>{cat.category}</option>
          ))}
        </select>
        
        <div className="new-category-form">
          <h4>Add New Category</h4>
          <input
            type="text"
            placeholder="Category Name (ID)"
            value={newCategory.name}
            onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Display Title"
            value={newCategory.title}
            onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
          />
          <textarea
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
          />
          {/* <input
            type="text"
            placeholder="Background Video URL"
            value={newCategory.backgroundVideo}
            onChange={(e) => setNewCategory({...newCategory, backgroundVideo: e.target.value})}
          /> */}
          <button type="button" onClick={addCategory}>Add Category</button>
        </div>
      </div>

      {/* Subcategory Selection */}
      <label>Subcategory</label>
      <div className="subcategory-selection">
        <select
          value={selectedSubcategoryId}
          onChange={(e) => setSelectedSubcategoryId(e.target.value)}
          className="add-topic-input"
        >
          <option value="">-- Select Subcategory --</option>
          {subcategories.map(sub => (
            <option key={sub._id} value={sub.name}>{sub.name}</option>
          ))}
        </select>
        
        <div className="new-subcategory-form">
          <input
            type="text"
            placeholder="New subcategory name"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
          />
          <button type="button" onClick={addSubcategory}>Add Subcategory</button>
        </div>
      </div>

      {/* Video Fields */}
      <div className="video-fields">
        <input
          type="text"
          placeholder="Video Title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          className="add-topic-input"
          required
        />
        <input
          type="text"
          placeholder="Video Link (URL)"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="add-topic-input"
          required
        />
      </div>

      {/* Thumbnail Upload */}
      <div className="thumbnail-upload">
        <label>Thumbnail Image</label>
        <input 
          type="file" 
          onChange={handleThumbnailChange} 
          accept="image/*"
          required
        />
        {preview && (
          <div className="thumbnail-preview">
            <img src={preview} alt="preview" />
          </div>
        )}
      </div>

      <button type="submit" className="add-topic-button">Submit Video</button>
    </form>
  );
}