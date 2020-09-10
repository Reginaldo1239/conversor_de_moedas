import React, { useState, useEffect } from 'react';
import Center from '../../components/center';
import {getAllCoins} from '../../services/coins';
import Style from './style.module.css';
export default function ConvertionOfCoins(props){
    const [infoCoins,setInfoCoins] = useState([]);
    const [coinCode1,setCoinCode1]=useState('BRL');
    const [coinCode2,setCoinCode2]=useState('USD-BRL');
    const  [coinValue1,setCoinValue1]=useState(1);
    const  [coinValue2,setCoinValue2]=useState();


    const getCoins = async()=>{
        let valueCoins = await getAllCoins('USD-BRL,USDT-BRL,CAD-BRL,AUD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,JPY-BRL,CHF-BRL,CNY-BRL');
        if(valueCoins.status===200){    
        let newInfoCoins = [{code:'BRL',newCode:'BRL',name:'Real Brasileiro',high:1,ask:1}]
            for(let i in valueCoins.data){
                valueCoins.data[i].newCode=valueCoins.data[i].code +'-'+ valueCoins.data[i].codein;
                newInfoCoins.push(valueCoins.data[i])
            }
            //newInfoCoins.push({code:'BRL',newCode:'BRL',name:'Real Brasileiro',high:1,ask:1})
            setInfoCoins(newInfoCoins);
            console.log(newInfoCoins)
        }
      }

 

    const convert1 = (values)=>{
        let {cotation1,cotation2,value} = values;
        return ((value*cotation1)/cotation2).toFixed(2);
    }
    const convert2 = (values)=>{
        let {cotation1,cotation2,value} = values;
        return ((cotation2*value)/cotation1).toFixed(2);
    }
    
    const format =(input,value)=>{  
        let cotation1,cotation2;
         infoCoins.map(e=>{
             if(e.newCode===coinCode1){
                console.log('e.high')
                 console.log(e)
                 cotation1 = e.ask;
             }else if(e.newCode===coinCode2){
                cotation2  = e.ask;
             }
         });
     
            if(input===1){
                setCoinValue2(convert1({cotation2,cotation1,value}) )
            }else if(input===2){
                setCoinValue1(convert2({cotation2,cotation1,value}));
            } 
    }


   const handlerCoinCode1=(event)=>{
     
    setCoinCode1(event.target.value);
    }

    const handlerCoinCode2= (event)=>{
        setCoinCode2(event.target.value);
    }

    const handlerCoinValue1=(event)=>{
        let value=event.target.value;
        if(/[+-]?([0-9]*[.]{0,1})?[0-9]+/.test(value) ||value==''){
          
        setCoinValue1(value) 
        format(1,value)
        }
     } 

    const handlerCoinValue2=(event)=>{
        
        let value=event.target.value;
        if(/[+-]?([0-9]*[.]{0,1})?[0-9]+/.test(value) ||value==''){
        setCoinValue2(value)
        format(2,value)
        }
    }
    useEffect(()=>{ 
        getCoins(); 
      
    },[]);
    useEffect(()=>{
        let d = new Date(1599679560000);
        console.log(d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear())
        if(infoCoins.length>0){
            format(1,coinValue1);
        }  
    },[infoCoins])
    useEffect(()=>{
        if(coinValue1 !=''&&coinValue1 !=undefined){
            format(1,coinValue1);
        }

    },[coinCode1])

    useEffect(()=>{
        if(coinValue2 !=''&&coinValue2 !=undefined){
        format(2,coinValue2);
        }
       },[coinCode2])

    return(
        <div className="container">
            <Center>
    

                <div className={Style.box}>
                    <header className={Style.FormGroupHeader}>
                    <h2 className className={Style.h2}>conversor de moedas</h2>
                    </header>
                  <div className={Style.formGroup}>  
                <select  className={Style.select} onChange={(event)=>handlerCoinCode1(event)}>
                                {infoCoins.map((coin,index)=>
                                coinCode2 !=coin.newCode&&
                                <option
                                key={index} 
                                value={coin.newCode}
                                >{coin.name}</option>)}           
                    </select>
                    </div>
                    <div className={Style.formGroup}>  
                            <input 
                                  className={Style.input}

                          value={coinValue1}
                       onChange={(event)=>handlerCoinValue1(event)}
                            />
                            </div>
                                             
   <div className={Style.formGroup}>  
                    <select className={Style.select}   onChange={(event)=>handlerCoinCode2(event)}>
                         {infoCoins.map((coin,index)=>
                         coinCode1 !=coin.newCode&&
                         <option  key={index} value={coin.newCode} >{coin.name}</option>
                         )
                         } 
                    </select>
     </div>              
     <div className={Style.formGroup}>  
      <input 
      className={Style.input}
     onChange={(event)=>handlerCoinValue2(event)}
                    value={coinValue2}/>
                    </div>
                    </div>


                 
            </Center>
        </div>
    )
}