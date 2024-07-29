import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const FlightDetailsForm = () => {
  const [flightName, setFlightName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [status, setStatus] = useState("");
  const [gateNumber, setGateNumber] = useState("");
  const [informUsing, setInformUsing] = useState("");
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
              setFlightName(e.target.value);
            }}
            placeholder="Flight Name"
            label={"Flight Name"}
          />
          <InputBox
            onChange={(e) => {
              setFlightNumber(e.target.value);
            }}
            placeholder="Flight Number"
            label={"Flight Number"}
          />
          <InputBox
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            placeholder="Status"
            label={"Status"}
          />
          <InputBox
            onChange={(e) => {
              setGateNumber(e.target.value);
            }}
            placeholder="Gate Number"
            label={"Gate Number"}
          />
          <div className="text-left mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Inform Using
            </label>
            <select
              onChange={(e) => {
                setInformUsing(e.target.value);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select method</option>
              <option value="SMS">SMS</option>
              <option value="Email">Email</option>
            </select>
          </div>
          <div className="pt-4">
            <Button
              onClick={async () => {
                const requestData = {
                  flightName,
                  flightNumber,
                  status,
                  gateNumber,
                  informUsing,
                  notification: {
                    title: "Flight Notification",
                    body: `Flight ${flightName} (${flightNumber}) is ${status} at gate ${gateNumber}. Please check your ${informUsing}.`
                  }
                };

                try {
                  const response = await axios.post(
                    "http://localhost:3000/send-notification",
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
