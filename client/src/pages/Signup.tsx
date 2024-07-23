/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosCheckboxOutline } from "react-icons/io";
import API from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        gender,
        dateOfBirth,
        phoneNumber,
        password,
      });

      if (response.data.success) {
        navigate("/");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center rounded-lg px-3 md:px-0 font-outfit">
      <div className="flex flex-1 gap-4 flex-col items-center justify-center md:flex-row h-full mx-auto rounded-lg">
        {/* signup form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 w-full flex-1 flex items-end flex-col"
        >
          <div className="mb-4 md:w-1/2 space-y-4">
            <h1 className="text-2xl mb-4 font-semibold whitespace-normal">
              Create an account
            </h1>
            {/* name input */}
            <label className="text-sm font-medium text-gray-900 flex flex-col gap-3">
              Name
              <input
                type="text"
                placeholder="Enter your name..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            {/* email input */}
            <label className="text-sm font-medium text-gray-900 flex flex-col gap-3">
              Email
              <input
                type="email"
                placeholder="Enter your email..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            {/* gender select */}
            <label className="text-sm font-medium text-gray-900 flex flex-col gap-3">
              Gender
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                value={gender}
                onChange={(e) => setGender(e.target.value as "male" | "female")}
                required
              >
                <option value="">Select one</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            {/* date of birth input */}
            <label className="text-sm font-medium text-gray-900 flex flex-col gap-3">
              Date of Birth
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </label>

            {/* phone number input */}
            <label className="text-sm font-medium text-gray-900 flex flex-col gap-3">
              Phone Number
              <input
                type="text"
                placeholder="Enter your phone number..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </label>

            {/* password input */}
            <label className="text-sm font-medium text-gray-900 flex flex-col gap-3">
              Password
              <input
                type="password"
                placeholder="Enter your password..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="md:w-1/2 pb-4 flex justify-center items-center">
            {loading && <div>Loading...</div>}
          </div>

          {error && (
            <div className="md:w-1/2 pb-4 text-red-500 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-primaryGreen hover:bg-primaryGreen/85 font-medium rounded-md text-lg w-full md:w-1/2 py-3 text-center transition duration-300 ease-in-out"
            disabled={loading}
          >
            Sign Up
          </button>

          <Link to={"/"} className="py-4 block md:w-1/2">
            Already have an account?{" "}
            <span className="text-primaryBlue">Login</span>
          </Link>
        </form>

        {/* image */}
        <div
          className="md:w-[50%] h-full md:h-screen relative md:flex flex-col pt-4 items-center justify-center"
          style={{
            backgroundImage: "url('/images/abstract-bg.avif')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full p-3 flex items-center justify-center flex-col gap-2 md:w-[80%] text-center ">
            {/* logos */}
            <img
              src="/images/annsMedicare.png"
              alt="Annscare Logo"
              className="h-[36px] object-cover"
            />

            <h1 className="text-2xl">Consultancy Booking App</h1>
            <ul className="hidden md:flex flex-col gap-1 items-start ">
              {[
                "Book an appointment",
                "Consult a specialist",
                "Request a prescription",
              ].map((service, i) => (
                <li className="text-xl flex gap-2 items-center" key={i}>
                  <IoIosCheckboxOutline />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
