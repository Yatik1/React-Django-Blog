import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Bloglistpage from './pages/Bloglistpage';
import Singlepage from './pages/Singlepage';
import Newblog from './pages/Newblog';
import Editblog from './pages/Editblog';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signup';
import Profilepage from './pages/Profilepage';
import SingleHomepage from './pages/singleHomeBlog';
import ProtectedRoute from '../routes/protectedROute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blogs" element={<ProtectedRoute><Bloglistpage /></ProtectedRoute>} />
        <Route path='/singleblog/:id' element = {<ProtectedRoute><Singlepage/></ProtectedRoute>}/>
        <Route path='/singleblog/:image/:name/:content/:responsiveContent' element = {<ProtectedRoute><SingleHomepage/></ProtectedRoute>}/>
        <Route path = '/newblog' element = {<ProtectedRoute><Newblog/></ProtectedRoute>}/>
        <Route path = '/editblog/:id' element = {<ProtectedRoute><Editblog/></ProtectedRoute>}/>
        <Route path='/profile' element = {<ProtectedRoute><Profilepage/></ProtectedRoute>}/>
        
          <Route path='/login' element = {<Loginpage/>}/>
          <Route path='/signup' element = {<Signuppage/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
