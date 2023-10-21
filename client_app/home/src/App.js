import Nav from "./Naviation/navbar";
import Header from "./Content/Header";

const App = () => {
  return (
    <>
      <div className="bg-black w-full h-screen text-white">
        <Nav />
        <Header />
      </div>
    </>
  );
}

export default App;
