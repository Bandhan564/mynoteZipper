
import './App.css'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './Screens/LandingPage/LandingPage';
import { Route, Routes } from 'react-router-dom';
import {MyNotes} from './Screens/MyNotes/MyNotes'
import LoginPage from './Screens/LoginPage/LoginPage';
import RegisterPage from './Screens/RegisterPage/RegisterPage';
import CreateNote from './Screens/CreateNote/CreateNote';
import UpdateNote from './Screens/UpdateNote/UpdateNote';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';


function App() {
 
  return (
    <div className="App">
      <Header />
      <main style={{ minHeight: "93vh" }}>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/mynotes" element={<MyNotes />}></Route>
          <Route path="/createnote" element={<CreateNote />}></Route>
          <Route path="/note/:id" element={<UpdateNote />}></Route>
          <Route path="/profile" element={<ProfileScreen />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App
