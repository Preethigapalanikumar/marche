import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from 'next/link';
import '../css/TopicList.css';

const getNewsEvents = async () => {
    try {
        const res = await fetch(`http://localhost:${process.env.PORT}/api/newsnEvent/index`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Can't fetch news & events!");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching news & events:", error);
        return [];
    }
};

export default async function NewsnEventsList() {
    const data = await getNewsEvents();
    const posts = data?.posts || [];

    return (
        <>
            {posts.map((t) => (
                <div key={t._id} className="topic-container">
                    <div>
                        <img src={t.imageUrl || '/default-image.png'} alt="News Image" />
                        <h2 className="topic-title">{t.topic}</h2>
                        <div>{t.content}</div>
                        <div>{t.link}</div>
                    </div>

                    <div className="topic-actions">
                        <RemoveBtn id={t._id} imageUrl={t.imageUrl} />
                        <Link href={`/dashboard/EditNewsnEvent/${t._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}
