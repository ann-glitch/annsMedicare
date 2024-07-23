import { useState, useEffect } from "react";
import AppointmentCard from "./AppointmentCard";
import TopBar from "./TopBar";
import AddAppointmentModal from "./AddAppointmentModal";
import AppointmentsTable from "./AppointmentsTable";
import API from "../api/axios";
import { Appointment, Patient } from "../types";
import { useAuth } from "../contexts/AuthContext";
import AppointmentDetailsModal from "./AppointmentDetailsModal";

const Content: React.FC = () => {
  const { user } = useAuth();

  const [isAdding, setIsAdding] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [consultationDate, setConsultationDate] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get("/consultation");
        if (response.data.success) {
          setAppointments(response.data.data);
          setFilteredAppointments(response.data.data);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await API.get("/patients");
        if (response.data.success) {
          setPatients(response.data.data);
        } else {
          console.error("Failed to fetch patients");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    // filtering function
    const filtered = appointments.filter((appointment) => {
      const patient = patients.find((p) => p._id === appointment.patient);
      // search by patient name
      const matchesPatientName = patient?.name
        .toLowerCase()
        .includes(patientName.toLowerCase());
      // search by doctor name
      const matchesDoctorName = appointment.doctor
        .toLowerCase()
        .includes(doctorName.toLowerCase());
      // search by medical condition
      const matchesMedicalCondition = appointment.medicalCondition
        .toLowerCase()
        .includes(medicalCondition.toLowerCase());
      // filter by date
      const matchesConsultationDate = consultationDate
        ? new Date(appointment.consultationDate).toLocaleDateString() ===
          new Date(consultationDate).toLocaleDateString()
        : true;

      // allow for multiple filtering
      return (
        matchesPatientName &&
        matchesDoctorName &&
        matchesMedicalCondition &&
        matchesConsultationDate
      );
    });

    setFilteredAppointments(filtered);
  }, [
    patientName,
    doctorName,
    medicalCondition,
    consultationDate,
    appointments,
    patients,
  ]);

  const addAppointmentHandler = () => {
    setIsAdding(!isAdding);
  };

  const handleCardClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleModalClose = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="flex flex-col h-full gap-4 font-outfit">
      <TopBar />

      <div className="flex justify-between px-4 sm:px-0 pb-4 border-b border-gray-200">
        <div className="">
          <p className="text-xl font-bold font-bricolage">
            Welcome, {user?.name?.split(" ")[0]}
          </p>
          <p className="text-sm">
            {user?.role === "officer"
              ? "Have a great day at work!"
              : "Hope you have a smooth and healthy day!"}
          </p>
        </div>

        {user?.role === "officer" && (
          <button
            className="bg-primaryBlue p-3 rounded-md text-white"
            onClick={addAppointmentHandler}
          >
            + Add Appointment
          </button>
        )}

        {isAdding && (
          <AddAppointmentModal addAppointmentHandler={addAppointmentHandler} />
        )}
      </div>

      {user?.role === "officer" ? (
        <>
          <div className="flex justify-between gap-4 px-4">
            <input
              placeholder="Search by patient name..."
              className="rounded-lg border border-gray-200 p-2 placeholder:text-sm flex-1"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <input
              placeholder="Search by doctor name..."
              className="rounded-lg border border-gray-200 p-2 placeholder:text-sm flex-1"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
            <input
              placeholder="Search by medical condition"
              className="rounded-lg border border-gray-200 p-2 placeholder:text-sm flex-1"
              value={medicalCondition}
              onChange={(e) => setMedicalCondition(e.target.value)}
            />
            <input
              type="date"
              className="rounded-lg border border-gray-200 p-2 placeholder:text-sm flex-1"
              value={consultationDate}
              onChange={(e) => setConsultationDate(e.target.value)}
            />
          </div>

          <div className="bg-blue-50 flex-1 p-2">
            <div className="w-full flex gap-2 flex-wrap">
              {loading ? (
                <div>Loading...</div>
              ) : filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <div
                    onClick={() => handleCardClick(appointment)}
                    key={appointment._id}
                  >
                    <AppointmentCard appointment={appointment} />
                  </div>
                ))
              ) : (
                <div>No appointments found</div>
              )}
            </div>
          </div>
        </>
      ) : (

          <div className="flex-1 p-2">
            <AppointmentsTable />
          </div>
      )}

      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Content;
