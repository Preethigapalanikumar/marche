'use client';

import '../css/vidoe.css';
import { useEffect, useState } from 'react';
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

export default function VideoHomePage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/videoCat/index');
        const { posts } = await res.json();
        setCategories(posts);
        if (posts.length > 0) {
          const firstCat = posts[0];
          const firstSub = firstCat.subcategories[0];
          setSelectedCategory(firstCat);
          setSelectedSubcategory(firstSub);
        }
      } catch (error) {
        console.error('Failed to fetch video categories:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      fetch(`/api/video-categories/get-videos/${selectedCategory.category}/${selectedSubcategory.name}`)
        .then(res => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const matchedSub = data[0].subcategories[0];
            setVideos(matchedSub.videos || []);
          } else {
            setVideos([]);
          }
        })
        .catch((err) => {
          console.error('Error fetching videos:', err);
          setVideos([]);
        });
    }
  }, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (catName) => {
    const cat = categories.find(c => c.category === catName);
    if (cat) {
      setSelectedCategory(cat);
      setSelectedSubcategory(cat.subcategories[0]);
    }
  };

  const handleSubcategoryChange = (subName) => {
    const sub = selectedCategory.subcategories.find(s => s.name === subName);
    if (sub) {
      setSelectedSubcategory(sub);
    }
  };

  const removeVideo = async (videoName, imageUrl) => {
    if (!imageUrl) {
    console.error("Cannot delete video because imageUrl is missing for:", videoName);
    return;
  }
    const confirmed = confirm("Are you sure you want to delete this video?");
    if (!confirmed) return;

    const fileName = imageUrl.split('/').pop();
    try {
      // await fetch(`/api/images?filename=${fileName}`, {
      //   method: 'DELETE',
      // });
console.log("category "+selectedCategory.category+" subcategory "+selectedSubcategory+" videoname "+videoName)
      const res = await fetch('/api/video-categories/delete-video', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category: selectedCategory.category,
          subcategory: selectedSubcategory.name,
          videoName
        })
      }
      
    );

    if(!res.ok)
      {
        console.log("erorr")
      }

      // Refresh video list after deletion
      setVideos((prev) => prev.filter(v => v.name !== videoName));
    } catch (err) {
      console.error('Failed to remove video:', err);
    }
  };

  return (
    <div>
      <h1>🎬 Latest Videos</h1>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => handleCategoryChange(cat.category)}
            style={{
              backgroundColor: selectedCategory?.category === cat.category ? '#0070f3' : '#eee',
              color: selectedCategory?.category === cat.category ? '#fff' : '#000',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Subcategory Dropdown */}
      {selectedCategory && (
        <select
          onChange={(e) => handleSubcategoryChange(e.target.value)}
          value={selectedSubcategory?.name}
          style={{ padding: '0.5rem', marginBottom: '1.5rem' }}
        >
          {selectedCategory.subcategories.map(sub => (
            <option key={sub._id} value={sub.name}>{sub.name}</option>
          ))}
        </select>
      )}

      {/* Video Cards */}
      <div className="video-grid">
        {videos.length > 0 ? videos.map(video => (
          <div key={video._id} className="video-card">
            <img src={video.thumbnail} alt={video.name} className="video-thumbnail" />
            <h3>{video.name}</h3>
            <p><a href={video.link} target="_blank" rel="noopener noreferrer">📺 Watch</a></p>

            <div className="video-actions">
              <button onClick={() => removeVideo(video.name, video.thumbnail)} className="action-btn danger">
                <HiOutlineTrash size={20} />
              </button>
             
            <Link href={`/dashboard/EditVideoForm/${selectedCategory.category}/${selectedSubcategory.name}/${video.name}`}>
              <button className="action-btn edit">
                <HiPencilAlt size={20} />
              </button>
            </Link>
            </div>
          </div>
        )) : <p>No videos available for this subcategory.</p>}
      </div>
    </div>
  );
}
