import logo from "../../Assets/logo.png";

const NavPanel = (props) => {
    return(
        <div className='bg-[#383838] min-h-screen w-[320px] text-white'>
            <img src={logo} alt={""} className='flex ml-4 m-auto p-5'/>

            <div className='flex ml-11 mt-3 text-gray-400'>
                <ol >
                    {props.buttonData.map((name) =>
                        <li key={name} className={'mb-6'}>
                            <button className={`${props.option === name ? 'bg-indigo-600 py-2 pl-6 pr-32 rounded-md text-left text-white' : 'ml-6 hover:text-white'}`} onClick={() => {}}>{name}</button>
                        </li>
                    )}
                </ol>
            </div>
        </div>
    );
}

export default NavPanel;