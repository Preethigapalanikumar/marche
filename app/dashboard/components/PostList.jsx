
import RemoveBtn from "./RemoveBtn";
import  { HiPencilAlt } from "react-icons/hi";
import Link  from 'next/link'
import '../css/TopicList.css'
const getTopics =async () => {
    try {
     const res = await fetch(`http://localhost:${process.env.PORT}/api/posts/index`,{
         cache:"no-store",
     });
     if(!res.ok)
     {
         throw new Error ("cant fetch!!");
     }
 
     return await  res.json();
    } catch (error) {
     console.log("error in fetching!",error);
     return [];
    }
     
 }


 export default async function PostList() {
    const { posts } = await getTopics();

    return (
        <>
            {posts.map((t) => (
                <div key={t._id} className="topic-container">
                    <div>
                    <img src={t.imageUrl} alt="Post Image"  />

                        <h2 className="topic-title">{t.topic}</h2>
                        <div>{t.content}</div>
                        <div>{t.link}</div>
                        <div></div>
                    </div>

                    <div className="topic-actions">
                        <RemoveBtn id={t._id} imageUrl={t.imageUrl}/>
                        <Link href={`/dashboard/EditPost/${t._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}