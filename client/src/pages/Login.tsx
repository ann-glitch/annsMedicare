import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosCheckboxOutline } from "react-icons/io";
import { useAuth } from "../contexts/AuthContext";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser,  user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === "user") {
        navigate("/patient");
      } else if (user.role === "officer") {
        navigate("/officer");
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/login", { email, password });
      setUser(response.data);
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center rounded-lg px-3 md:px-0 font-outfit">
      <div className="flex flex-1 gap-4 flex-col items-center justify-center md:flex-row h-full mx-auto rounded-lg">
        {/* Image */}
        <div
          className="md:w-[50%] h-full md:h-screen relative md:flex flex-col pt-4 items-center justify-center"
          style={{
            backgroundImage: "url('/images/abstract-bg.avif')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full p-3 flex items-center justify-center flex-col gap-2 md:w-[80%] text-center">
            {/* Logos */}
            <img
              src="/images/annsMedicare.png"
              alt="Anns mediCare Logo"
              className="h-[36px] object-cover"
            />
            <h1 className="text-2xl">Consultancy Booking App</h1>
            <ul className="hidden md:flex flex-col gap-1 items-start">
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
        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-6 w-full flex-1">
          <h1 className="text-2xl mb-4 font-semibold whitespace-normal">
            Login
          </h1>

          <div className="mb-4 md:w-1/2 space-y-4">
            {/* email */}
            <label className="text-sm font-medium text-gray-900 flex flex-col gap-3">
              Email
              <input
                type="email"
                placeholder="Enter your email..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email"
              />
            </label>

            {/* password */}
            <label className="text-sm font-medium text-gray-900 flex flex-col gap-3">
              Password
              <input
                type="password"
                placeholder="Enter your password..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
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
            className="text-white bg-primaryBlue hover:bg-primaryBlue/85 font-medium rounded-md text-lg w-full md:w-1/2 py-3 text-center transition duration-300 ease-in-out"
            disabled={loading}
          >
            Login
          </button>

          <Link to={"signup"} className="py-4 block">
            Don&apos;t have an account?{" "}
            <span className="text-primaryGreen">Sign Up</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
