import ReactPlayer from 'react-player';
import video from '../Assets/Louis Suffers A Heart Attack _ Suits.mp4'

const VideoPlayer = () => {

    return(
        <div className="flex justify-center bg-black pt-28 invisible md:visible">
            <ReactPlayer url={video} volume={0} playing={true} loop={true} width='80%' height='100%'/>
        </div>
    );
}

export default VideoPlayer;