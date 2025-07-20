// hooks
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// styles
import "./App.css";
// components
import NavBar from "./components/navBar/navBar.jsx";
// pages
import Home from "./pages/home/home.jsx";
import NotFound from "./pages/notFound/notFound.jsx";
import LoginPage from "./pages/loginPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import Tags from "./pages/tags/tags.jsx";
import GamesByTag from "./pages/tags/gamesByTag.jsx";
import SearchResults from "./pages/searchResults/searchResults.jsx";
import GamePage from "./pages/game/gamePage.jsx";
import Library from "./pages/library/library.jsx";
import PurchasePage from "./pages/purchase/purchasePage.jsx";
import CartPage from "./pages/cart/cartPage.jsx";
import UserPage from "./pages/user/user.jsx";
import Error from "./pages/error/error.jsx";
// services
import { getUser } from "./services/token.js";

function App() {
  const [user, setUser] = useState(getUser());

  const authState = {
    user,
    setUser
  };

  return (
    <Router>
      <Toaster />
      <div id="body-app">
        <header>
          <img className="violet-line" src="src/assets/images/bg.webp" alt="Violet Line" />
          <NavBar authState={authState}></NavBar>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/tags' element={<Tags />}></Route>
            <Route path='/tags/:tagId' element={<GamesByTag />}></Route>
            <Route path='/login' element={<LoginPage authState={authState} />}></Route>
            <Route path='/register' element={<RegisterPage authState={authState} />}></Route>
            <Route path="/search" element={<SearchResults />} />
            <Route path='/games/:gameId' element={<GamePage />}></Route>
            <Route path='/library' element={<Library authState={authState} />}></Route>
            <Route path='/users/:id' element={<UserPage />}></Route>
            <Route path='/purchase' element={<PurchasePage authState={authState} />}></Route>
            <Route path='/cart' element={<CartPage authState={authState} />}></Route>
            <Route path='*' element={<NotFound />}></Route>
            <Route path='/error' element={<Error />}></Route>
          </Routes>
        </main>
        <footer>
          <img className="violet-line" src="src/assets/images/bg.webp" alt="Violet Line" />
        </footer>
      </div>
    </Router>
  );
}

export default App;