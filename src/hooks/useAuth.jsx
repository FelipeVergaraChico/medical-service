import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

export default function useAuth(){
    const [ authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(token, user){

        let msgText = "Cadastro realizado com sucesso!"
        let msgType = "success"

        try{    
            const data = await api.post("/users/register", user, {
                Authorization: `Bearer ${JSON.parse(token)}`,
                "Content-Type": "multipart/form-data",
              }).then((response) => {
                return response.data
            })

            console.log(data)

        } catch(err) {
            msgText = err.response.data.message
            msgType = "error"
        }

        setFlashMessage(msgText, msgType)

    }

    async function authUser(data){

        setAuthenticated(true)

        localStorage.setItem("token", JSON.stringify(data.token))

        navigate("/")
    }

    async function login(user){
        let msgText = "Login realizado com sucesso"
        let msgType = "success"

        try {
            const data = await api.post("/users/login", user).then((response) => {
                console.log(response)
                return response.data
            })

            await authUser(data)
            location.reload()
            
        } catch(err){
            msgText = err.response.data.message
            msgType = "error"
        }

        setFlashMessage(msgText, msgType)
    }

    function logout(){
        const msgText = "Logout realizado com sucesso"
        const msgType = "success"

        setAuthenticated(false)
        localStorage.removeItem("token")
        api.defaults.headers.Authorization = undefined
        navigate("/")

        setFlashMessage(msgText, msgType)
    }

    return { authenticated, register, logout, login }


}