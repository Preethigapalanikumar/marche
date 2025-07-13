import EditTopicForm from "../../components/EditTopicForm";

const getTopicByid = async (id) =>{
    try {
        const res = await fetch(`http://localhost:${process.env.PORT}/api/posts/${id}`, { cache: "no-store" });
        if(!res.ok)
        {
            throw new Error('cant fetch');
        }
        return res.json();
    } catch (error) {
        console.log(error)
        return [];
        
    }
}


export default async function EditPost({ params }) {
    const awaitedParams = await params;  // 🛠️ await first
    const { id } = awaitedParams;
    const { posts } = await getTopicByid(id); // topics will come properly

    if (!posts) {
        return <div>No topic found</div>; // handle if topic not found
    }

    const { topic,link , content,imageUrl} = posts; // now no error

    return <EditTopicForm id={id} title={topic} content={content} imageUrl={imageUrl} link={link} /> ;
}
