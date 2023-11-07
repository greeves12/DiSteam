import Axios from 'axios';
import {useEffect, useState} from "react";
import ServerCard from "../Server/ServerCard";
import NavPanel from "../../Features/Applications/NavPanel";

const Success = () => {
    const [discord, setDiscord] = useState({});
    const [servers, setServers] = useState([]);

    useEffect(() => {

        if (Object.keys(discord).length === 0) {
            let params = new URLSearchParams(window.location.search);
            let type = "";
            let access = "";
            let auth = "";

            if(params.has("auth")){
                access = params.get("access_token");
                type = params.get("token_type");
                auth = params.get("auth");

                localStorage.setItem("api", JSON.stringify({access: access, type: type, auth: auth}));
            }else{
                let json = JSON.parse(localStorage.getItem("api"));

                type = json["type"];
                access = json["access"];
            }

            Axios.get("https://discord.com/api/users/@me", {
                headers: {
                    authorization: `${type} ${access}`
                }
            }).then((res) => {
                setDiscord(res.data);
                localStorage.setItem("discord_id", res.data.id);
            });

            Axios.get("https://discord.com/api/users/@me/guilds", {
                headers: {
                    authorization: `${type} ${access}`
                }
            }).then((res) => {
                setServers(res.data);
            });
        }
    }, [discord]);


    const getServerIcon = (icon, id) => {
        if(icon === null){
            return null;
        }

        return `https://cdn.discordapp.com/icons/${id}/${icon}.png`;
    }

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
                        imgUrl={getServerIcon(prop.icon, prop.id)}
                        serverName={prop.name}
                        serverId={prop.id}
                    /> : null)}

                </div>
            </div>

            {/* Left panel */}
            <NavPanel buttonData={buttonData} option={"Dashboard"} />

        </div>
    )
}

export default Success;