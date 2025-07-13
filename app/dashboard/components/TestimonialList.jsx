
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from 'next/link';
import '../css/TopicList.css';

const getTestimonials = async () => {
    try {
        const res = await fetch(`http://localhost:${process.env.PORT}/api/testimonial/index`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Can't fetch testimonials!");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
};

export default async function TestimonialList() {
    const data = await getTestimonials();
    const posts = data?.posts || [];

    return (
        <>
            {posts.map((t) => (
                <div key={t._id} className="topic-container">
                    <div>
                        <img src={t.imageUrl || '/default-image.png'} alt="Testimonial Image" />
                        <h2 className="topic-title">{t.topic}</h2>
                        <div>{t.content}</div>
                        <div>{t.link}</div>
                    </div>

                    <div className="topic-actions">
                        <RemoveBtn id={t._id} imageUrl={t.imageUrl} />
                        <Link href={`/dashboard/EditTestimonial/${t._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}
