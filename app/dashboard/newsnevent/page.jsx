import Link from 'next/link';
import NewsnEventList from '../components/NewsnEventList';
import Navbar from '../components/Navbar';

export default function NewsEventPage() {
  return (
    <div>
      <Navbar/>
      <div className="section-header">
        <h2>News & Events</h2>
        <Link href="/dashboard/AddNewsnEvent" className="add-btn">+ Add News/Event</Link>
      </div>
      <NewsnEventList />
    </div>
  );
}
