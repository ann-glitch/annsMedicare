import { useEffect, useState } from "react";
import API from "../api/axios";
import { Appointment } from "../types";

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [loading, setLoading] = useState(true);

  // states to handle filtering
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [consultationType, setConsultationType] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get("/consultation");
        setAppointments(response.data.data);
        setFilteredAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const filtered = appointments.filter((appointment) => {
      const matchesAppointmentDate = appointmentDate
        ? new Date(appointment.consultationDate).toLocaleDateString() ===
          new Date(appointmentDate).toLocaleDateString()
        : true;
      const matchesDoctorName = doctorName
        ? appointment.doctor.toLowerCase().includes(doctorName.toLowerCase())
        : true;
      const matchesMedicalCondition = medicalCondition
        ? appointment.medicalCondition
            .toLowerCase()
            .includes(medicalCondition.toLowerCase())
        : true;
      const matchesConsultationType = consultationType
        ? appointment.consultationType
            .toLowerCase()
            .includes(consultationType.toLowerCase())
        : true;

      // allow multiple search matches
      return (
        matchesAppointmentDate &&
        matchesDoctorName &&
        matchesMedicalCondition &&
        matchesConsultationType
      );
    });

    setFilteredAppointments(filtered);
  }, [
    appointmentDate,
    doctorName,
    medicalCondition,
    consultationType,
    appointments,
  ]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between gap-4 px-4 py-2">
        <input
          type="date"
          placeholder="Search by appointment date"
          className="rounded-lg border border-gray-200 p-2 placeholder:text-sm flex-1"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
        <input
          placeholder="Search by doctor name"
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
          placeholder="Search by consultation type"
          className="rounded-lg border border-gray-200 p-2 placeholder:text-sm flex-1"
          value={consultationType}
          onChange={(e) => setConsultationType(e.target.value)}
        />
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Appointment Date",
              "Doctor",
              "Medical Condition",
              "Consultation Type",
            ].map((heading, i) => (
              <th
                key={i}
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(appointment.consultationDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">
                {appointment.doctor}
              </td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">
                {appointment.medicalCondition}
              </td>
              <td className="px-6 py-4 whitespace-nowrap capitalize">
                {appointment.consultationType}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
