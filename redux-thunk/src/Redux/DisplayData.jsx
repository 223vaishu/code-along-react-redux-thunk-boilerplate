import React from 'react';
import {thunk} from 'redux-thunk';
import axios from 'axios';
import {createStore, applyMiddleware} from 'redux';
import reducer from './Reducer';
import {fetchUserData, showError} from './Action';

const store = createStore(reducer, applyMiddleware(thunk));

const fetchData =() => async()=> {
    try{
        let data = await axios.get("https://jsonplaceholder.typicode.com/users");
        console.log(data.data)
        store.dispatch(fetchUserData(data.data))
    }
    catch (error){
        store.dispatch(showError(error))
    }
}

const DisplayData = () => {
    const [showData, setShowData] = React.useState(false);
    const[data,setData]=React.useState([]);

    function handleClick(){
        store.dispatch(fetchData());
        setShowData(!showData);
    }

    React.useEffect(()=>{
        let subscribe = store.subscribe(()=>setData(store.getState().user));
        return subscribe;
    },[])
    return(
        <>
          <button style={{marginLeft:"600px"}} onClick={handleClick}>{showData?"Hide Data":"Fetch Data"}</button> 

          {showData &&(
            <div>
                {data.map((el,i)=>(
                    <div style={{border:"1px soild white",padding:"10px",marginLeft:"550px"}}key={i}>
                        <h3>{el.name}</h3>
                        <h3>{el.email}</h3>
                        </div>
                ))}
            </div>
          )}
        </>
    )
}
export default DisplayData;

