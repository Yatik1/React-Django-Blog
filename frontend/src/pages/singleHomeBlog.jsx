import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useParams } from "react-router";
import { IKContext, IKImage } from "imagekitio-react";
import { urlEndpoint } from "../imagekit/imagekitConfig";

function SingleHomepage() {
    const {image,name,content,responsiveContent} = useParams()
    return (
        <>
            <Navbar />
            <div className='container single-blog'>
                <div className='blog-image'>
                <IKContext urlEndpoint={urlEndpoint}>
                <IKImage
                        urlEndpoint={urlEndpoint}
                        src= {image}
                        style={{ 'height': '100%', 'width': '100%' }}
                        
                    />
                </IKContext>
                </div>
                
                <div className='blog-title'>
                    <h1>{name}</h1>
                    <p>24/04/2024</p> {/* Assuming data.created_on exists and is a valid ISO string */}
                </div>
                <div className='blog-content'>
                    <p>{content}</p>
                </div>
            </div>
            <footer>
                <div className='footer-container'>
                    <p>@BuggsBunny</p>
                </div>
            </footer>
        </>
    );
}

export default SingleHomepage;
