import { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../contexts/authcontexts';
import { IKContext, IKUpload } from 'imagekitio-react';
import { publicKey, urlEndpoint } from "../imagekit/imagekitConfig";
import Navbar from "../components/navbar";

function NewBlog() {
    const { currentUser } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const files = event.dataTransfer.files;
        if (files.length > 0) {
            fileInputRef.current.files = files;
            fileInputRef.current.dispatchEvent(
                new MouseEvent('change', { bubbles: true })
            );
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title || !content) {
            alert("Please provide both title and content.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', content);
        formData.append('category', category);
        formData.append('author', currentUser.email);

        if (imageUrl) {
            formData.append('url', imageUrl);
        }
        
        const postBlog = async()=>{
            if (!currentUser) {
                throw new Error('User is not authenticated');
            }
            const idToken = await currentUser.getIdToken(true);

            axios.post('https://buggbunny.pythonanywhere.com/postblog/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${idToken}`
            }
        })
            .then(() => {
                navigate('../blogs');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to post blog.');
            });
        }
        postBlog()
    };

    const onUploadSuccess = (res) => {
        setImageUrl(res.url);
    };

    const onUploadError = (err) => {
        console.error("Upload error:", err);
    };

    return (
        <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={async () => {
            const response = await fetch('https://buggbunny.pythonanywhere.com/auth');
            
            const data = await response.json();
            
            return {
                signature: data.signature,
                token: data.token,
                expire: data.expire,
            };
        }}>
            <Navbar />
            <div className="container new-blog-form">
                <form onSubmit={handleSubmit}>
                    <h1>New Blog</h1>
                    <div
                        className={`drag-area ${isDragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}

                    >
                        {isDragging ? (
                            <span>Drop image here</span>
                        ) : (
                            <>
                                Drag and drop image here or
                                <span role="button" onClick={() => fileInputRef.current.click()}> Browse </span>
                            </>
                        )}
                        <IKUpload
                            onSuccess={onUploadSuccess}
                            onError={onUploadError}
                            ref={fileInputRef}
                        />
                    </div>



                    {imageUrl && (
                        <div className="image-container">
                            <img src={imageUrl} alt="Uploaded image preview" />
                            <Link style={{ 'color': "black", "padding": "0", "margin": "0" }} onClick={() => setImageUrl(null)}>
                                Clear image
                            </Link>
                        </div>
                    )}

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <textarea
                        placeholder="Write your blog here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit">Post Blog</button>
                </form>
            </div>
            <footer>
                <div className='footer-container'>
                    <p>@BuggsBunny</p>
                </div>
            </footer>
        </IKContext>

    );
}

export default NewBlog;
