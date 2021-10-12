import React from 'react';

interface ButtonInterface{
    text:string,
    disabled?:boolean,
    type?:'primary' | 'success' | 'danger'
    onClick?:()=>void
}

function Button({text,disabled,onClick}:ButtonInterface) {

    const call=()=>{
        alert()
    }
    return (
        <button onClick={onClick} disabled={disabled} className="disabled:opacity-50 inline-flex items-center px-4 py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:shadow-outline-blue transition ease-in-out duration-150 ">
            {text} 
        </button>
    );
}

export default Button;