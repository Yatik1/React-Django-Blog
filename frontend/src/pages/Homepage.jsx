import Navbar from '../components/navbar'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import HomeBlog from '../components/HomeBlog'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



function Homepage() {

  const navigate = useNavigate()

  const [images] = useState([
    { image: 'https://images.pexels.com/photos/4069291/pexels-photo-4069291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: "3 Simple Productivity Tips", content : "To boost productivity, start by prioritizing your tasks. Begin with the simplest tasks to build momentum, which can help you tackle larger ones. Use time blocks to work in short, focused bursts with breaks in between to maintain energy and focus. Minimize distractions by silencing notifications and avoiding unnecessary interruptions.", responsiveContent:"To boost productivity, start by prioritizing your tasks. Begin with the simplest tasks to build momentum," },
    { image: 'https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: "Staying Productive in a Busy World",content:"Maintaining productivity requires a blend of focus and flexibility. Start by organizing your tasks, focusing on what’s most important. Create short, dedicated time slots for deep work, ensuring you take regular breaks to avoid burnout.",responsiveContent:"Maintaining productivity requires a blend of focus and flexibility. Start by organizing your tasks, focusing on what’s most important. " },
    { image: 'https://images.pexels.com/photos/4113930/pexels-photo-4113930.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', name: "Embracing Minimalism in a Cluttered World",content:"Minimalism isn't just about getting rid of things; it's about making space for what truly matters. By decluttering your environment, you clear your mind and create a sense of calm. Start with small steps—organize one corner of your room or clean out a closet. ",responsiveContent:"Embracing Minimalism in a Cluttered WorldMinimalism isn't just about getting rid of things; it's about making space for what truly matters." },
    { image: 'https://images.pexels.com/photos/3912838/pexels-photo-3912838.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', name: "Finding Balance in a Tech-Driven Life",content:"Technology has revolutionized our world, but it can also be overwhelming. Finding balance is key to staying connected without losing yourself in a sea of screens. Start by setting limits on screen time and prioritizing real-life interactions. Take breaks to enjoy nature, exercise, or engage in a hobby. ",responsiveContent:"Technology has revolutionized our world, but it can also be overwhelming. Finding balance is key to staying connected. " }
  ])
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent(current => (current + 1) % images.length)
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length])
  
  
  return (
    <>
      <Navbar />
      <Banner images = {images} current = {current}/>
      {/* <Categories/> */}
      <HomeBlog images = {images}/>
      <footer>
        <div className='footer-container'>
          <p>@BuggsBunny</p>
        </div>
      </footer>
    </>
  )
}

export default Homepage
