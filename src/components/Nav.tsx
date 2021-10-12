import { truncate } from 'fs';
import React from 'react';
import { Button } from '.';


const Nav = ({account,handleLogout}:any) => {
    return (
        <div className="flex h-14 shadow items-center px-4 justify-between">
            <div>
                <h2 className="text-lg font-bold">WELCOME</h2>
            </div>
           <div className="flex items-center">
               <p className="px-4">{account && account.slice(0, 5)+'...'+account.slice(-5)}</p>
              {account && <Button text="Logout" onClick={handleLogout} />}
           </div>
        </div>
    );
};

export default Nav;