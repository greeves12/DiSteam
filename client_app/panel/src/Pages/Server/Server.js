import {useNavigate, useParams} from "react-router-dom";
import {FaArrowLeftLong} from 'react-icons/fa6';
import Axios from 'axios';
import {useEffect, useState} from "react";

const Server = ({GlobalState}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [config, setConfig] = useState([]);
    const {discord} = GlobalState;

    useEffect(() => {
        const {auth} = JSON.parse(localStorage.getItem("api"));
        const discord_id = localStorage.getItem("discord_id");
        Axios.get("http://localhost:8080/service/requests/get/config", {
            headers: {
                "discord-id": discord_id,
                "auth-token": auth,
                "server-id": id,
            },
            withCredentials: false
        }).then((result) => {
            setConfig(result.data);
        });
    }, []);

    return(
        <div className={'bg-[#484848] w-full min-h-screen'}>
            {/* Heading information */}
            <div className={'absolute text-white left-[600px] top-[40px]'}>
                <div className={'flex flex-col gap-8'}>
                    <h1 className={'text-3xl font-semibold'}>General Settings</h1>
                    <p className={''}>By using our service, you agree to the <a href={""}>Terms and Service.</a></p>
                </div>

                <div className={'mt-14'}>
                    <h1>NAME</h1>
                    <div className={'bg-[#383838] w-[300px] h-[30px] rounded-sm mt-2'}>
                        <h2 className={'ml-1 pt-1'}>f</h2>
                    </div>
                </div>
            </div>



            {/* Left panel */}
            <div className={'bg-[#383838] min-h-screen w-[320px] text-white'}>
                <h3 onClick={() =>navigate("/success") }> <FaArrowLeftLong /> Back to Servers</h3>
            </div>


        </div>
    )
}

export default Server;