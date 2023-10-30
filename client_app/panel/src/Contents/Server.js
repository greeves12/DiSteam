import {useNavigate, useParams} from "react-router-dom";
import {FaArrowLeftLong} from 'react-icons/fa6'

const Server = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    return(
        <div className={'bg-[#484848] w-full min-h-screen'}>
            {/* Left panel */}
            <div className={'bg-[#383838] min-h-screen w-[300px] text-white'}>
                <h3 onClick={() =>navigate("/success") }> <FaArrowLeftLong /> Back to Servers</h3>
            </div>

        </div>
    )
}

export default Server;