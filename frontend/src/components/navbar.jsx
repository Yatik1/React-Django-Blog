import { Link } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../contexts/authcontexts';
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';


function Navbar() {
    const { logout, currentUser } = useAuth();
    const [isExpanded, setIsExpanded] = useState(false);

    async function handleLogout() {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    }

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <nav className='navbar' >
        <div className='inner-header'>
            <div className='Logo'>
                <h1 className='logoa'><Link to="/">Buggsbunny</Link></h1>
            </div>
            <GiHamburgerMenu className='ham' onClick={toggleNavbar} />
        </div>

        <div className="links">
                <Link to="/">Home</Link>
                <Link to="/blogs">Blog</Link>
                <Link to="/newblog">Create New</Link>
                {currentUser ? (
                    <Link onClick={handleLogout}>Logout</Link>
                ) : (
                    <Link to={"/login"}>Login</Link>
                )}
            </div>
            
            <ul className={`tabs`} style={{'display': isExpanded?'flex':'none'}} >
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blogs">Blog</Link></li>
                <li><Link to="/newblog">Create New</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                {currentUser ?(
                    <li><Link onClick={handleLogout}>Logout</Link></li>
                    
                ):(
                    <li><Link to={"/login"}>Login</Link></li>
                )
            }
            </ul>
        </nav>
    );
}

export default Navbar;
