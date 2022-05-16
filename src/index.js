import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/myapps' element={<Navigate replace to="/learn"/>} />
      <Route path='/learn' element={<Learn/>} >
        <Route path='courses' element={<Courses/>} >
          <Route path=':courseid' element={<CourseId/>} />
        </Route>
        <Route path='bundles' element={<Bundles/>} />
      </Route>
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  </Router>
);

function Home(){
  const detais = {
    name:"Ravi Kumar",
    email:"ravidtg3@gmail.com"
  }
  let navigate = useNavigate();
  return(
    <div className="" style={{display:"flex",justifyContent:"space-evenly",flexDirection:"column",alignItems:"center", height:"100vh"}}>
      <h1>Home Page</h1>
      <h1>This application is under construction.</h1>
      <button
      onClick={()=>{
        navigate("/learn",{state:detais})
      }}
      className="btn btn-danger">Explore</button>
    </div>
  );
}

function Learn(){
  const location = useLocation()
  return(
    <div>
      <h1>Learn</h1>
      <h2>Hello Mr. {location.state.name}  {location.state.email}</h2>
      <h3>All the courses are listed here : </h3>
      <Link className="btn btn-success" to="/learn/courses" >Courses</Link>|
      <Link className="btn btn-primary" to="/learn/bundles" >Bundle</Link>
      <Outlet/>
    </div>
  );
}


function Courses(){
  const courseList = ["Angular","React","Nodejs","Vue","MongoDb"];
  const randomCourseName = courseList[Math.floor(Math.random()*courseList.length)];
  return(
    <div>
      <h1>Courses List</h1>
      <h4>Courses Card</h4>


      <p>More test</p>

      <NavLink 
      style={(isActive)=>{
          return{
            backgroundColor:isActive?"pink":"yellow"
          }
      }}
      to={`/learn/courses/${randomCourseName}`}
      
      >{randomCourseName}</NavLink>


      <NavLink className="btn btn-light" to={`/learn/courses/test`}>
      test</NavLink>


      <Outlet/>
    </div>
  );
}


function Bundles(){
  return(
    <div>
      <h1>Bundles List</h1>
      <h4>Bundles Card</h4>
    </div>
  );
}

function CourseId(){
  const navigate = useNavigate();
  const {courseid} = useParams();
  return (
    <>
        <h1>URL Params is : {courseid}</h1>
        <button 
        onClick={()=>{
          navigate("/dashboard",{state:courseid})
        }}
        className="btn btn-warning">Price</button>
    </>
  );
}

function Dashboard(){
  const location = useLocation();
  return (
    <>
      <h1>This is the info which i Got {location.state}</h1>
    </>
  );
}
