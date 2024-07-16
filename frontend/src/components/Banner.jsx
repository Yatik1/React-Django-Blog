import '../App.css'
import { Link } from 'react-router-dom';

function Banner({images,current}) {
    
    return (
        <div className='container'>
            <div className='carrousel' style={{ backgroundImage: `url(${images[current]['image']})` }}>
                <div className='bg'>
                    <h1>{images[current]['name']}</h1>
                    <p className='banner-text-laptop'>{images[current]['content']}<Link to  = {`/singleblog/${encodeURIComponent(images[current].image)}/${encodeURIComponent(images[current].name)}/${encodeURIComponent(images[current].content)}/${encodeURIComponent(images[current].responsiveContent)}/`}>see more</Link></p>
                    <p className='banner-text-mobile'>{images[current]['responsiveContent']}<a href='#'>see more</a></p>
                </div>
            </div>
        </div>
    )
}

export default Banner