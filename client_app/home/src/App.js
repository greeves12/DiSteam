import Header from "./Content/Header";
import Nav from "./Naviation/navbar";
import VideoPlayer from "./Content/VideoPlayer";

const App = () => {
  return (
    <>
      <div className="bg-black w-full h-screen text-white">
        <Nav />
        <Header />
        <VideoPlayer />
      </div>  
    </>
  );
}

export default App;
