
import './App.css';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfilePage';


import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<UserProfile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
