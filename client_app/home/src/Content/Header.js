
const Header = () => {
    return(
        <div className="flex justify-center py-40 text-4xl">
            <h1 className="font-white font-extrabold"><span className="text-indigo-600 ">LINK</span> ONCE, <span className="text-orange-300">PLAY</span> ANYWHERE</h1>
            <div className="absolute pt-24 mr-10">
                <button className="bg-indigo-600 text-xl font-bold text-white py-4 px-10 rounded-2xl md:ml-8 hover:bg-indigo-400 duration-500">Get Started</button>
            </div>
        </div>
    );
}

export default Header;