import { useEffect, useState } from "react";
import API from "../api/axios";
import { Appointment } from "../types";

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get("/consultation");
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {/* array of table headings to map from */}
          {[
            " Appointment Date",
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
        {appointments.map((appointment) => (
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
  );
}
