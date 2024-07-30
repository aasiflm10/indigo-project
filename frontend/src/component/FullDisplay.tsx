import { Flight } from "../hook/hook"


interface FullDisplayProps {
  flight: Flight | undefined;
  
}

  
export const  FullDisplay = ({flight}:FullDisplayProps)=>{

  if (!flight) {
    return <div className="max-w-4xl mx-auto p-6 sm:p-8">Loading...</div>;
  }



    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6 bg-gradient-to-r from-[#000046] to-blue-800">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Flight Details</h1>
            <div
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                flight.status === 'Delayed'
                  ? 'bg-red-500 text-white'
                  : 'bg-green-500 text-white'
              }`}
            >
              {flight.status}
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold text-gray-800">Flight {flight.flightId}</div>
                <div className="text-gray-700 font-bold text-xl">{flight.airline}</div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <div className="text-gray-600 text-sm">Departure Gate</div>
                  <div className="text-2xl font-semibold text-gray-900">{flight.departureGate}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-gray-600 text-sm">Arrival Gate</div>
                  <div className="text-2xl font-semibold text-gray-900 ml-1">{flight.arrivalGate}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="text-gray-600 text-sm">Departure Date</div>
                <div className="text-gray-800">{flight.scheduledDeparture}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-600 text-sm">Arrival Date</div>
                <div className="text-gray-800">{flight.scheduledArrival}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    

  )

}






