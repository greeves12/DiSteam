const logo =  require('../../Assets/logo.png');
const {FaDiscord} = require('react-icons/fa');

const Signin = () => {
    let link = "https://discord.com/api/oauth2/authorize?client_id=1167234227339792414&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fauth&response_type=code&scope=identify%20email%20guilds";

    let params = new URLSearchParams(document.location.search);


    return(

        <div className="flex bg-[#202020] h-screen w-full">
            {/* Container that holds signin contents*/}
            <div className="m-auto bg-[#181818] text-white w-[300px] h-[400px] justify-center items-center rounded-2xl shadow-2xl">

                {/* Header information including logo and text */}
                <img src={logo} alt={"f"} className='pt-2 flex justify-center items-center m-auto' />
                <h1 className='flex justify-center text-center m-auto text-[17px] w-3/4 mt-3'>To access our client panel, please login with your Discord account.</h1>

                <button onClick={() => {
                    window.location.href=link}} className='flex justify-center m-auto bg-indigo-600 text-white rounded-2xl py-2 px-7 mt-[70px] hover:bg-indigo-400 duration-500 font-bold '><FaDiscord className="mr-2 text-[23px]" /> Login with Discord</button>

                {/* Login with Discord button */}
            </div>
        </div>
    )
}

export default Signin;