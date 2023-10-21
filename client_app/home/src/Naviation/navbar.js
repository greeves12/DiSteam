import logo from '../Assets/logo.png'
import React, { useState } from 'react'
import Login from './login_button';
import {HiMenu} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';

const Nav = () => {
    let Links = [
        {name: "HOME", link: '/'},
        {name: "FEATURES", link: '/'},
        {name: "PRICING", link: '/'},
    ];

    let [open, setOpen] = useState(false);

    return (
        <div className='fixed w-full top-0 left-0'>
            <div className='md:flex items-center justify-between px-8'>
                <div className='font-bold text-2xl cursor-pointer flex items-center'>
                    <img src={logo} />
                </div>
                <div onClick={() => setOpen(!open)} className='absolute right-8 top-4 cursor-pointer md:hidden'>
                    
                   { !open ? <HiMenu size={30} color='white' /> : <AiOutlineClose size={30} color='white' />}
                    
                </div>
                <ul className={`text-black md:flex md:items-center md:bg-black md:pb-0 pb-12 absolute md:static md:z-auto z[-1] left-0 w-full
                md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20': 'top-[-490px]'}`}>
                    {
                        Links.map((x) =>(
                                <li key={x.name} className='md:ml-8 text-xl text-white font-bold md:my-0 my-7'>
                                    <a href={x.link}>{x.name}</a>
                                </li>
                            ))
                    }
                    <Login/>
                </ul>
            </div>
        </div>
    )
}

export default Nav;