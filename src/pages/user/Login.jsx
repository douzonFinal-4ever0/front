import axios from 'axios'
import React, { useEffect } from 'react'

const Login = () => {
    const FormToData={
        "mem_code":"MEM003",
        "password":"1234"
    }
    useEffect(()=>{
        axios.post("http://localhost:8081/api/v1/user/login",FormToData).then((res)=>{
            console.log(res.data);
        })
    })
  return (
    <div></div>
  )
}

export default Login