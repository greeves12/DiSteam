import Axios from 'axios';
import {useContext, useEffect, useState} from "react";
import logo from '../Assets/logo.png'
import ServerCard from "../Contents/ServerCard";
import {DiscordContext} from "../App";

const Success = () => {
    const [discord, setDiscord] = useState("");
    const [option, setOption] = useState("Dashboard");
    const [servers, setServers] = useState([]);

    let params = new URLSearchParams(window.location.search);
    let access = params.get("access_token");
    let type = params.get("token_type");

    useEffect(() => {
        Axios.get("https://discord.com/api/users/@me", {
            headers:{
                authorization: `${type} ${access}`
            }
        }).then((res) => {
            setDiscord(res.data);

        });
        if(servers.length === 0) {
            Axios.get("https://discord.com/api/users/@me/guilds", {
                headers: {
                    authorization: `${type} ${access}`
                }
            }).then((res) => {
                setServers(res.data);
            });
        }
    }, []);



    console.log(servers);

    const buttonData = [
        "Dashboard",
        "Profile",
        "Payment"
    ]

    return(
        <div className='bg-[#484848] w-full min-h-screen'>

            {/* Profile image */}
            <div className={'absolute right-10 top-8'}>
                <img alt={'f'} className={'rounded-full h-[50px] w-[50px] cursor-pointer'} src={`https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png`}/>
                <button onClick={(url) => window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1163731065786093608&permissions=2617378832&scope=applications.commands%20bot"} className={'absolute right-20 py-1 top-2 text-white rounded-sm bg-indigo-600 hover:bg-indigo-400 duration-500 w-[100px]'}>Add Server</button>
            </div>

            {/* Server container */}
            <div className={'text-white absolute w-[900px] h-[200px] left-[400px] top-8'}>
                <h1 className={'font-semibold text-3xl pb-3'}>Servers List</h1>
                <h2 className={'max-w-full text-[20px] pb-20 text-gray-300'}>We can't wait to get DiSteam setup on your server.</h2>

                <h1 className={'text-white text-[22px] font-bold top-0 pb-8'}>My Servers</h1>
                <div className={'flex gap-10 flex-wrap'}>

                    {servers.map((prop) => prop.owner ? <ServerCard
                        imgUrl={`https://cdn.discordapp.com/icons/${prop.id}/${prop.icon}.png`}
                        serverName={prop.name}
                        serverId={prop.id}
                    /> : null)}

                </div>
            </div>

            {/* Left panel */}
            <div className='bg-[#383838] min-h-screen w-[300px] text-white'>
                <img src={logo} alt={""} className='flex ml-4 m-auto p-5'/>

                <div className='flex ml-11 mt-3'>
                    <ol >
                        {buttonData.map((name) =>
                            <li className={'mb-6'}>
                                <button className={`${option === name ? 'bg-indigo-600 py-2 pl-6 pr-32 rounded-md text-left' : 'ml-6'}`} onClick={() => {setOption(name)}}>{name}</button>
                            </li>
                        )}
                    </ol>
                </div>
            </div>

        </div>
    )
}

export default Success;