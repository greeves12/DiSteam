import {useNavigate, useParams} from "react-router-dom";
import {FaArrowLeftLong} from 'react-icons/fa6';
import Axios from 'axios';
import {useEffect, useState} from "react";
import config from "tailwindcss/defaultConfig";

const Server = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [discordId, setDiscordId] = useState("");
    const [config, setConfig] = useState({});

    useEffect(() => {
        const {auth} = JSON.parse(localStorage.getItem("api"));
        const discord_id = localStorage.getItem("discord_id");
        setDiscordId(discord_id);

        Axios.get("http://localhost:8080/service/requests/get/config", {
            headers: {
                "discord-id": discord_id,
                "auth-token": auth,
                "server-id": id,
            }
        }).then((result) => {
            setConfig(result.data);
            console.log(result.data);
        });
    }, []);

    return(
        <div className={'bg-[#484848] w-full min-h-screen'}>
            {/* Heading information */}
            <div className={'absolute text-white left-[600px] top-[40px]'}>
                <div className={'flex flex-col gap-8 pb-10'}>
                    <h1 className={'text-3xl font-semibold'}>General Settings</h1>
                    <p className={''}>By using our service, you agree to the outlined <a href={""}>Terms and Conditions.</a></p>
                </div>

                <Setting heading={"SERVER_ID"} content={config.server_id}/>
                <Setting heading={"PLAN"} content={"Paid"} />


            </div>



            {/* Left panel */}
            <div className={'bg-[#383838] min-h-screen w-[320px] text-white'}>
                <h3 onClick={() =>navigate("/success") }> <FaArrowLeftLong /> Back to Servers</h3>
            </div>


        </div>
    )
}

const GenerateMenu = (props) => {

}

const Setting = (props) => {
    return(
        <div className={'mt-10'}>
            <h1>{props.heading}</h1>
            <div className={`bg-[#383838] w-[300px] h-[30px] rounded-sm mt-2 ${props.editable ? '': 'cursor-not-allowed'}`}>
                <h2 className={'ml-1 pt-1'}>{props.content}</h2>
            </div>
        </div>
    )
}

export default Server;