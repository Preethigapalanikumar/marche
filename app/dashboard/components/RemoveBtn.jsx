'use client'
import { HiOutlineTrash } from "react-icons/hi";
import Link from "next/link";
import '../css/UpdateForm.css'
export default function RemoveBtn({id,imageUrl}) {
    const removeTopic = async () => {
        const confirmed =confirm( 'are you sure');
        if(confirmed)
        {
            const Filename = imageUrl.split('/').pop(); 
            await fetch(`/api/images?filename=${Filename}`, {
                method: 'DELETE',
              });
            await fetch(`api/posts/${id}`,{
                method:"DELETE",
        })
        }
            };
    return <button onClick={removeTopic} className="remove-button">
        <HiOutlineTrash size={24} />
    </button>;
}