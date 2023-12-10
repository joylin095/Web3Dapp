import Mint from "./Main/Mint";
import Profile from "./Main/Profile";
import Upload from "./Main/Upload";
import Nav from "./Nav/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function Home() {
  return (
    <>
      <BrowserRouter>
        <div
          className="d-flex justify-content-between"
          style={{ backgroundColor: "gray", height: "50px" }}
        >
          <Nav />
        </div>
        <main>
          <Routes>
            <Route path="/" element={<Mint />}></Route>
            <Route path="/Upload" element={<Upload />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default Home;
