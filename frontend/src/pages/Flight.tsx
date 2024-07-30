import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Flight(){

  
    const [flightId,setflight]= useState('')
    const navigate = useNavigate()



    async function sendRequest(){
        try{
            const response= await axios.post("http://localhost:3000/flight-check",{
                flightId
            })

           navigate(`/flight/${response.data.id}`)
        }catch(e){
         
            console.log('data not fetched')

        }
    }
    return(
           
        <div className="flex min-h-full flex-col items-center h-screen justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-[#000046] to-blue-800">
            <img className=" mx-auto h-36 " src="./Image/plane3.jpg" alt="Loading"/>
        <div className="bg-white rounded-lg shadow-2xl shadow-blue-600 p-8 sm:w-full sm:max-w-sm">
            <h2 className="text-3xl font-bold leading-9 text-gray-900 text-center">Track Flight</h2>
    
            <div className="mt-8 space-y-6">
                <div>
                    <label htmlFor="flightID" className="block text-lg font-medium leading-6 text-gray-900">Flight ID</label>
                    <div className="mt-2">
                        <input
                            id="flightID"
                            placeholder="DF 14525"
                            onChange={(e) => setflight(e.target.value)}
                            className="block w-full rounded-md border-0 py-3 px-3 text-xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
    
                <div>
                    <button
                        type="submit"
                        className="w-full mt-4 flex justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={sendRequest}
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    </div>
    
        
        
    )
}