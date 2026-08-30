import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        console.log("Registration Data:", formData);

        // API call will go here later
        const response = await API.post(
            "/auth/registration",
            formData
        );

        console.log("Backend response:", response.data);
        navigate("/auth/login");
    };

    return (
        <div className="min-h-screen bg-[#033E3E] flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md rounded-3xl bg-[#E8F1F1] p-8 sm:p-10 shadow-2xl">

                {/* Header */}
                <div className="mb-8 text-center">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[4px] text-[#4C8888]">
                        Get Started
                    </p>

                    <h1 className="text-4xl font-bold text-[#033E3E]">
                        Create Account
                    </h1>

                    <p className="mt-3 text-sm text-[#587575]">
                        Register and start your Real World journey.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Username */}
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            className="
                peer w-full rounded-xl border-2 border-[#92C7C7]
                bg-white px-4 pt-5 pb-2 text-[#033E3E]
                outline-none transition
                focus:border-[#033E3E]
                focus:ring-4 focus:ring-[#92C7C7]/40
              "
                        />

                        <label
                            className="
                absolute left-4 top-1/2 -translate-y-1/2
                bg-transparent px-1 text-sm text-[#587575]
                pointer-events-none transition-all
                peer-focus:top-1
                peer-focus:-translate-y-1
                peer-focus:bg-[#E8F1F1]
                peer-focus:text-xs
                peer-focus:text-[#033E3E]
                peer-not-placeholder-shown:top-1
                peer-not-placeholder-shown:-translate-y-1
                peer-not-placeholder-shown:bg-[#E8F1F1]
                peer-not-placeholder-shown:text-xs
              "
                        >
                            Username
                        </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            className="
                peer w-full rounded-xl border-2 border-[#92C7C7]
                bg-white px-4 pt-5 pb-2 text-[#033E3E]
                outline-none transition
                focus:border-[#033E3E]
                focus:ring-4 focus:ring-[#92C7C7]/40
              "
                        />

                        <label
                            className="
                absolute left-4 top-1/2 -translate-y-1/2
                bg-transparent px-1 text-sm text-[#587575]
                pointer-events-none transition-all
                peer-focus:top-1
                peer-focus:-translate-y-1
                peer-focus:bg-[#E8F1F1]
                peer-focus:text-xs
                peer-focus:text-[#033E3E]
                peer-not-placeholder-shown:top-1
                peer-not-placeholder-shown:-translate-y-1
                peer-not-placeholder-shown:bg-[#E8F1F1]
                peer-not-placeholder-shown:text-xs
              "
                        >
                            Email Address
                        </label>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            className="
                peer w-full rounded-xl border-2 border-[#92C7C7]
                bg-white px-4 pt-5 pb-2 pr-20
                text-[#033E3E] outline-none transition
                focus:border-[#033E3E]
                focus:ring-4 focus:ring-[#92C7C7]/40
              "
                        />

                        <label
                            className="
                absolute left-4 top-1/2 -translate-y-1/2
                bg-transparent px-1 text-sm text-[#587575]
                pointer-events-none transition-all
                peer-focus:top-1
                peer-focus:-translate-y-1
                peer-focus:bg-[#E8F1F1]
                peer-focus:text-xs
                peer-focus:text-[#033E3E]
                peer-not-placeholder-shown:top-1
                peer-not-placeholder-shown:-translate-y-1
                peer-not-placeholder-shown:bg-[#E8F1F1]
                peer-not-placeholder-shown:text-xs
              "
                        >
                            Password
                        </label>

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="
                absolute right-4 top-1/2
                -translate-y-1/2 text-xs font-bold
                text-[#033E3E] hover:text-[#4C8888]
              "
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            className="
                peer w-full rounded-xl border-2 border-[#92C7C7]
                bg-white px-4 pt-5 pb-2 pr-20
                text-[#033E3E] outline-none transition
                focus:border-[#033E3E]
                focus:ring-4 focus:ring-[#92C7C7]/40
              "
                        />

                        <label
                            className="
                absolute left-4 top-1/2 -translate-y-1/2
                bg-transparent px-1 text-sm text-[#587575]
                pointer-events-none transition-all
                peer-focus:top-1
                peer-focus:-translate-y-1
                peer-focus:bg-[#E8F1F1]
                peer-focus:text-xs
                peer-focus:text-[#033E3E]
                peer-not-placeholder-shown:top-1
                peer-not-placeholder-shown:-translate-y-1
                peer-not-placeholder-shown:bg-[#E8F1F1]
                peer-not-placeholder-shown:text-xs
              "
                        >
                            Confirm Password
                        </label>

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                            }
                            className="
                absolute right-4 top-1/2
                -translate-y-1/2 text-xs font-bold
                text-[#033E3E] hover:text-[#4C8888]
              "
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="
              w-full rounded-xl bg-[#033E3E]
              py-4 font-bold text-white
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-[#075858]
              hover:shadow-xl
            "
                    >
                        Register Account
                    </button>
                </form>

                {/* Login */}
                <p className="mt-7 text-center text-sm text-[#587575]">
                    Already have an account?{" "}
                    <Link
                        to="/auth/login" method="GET"
                        className="font-bold text-[#033E3E] hover:text-[#4C8888]"
                    >
                        Login Account
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;