import Link from 'next/link';
import TestimonialList from '../components/TestimonialList';
import Navbar from '../components/Navbar';

export default function TestimonialsPage() {
  return (
    <div>
            <Navbar/>
      <div className="section-header">
        <h2>Testimonials</h2>
        <Link href="/dashboard/AddTestimonial" className="add-btn">+ Add Testimonial</Link>
      </div>
      <TestimonialList />
    </div>
  );
}
