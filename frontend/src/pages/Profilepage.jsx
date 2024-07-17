import { useEffect, useState } from "react";
import Blog from "../components/Blog";
import Navbar from "../components/navbar";
import axios from "axios";
import { useAuth } from "../contexts/authcontexts";

function Profilepage() {
    
    const {currentUser} = useAuth()
    const [userBlogs,setUserBlogs] = useState([])
    const [error,setError] = useState('')
    useEffect(()=>{
        const fetchBlog = async () => {
            try{
                if (!currentUser) {
                    throw new Error('User is not authenticated');
                }
                const idToken = await currentUser.getIdToken(true);
                axios.get(`http://localhost:8000/getuserblogs/${currentUser.email}`,{
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        
                    }
                })
                .then((response) => {
                    setError('')
                setUserBlogs(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setError(error);
                });
            }
            catch(error){
                console.error(error)
            }
        }
        fetchBlog()
    },[userBlogs])

    return (
        <>
            <Navbar />
            <div className="container" style={{flexDirection:'column'}}>
                <h1>user blogs </h1>
                <div className='blogs'>
                {userBlogs.map(blog => (
                    <Blog key={blog.id} title = {blog.title} body={blog.body} date = {blog.created_on} url={blog.url} id = {blog.id} called={'profile'}/>
                ))}
                </div>
            </div>
            <footer>
                <div className='footer-container'>
                    <p>@BuggsBunny</p>
                </div>
            </footer>
        </>
    )
}

export default Profilepage