import Link from 'next/link';
import VideoHomePage from '../components/VideoHomePage';
import Navbar from '../components/Navbar';

export default function VideosPage() {
  return (
    <div>
      <Navbar/>
      <div className="section-header">
        <h2>Videos</h2>
        <Link href="/dashboard/AddVideos" className="add-btn">+ Add Video</Link>
      </div>
      <VideoHomePage />
    </div>
  );
}
