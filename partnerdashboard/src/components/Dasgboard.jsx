import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import  axios  from "axios";


const Dasgboard = () => {
    const [suc, setSuc] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:4000/dashboard")
      .then(res => {
        if (res.data === "Ok") {
            setSuc("Success ok")
        }else{
            navigate("/")
        }
      })
      .catch(err => console.log(err));
    }, [])
    return (
        <div>
            Hello
            {suc}
        </div>
    );
};

export default Dasgboard;