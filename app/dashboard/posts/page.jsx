import Link from 'next/link';
import PostList from '../components/PostList';
import Navbar from '../components/Navbar';

export default function PostsPage() {
  return (
    <div>
      <Navbar/>
      <div className="section-header">
        <h2>Posts</h2>
        <Link href="/dashboard/AddPost" className="add-btn">+ Add Post</Link>
      </div>
      <PostList />
    </div>
  );
}
