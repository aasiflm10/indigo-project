import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const FlightDetailsForm = () => {
  const [flightId, setFlightId] = useState("");
  const [status, setStatus] = useState("");
  const [departureGate, setDepartureGate] = useState("");
  const [arrivalGate, setArrivalGate] = useState("");
  const [scheduledDeparture, setScheduledDeparture] = useState("");
  const [scheduledArrival, setScheduledArrival] = useState("");
  const [notification, setNotification] = useState({ visible: false, message: "", success: false });

  const navigate = useNavigate(); 

  const showNotification = (message, success) => {
    setNotification({ visible: true, message, success });
    setTimeout(() => {
      setNotification({ visible: false, message: "", success: false });
    }, 3000);
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-6">
          <Heading label={"Flight Details"} />
          <SubHeading label={"Enter flight information"} />
          <InputBox
            onChange={(e) => {
              setFlightId(e.target.value);
            }}
            placeholder="6E2094"
            label={"Flight Id"}
          />
          <InputBox
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            placeholder="On Time"
            label={"Status"}
          />
          <InputBox
            onChange={(e) => {
              setDepartureGate(e.target.value);
            }}
            placeholder="A56"
            label={"Departure Gate"}
          />
          <InputBox
            onChange={(e) => {
              setArrivalGate(e.target.value);
            }}
            placeholder="A43"
            label={"Arrival Gate"}
          />
          <InputBox
            onChange={(e) => {
              setScheduledDeparture(e.target.value);
            }}
            placeholder="Scheduled Departure"
            label={"Scheduled Departure"}
            type="datetime-local"
          />
          <InputBox
            onChange={(e) => {
              setScheduledArrival(e.target.value);
            }}
            placeholder="Scheduled Arrival"
            label={"Scheduled Arrival"}
            type="datetime-local"
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const requestData = {
                  flightId,
                  status,
                  departureGate,
                  arrivalGate,
                  scheduledDeparture,
                  scheduledArrival,
                  notification: {
                    title: "Flight Notification",
                    body: `Flight ${flightId} is ${status}. Departure Gate: ${departureGate}, Arrival Gate: ${arrivalGate}. Scheduled Departure: ${scheduledDeparture}, Scheduled Arrival: ${scheduledArrival}.`
                  }
                };

                try {
                  const response = await axios.post(
                    "http://localhost:3000/flightUpdate", // Updated endpoint
                    requestData
                  );

                  console.log(response);
                  showNotification("Flight notification sent successfully", true);

                  // navigate("/dashboard")
                } catch (err) {
                  showNotification("Failed to submit flight details. Please try again.", false);
                  console.log("Request failed ", err);
                }
              }}
              label={"Submit"}
            />
          </div>
          {notification.visible && (
            <div
              className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-md text-white ${
                notification.success ? "bg-green-500" : "bg-red-500"
              } transition-opacity duration-300`}
            >
              {notification.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
