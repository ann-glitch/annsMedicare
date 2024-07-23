import { useState, useEffect } from "react";
import API from "../api/axios";
import { Appointment } from "../types";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface AppointmentCardProps {
  appointment: Appointment;
}

interface Patient {
  name: string;
  email: string;
  phoneNumber: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const {
    doctor,
    consultationDate,
    medicalCondition,
    patient,
    consultationType,
  } = appointment;

  // state to hold patient details
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await API.get(`/patients/${patient}`);
        if (response.data.success) {
          setPatientDetails(response.data.data);
        } else {
          console.error("Failed to fetch patient details");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [patient]);

  return (
    <div className="rounded-lg bg-white border border-gray-200 p-6 space-y-3 cursor-pointer hover:bg-gray-50 w-full sm:w-[420px]">
      {/* patient name and heading */}
      <h2 className="font-semibold text-2xl">
        {patientDetails ? patientDetails.name : "Loading..."}
      </h2>

      {/* details */}
      <div className="grid grid-cols-2 gap-3 items-center text-md border-b border-gray-300 pb-4">
        <div className="whitespace-nowrap">Consultation Date:</div>
        <div className="font-semibold text-md">
          {new Date(consultationDate).toLocaleDateString()}
        </div>

        <div className="text-gray-600">Doctor:</div>
        <div className="font-semibold text-md whitespace-nowrap capitalize">
          {doctor}
        </div>

        <div className="text-gray-600 whitespace-nowrap">
          Medical Condition:
        </div>
        <div className="font-semibold text-md truncate">{medicalCondition}</div>

        <div className="text-gray-600 whitespace-nowrap">
          Consultation Type:
        </div>
        <div className="font-semibold text-md truncate capitalize">
          {consultationType}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 space-y-3">
        {patientDetails && (
          <>
            <div className="truncate text-md flex items-center gap-2">
              <MdEmail size={20} />
              {patientDetails.email}
            </div>

            <div className="truncate text-md flex items-center gap-2">
              <FaPhoneAlt size={20} />
              {patientDetails.phoneNumber}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
