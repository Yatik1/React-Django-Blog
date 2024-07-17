import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/authcontexts";
import { useEffect, useState } from "react";
import axios from "axios";
import { IKImage, IKContext } from 'imagekitio-react';
import { urlEndpoint, publicKey } from '../imagekit/imagekitConfig'

function Blog({ title, body, date, isConnected,url, id, called }) {

    
    const { currentUser } = useAuth()
    const [error, setError] = useState(null)

    function extractDate(isoString) {
        const date = new Date(isoString);
        return date.toISOString().split('T')[0];
    }

    // async function handleDelete() {
    //     if (!currentUser) {
    //         throw new Error('User is not authenticated');
    //     }
    //     const idToken = await currentUser.getIdToken(true);

    //     axios.delete(`http://localhost:8000/deleteblog/${id}`,{
    //         headers: {
    //             Authorization: `Bearer ${idToken}`
    //         }
    //     })
    //         .then(
    //             (response) => {
    //                 setError('')
    //             }
    //         )
    //         .then(
    //             (error) => {
    //                 console.error(error)
    //             }
    //         )
    // }

    const Navigate = useNavigate()
    const redirectToPath = (path) => {
        Navigate(path);
    };

    const shortText = (text) => {
        if (text.length > 100) {
            return text.substring(0, 100) + '...'; // Get first 100 characters with ellipsis
        } else {
            return text; // If text is shorter, return it as-is
        }
    };
    return (
        <IKContext urlEndpoint={urlEndpoint}>
            <div className='blog' onClick={() => { called != 'profile' && redirectToPath(`../singleblog/${id}`) }} >
                <div className='image-div'>
                    <IKImage
                        urlEndpoint={urlEndpoint}
                        src= {url}
                        style={{ 'height': '100%', 'width': '100%' }}
                    />
                </div>

                <div className='content-div' style={{padding:'1rem'}}>
                    <h1 className='blog-title'>{(title)}</h1>
                    <p className='date'>{extractDate(date)}</p>
                    <p className='blog-brief' style={{overflow:'hidden'}}>
                        {shortText(body)}                        
                    </p>
                </div>
            </div>

            {/* <div className="blog-btn">
            {called == 'profile' && (
                <>
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    <button className="edit-btn" onClick={() => { redirectToPath(`../editblog/${id}`) }}>Edit</button>
                </>
            )
            }
            </div> */}
        </IKContext>
    )
}
export default Blog