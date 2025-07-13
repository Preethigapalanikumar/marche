import Link from 'next/link';
import React from 'react';
import '../css/Navbar.css'; // Import the CSS file

export default function Navbar() {
    return (
        <nav className="navbar-container">
            <Link className="navbar-item" href="/dashboard">Marche Dashboard</Link>
            <Link className="navbar-link" href="/dashboard/posts">Post</Link>
            <Link className="navbar-link" href="/dashboard/videos">Vidoes</Link>
            <Link className="navbar-link" href="/dashboard/testimonial">Testimonials</Link>
            <Link className="navbar-link" href="/dashboard/newsnevent">News and Events</Link>
        </nav>
    );
}
