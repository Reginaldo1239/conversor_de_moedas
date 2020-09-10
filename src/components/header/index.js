import React from 'react';
import Center from '../center';
import Style from  './style.module.css';
export default function Header(){
    return(

        <header>
            <Center>
            <div className={Style.logo}>
              <h2>moedas</h2>
                
            </div>
            </Center>
        </header>
    )
} 