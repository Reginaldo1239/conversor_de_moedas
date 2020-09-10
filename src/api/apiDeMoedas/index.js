const URLBASE= "https://economia.awesomeapi.com.br/json/"
const get =(endPoint)=>{
    return new Promise(async (resolver,reject)=>{
        fetch(URLBASE+endPoint)
            .then((res)=>{
              
              resolver({status:res.status, data:res.json()});
            }).catch((e)=>{
                console.log(e);
               reject(e.json()); 
            })
        
        }) 
}

export {get};