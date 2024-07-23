import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Appointment } from "../types";
import API from "../api/axios";

interface AppointmentDetailsModalProps {
  appointment: Appointment;
  onClose: () => void;
}

interface Patient {
  name: string;
  email: string;
  phoneNumber: string;
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  appointment,
  onClose,
}) => {
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);

  useEffect(() => {
    // get the patient details using their id
    const fetchPatientDetails = async () => {
      try {
        const response = await API.get(`/patients/${appointment.patient}`);
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
  }, [appointment.patient]);

  return (
    <div
      className="fixed top-0 left-0 bg-black/40 w-full h-screen flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-[40%] overflow-auto p-4 rounded-md space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full justify-between items-center">
          <h3 className="font-semibold text-xl">Appointment Details</h3>
          <button className="bg-gray-100 rounded-md p-2" onClick={onClose}>
            <IoMdClose size={20} />
          </button>
        </div>
        <div>
          <p>
            <strong>Patient:</strong>{" "}
            {patientDetails ? patientDetails.name : "Loading..."}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {patientDetails ? patientDetails.email : "Loading..."}
          </p>
          <p>
            <strong>Phone Number:</strong>{" "}
            {patientDetails ? patientDetails.phoneNumber : "Loading..."}
          </p>
          <p className="capitalize">
            <strong>Doctor:</strong> {appointment.doctor}
          </p>
          <p className="capitalize">
            <strong>Consultation Type:</strong> {appointment.consultationType}
          </p>
          <p className="capitalize">
            <strong>Medical Condition:</strong> {appointment.medicalCondition}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(appointment.consultationDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
