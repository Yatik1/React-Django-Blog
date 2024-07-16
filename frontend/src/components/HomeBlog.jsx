import { useNavigate } from 'react-router-dom';

function HomeBlog({ images }) {
    const navigate = useNavigate();

    const redirectToPath = (path) => {
        navigate(path);
    };
    return (
        <div className='home-blogs'>
        <div className="home-blog-cards">
            {images.map(blog => (
                <>
                    {console.log(blog)}
                        <div className='home-blog' onClick={() => { redirectToPath(`/singleblog/${encodeURIComponent(blog.image)}/${encodeURIComponent(blog.name)}/${encodeURIComponent(blog.content)}/${encodeURIComponent(blog.responsiveContent)}/`) }}>
                            <div className='home-blog-image' style={{ backgroundImage: "url("+blog.image+")" }}>
                            </div>
                            <div className='home-blog-content'>
                                <h1>{blog.name}</h1>
                                <p>11-04-2024</p>
                                <p>{blog.responsiveContent}</p>
                            </div>
                        </div>
                </>
            ))}
            </div>
                        <button onClick={() => { redirectToPath('blogs') }}>See More ...</button>
                    </div>
                    )
}

                    export default HomeBlog