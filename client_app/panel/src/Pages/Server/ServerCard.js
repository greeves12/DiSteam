import {useNavigate} from "react-router-dom";

const ServerCard = (props) =>{
    const navigate = useNavigate();
    let servername = props.serverName;

    if(servername?.length > 12){
        servername = servername.substring(0, 12) + "...";
    }

    const navigateToConfig = () => {
        let serverId = props.serverId;

        navigate("/server/" + serverId);
    }

    const createImage = () => {

        if(props.imgUrl === null){
            let name = "";
            if(props.serverName.includes(" ")){
                name = props.serverName.charAt(0);

                for(let x = 0; x < props.serverName.length; x++){
                    if(props.serverName[x] === " "){
                        name = name + props.serverName.charAt(x+1);
                        break;
                    }
                }
            }

            return (
                <div className={'flex justify-center m-auto mt-4 right-0 left-0 rounded-md h-[110px] w-[110px] bg-black items-center'}>
                    <h1 className={' text-center font-bold text-2xl'}>{name}</h1>
                </div>
            )
        }

        return <img alt={'Server icon'} src={props.imgUrl} className={'m-auto mt-4 right-0 left-0 rounded-md h-[110px] w-[110px]'}/>
    }

    return(
        <div onClick={() => navigateToConfig()} className={'bg-[#383838] w-[140px] h-[170px] rounded-lg cursor-pointer hover:shadow-black hover:shadow-2xl'}>

            {createImage()}

            <h1 className={'flex pl-3 pt-2 max-w-[140px]'}>{servername}</h1>
        </div>
    )
}

export default ServerCard;