import React from 'react';
import Style from './style.module.css';
export default function Center(props){
    return(
        <div className={Style.center}>
            {props.children}
        </div>
    )
}