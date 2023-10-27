

const ServerCard = (props) =>{

    let servername = props.serverName;

    if(servername?.length > 12){
        servername = servername.substring(0, 12) + "...";
    }

    return(
        <div className={'bg-[#383838] w-[140px] h-[170px] rounded-lg cursor-pointer hover:shadow-black hover:shadow-2xl'}>
            <img alt={'Server icon'} src={props.imgUrl} className={'m-auto mt-4 right-0 left-0 rounded-md h-[110px] w-[110px]'}/>
            <h1 className={'flex pl-3 pt-2 max-w-[120px]'}>{servername}</h1>
        </div>
    )
}

export default ServerCard;