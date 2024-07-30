import axios from "axios"
import {  useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface Flight{

    "flightId": string,
     "airline": string,
     "status": string,
    "departureGate": string,
     "arrivalGate": string,
    "scheduledDeparture": string,
    "scheduledArrival": string,
    "actualDeparture": string,
    "actualArrival": string,

}


export const useflight = ({id}:{id:string})=>{

    const[flight,setFlight] = useState<Flight| undefined>(undefined)


    useEffect(()=>{



        const fetchData = async()=>{
            try{
            const response= await axios.get(`${BACKEND_URL}/flight/${id}`)
            setFlight(response.data.flight)
            }catch(e){
                console.error("Error while fetching flight data:", e);
            }

        }

        fetchData()
                        
        


        

    },[id])


    return{
        flight
    }

}