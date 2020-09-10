import {get} from '../../api/apiDeMoedas';

const getAllCoins = async (coins)=>{

    let allMoedas = await get(`all/${coins}`);
    let status =allMoedas.status;
    let data = await allMoedas.data;
    return {status,data};
}
const getClosingLastDays= async (coin,numberOfDays)=>{
    let  allClosingCoins =  await get(`daily/${coin}/${numberOfDays}`);
}
export{
    getAllCoins,
    getClosingLastDays};