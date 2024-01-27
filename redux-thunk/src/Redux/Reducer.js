const initState ={
    user:[],
    error:''
}
export default function reducer(state = initState,{type,payload}){
    switch(type){
        case "FETCH_DATA":{
            return{user:payload,error:""}

        }
        case "ERROR":{
            return{user:[],error:payload}

        }
        default:{
            return state;
        }
    }
}