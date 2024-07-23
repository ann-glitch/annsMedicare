import { IoMdClose } from "react-icons/io";
import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { toast } from "sonner";

interface AddAppointmentModalProps {
  addAppointmentHandler: () => void;
}

interface Patient {
  _id: string;
  name: string;
}

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  addAppointmentHandler,
}) => {
  const [formData, setFormData] = useState({
    patient: "",
    consultationDate: "",
    doctor: "",
    consultationType: "",
    medicalCondition: "",
    followUpInstructions: "",
    consultationFee: "",
  });

  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await API.get("/patients");
        if (response.data.success) {
          setPatients(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // send data to api
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post("/consultation", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        toast("Consultation created successfully");
        addAppointmentHandler(); // close the modal
      } else {
        console.error("Error creating consultation:", response.data);
      }
    } catch (error) {
      console.error("Error creating consultation:", error);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 bg-black/40 w-full h-full flex items-start sm:items-center justify-center"
      onClick={addAppointmentHandler}
    >
      <div
        className="bg-white w-[80%] sm:w-[40%] overflow-auto p-4 rounded-md space-y-4"
        onClick={(e) => e.stopPropagation()} // stop the modal from closing when the user clicks inside the modal
      >
        {/* heading and close icon */}
        <div className="flex w-full justify-between items-center">
          <h3 className="font-semibold text-xl">Add Appointment</h3>
          <button
            className="bg-gray-100 rounded-md p-2"
            onClick={addAppointmentHandler}
          >
            <IoMdClose size={20} />
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <label className="text-sm font-medium text-gray-900 flex flex-col gap-2 flex-1">
            Select Patient
            <select
              name="patient"
              value={formData.patient}
              onChange={handleFormChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
              required
            >
              <option value="" disabled>
                Select Patient
              </option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-900 flex flex-col gap-2 flex-1">
            Date Consultation
            <input
              type="date"
              name="consultationDate"
              value={formData.consultationDate}
              onChange={handleFormChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
              required
            />
          </label>

          <label className="text-sm font-medium text-gray-900 flex flex-col gap-2 flex-1">
            Select Doctor
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleFormChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
              required
            >
              <option value="" disabled>
                Select Doctor
              </option>
              <option value="Grace Ashley">Grace Ashley</option>
              <option value="Doris Ann">Doris Ann</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Paul Brown">Paul Brown</option>
              <option value="Lisa White">Lisa White</option>
            </select>
          </label>

          <label className="text-sm font-medium text-gray-900 flex flex-col gap-2 flex-1">
            Consultation Type
            <select
              name="consultationType"
              value={formData.consultationType}
              onChange={handleFormChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
              required
            >
              <option value="" disabled>
                Select Consultation Type
              </option>
              <option value="medical">Medical</option>
              <option value="pediatric">Pediatric</option>
              <option value="psychological">Psychological</option>
              <option value="genetic">Genetic</option>
              <option value="chronic">Chronic</option>
              <option value="oncology">Oncology</option>
              <option value="geriatric">Geriatric</option>
              <option value="nutritional">Nutritional</option>
            </select>
          </label>

          <label className="text-sm font-medium text-gray-900 flex flex-col gap-2 flex-1">
            Medical Condition
            <input
              type="text"
              name="medicalCondition"
              placeholder="Medical Condition"
              value={formData.medicalCondition}
              onChange={handleFormChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
              required
            />
          </label>

          <label className="text-sm font-medium text-gray-900 flex flex-col gap-2 flex-1">
            Follow-up Instructions
            <input
              type="text"
              name="followUpInstructions"
              placeholder="Follow-up instructions or appointments"
              value={formData.followUpInstructions}
              onChange={handleFormChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
              required
            />
          </label>

          <label className="text-sm font-medium text-gray-900 flex flex-col gap-2 flex-1">
            Consultation Fee
            <input
              type="text"
              name="consultationFee"
              placeholder="Consultation fee"
              value={formData.consultationFee}
              onChange={handleFormChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
              required
            />
          </label>

          {/* submit button */}
          <div className="w-full flex gap-2 col-span-2">
            <button
              type="button"
              className="rounded-full p-3 border border-gray-200 flex-1"
              onClick={addAppointmentHandler}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full p-3 bg-primaryBlue text-white flex-1"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
