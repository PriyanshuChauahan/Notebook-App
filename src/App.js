import "./App.css";
// react-roter-dom setup
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import NoMatch from "./components/NoMatch";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AlertState from "./context/alert/AlertState";


function App() {

  

  
  return (
    <>
    <AlertState>
    <NoteState>
    <Router>
      {
        /* All routes are nested inside it */
        <>
        <Navbar/>
        <Alert message="this is amazing react"/>
        <div className="container">
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="*" element={<NoMatch />} />
        </Routes>
        </div>
        </>
      }
    </Router>
    </NoteState>
    </AlertState>
    </>
  );
}

export default App;


// function based routes implementation
// function Routes() {
//   const element = useRoutes([
//     { path: "/", element: <Home/> },
//     { path: "/posts",
//       element: <Posts/>,
//       children: [
//         { index: true, element: <PostLists/> },
//         { path: ":slug", element: <Post/> }
//       ],
//     },
//     { path: "/about", element: <About/> },
//     { path: "*", element: <NoMatch/>}
//   ]);
//   return element;
// }