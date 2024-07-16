import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import { IKContext, IKUpload } from "imagekitio-react";
import { publicKey, urlEndpoint } from "../imagekit/imagekitConfig";
import { useAuth } from "../contexts/authcontexts";


function Editblog() {

    const { id } = useParams();
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('')
    const [isDragging, setIsDragging] = useState(false);
    const { currentUser } = useAuth()

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const redirectToPath = (path) => {
        navigate(path);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                if (!currentUser) {
                    throw new Error('User is not authenticated');
                }
                const idToken = await currentUser.getIdToken(true);
                axios.get(`https://buggbunny.pythonanywhere.com//blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,

                    }
                })
                    .then((response) => {
                        setError('')
                        setTitle(response.data.title)
                        setContent(response.data.body)
                        setCategory(response.data.category)
                        setImage(response.data.url)
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                        setError(error);
                    });
            }
            catch (error) {
                console.log(error)


            }
        }
        fetchBlog()
    }, [id]);



    if (error) return <p>Error loading the blog post.</p>;

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

    const onUploadSuccess = (res) => {
        setImage(res.url);
    };

    const onUploadError = (err) => {
        console.error("Upload error:", err);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const putBody = {
            title: title,
            body: content,
            category: category,
            url: image
        }

        const putBlog = async () => {
            if (!currentUser) {
                throw new Error('User is not authenticated');
            }
            const idToken = await currentUser.getIdToken(true);

            axios.put(`https://buggbunny.pythonanywhere.com//putblog/${id}`, putBody, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${idToken}`
                }
            })
                .then((response) => {
                    setError('')
                })
                .then(
                    (error) => {
                        console.log(error)
                        setError(error)
                    }
                )
            if (title && content) {
                redirectToPath('../blogs')
            }

        }
        putBlog()



    }




    return (
        <>
            <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={async () => {
                const response = await fetch('http://localhost:8000/auth');
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                const data = await response.json();
                return {
                    signature: data.signature,
                    expire: data.expire,
                    token: data.token,
                };
            }}>
                <Navbar />
                <div className="container new-blog-form">
                    <form>
                        <h1>Edit Blog</h1>
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
                        {image && (
                            <div className="image-container">
                                <img src={image} alt="Uploaded image preview" />
                                <Link style={{ 'color': "black", "padding": "0", "margin": "0" }} onClick={() => setImage(null)}>
                                    Clear image
                                </Link>
                            </div>
                        )}

                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            value={category}
                            onChange={handleCategoryChange}
                        />
                        <textarea
                            className="blog-field"
                            placeholder="Write your blog here ...."
                            value={content}
                            onChange={handleContentChange}
                        />
                        <button onClick={handleSubmit}>Change Blog</button>
                    </form>
                </div>
                <footer>
                    <div className='footer-container'>
                        <p>@BuggsBunny</p>
                    </div>
                </footer>
            </IKContext>
        </>
    )
}

export default Editblog