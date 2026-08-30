
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../../api/axios";


const ResetPassword = () => {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const { resetToken: token } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            console.log("Reset token:", token);
            console.log("New password:", formData.password);

            // Your backend reset-password API will go here.
            // Example structure:
            //

            const response = await API.post(
                `/auth/resetpassword/${token}`,
                {
                    password: formData.password,
                }
            );

            setMessage("Password reset successfully.");

            // After successful reset:
            // navigate("/login");

        } catch (err) {
            console.error("Password reset error:", err);
            setError("Unable to reset password. The link may be invalid or expired.");
        }
    };

    return (
        <div className="min-h-screen bg-[#033E3E] flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md rounded-3xl bg-[#E8F1F1] p-8 sm:p-10 shadow-2xl">

                {/* Header */}
                <div className="mb-8 text-center">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[4px] text-[#4C8888]">
                        Account Recovery
                    </p>

                    <h1 className="text-4xl font-bold text-[#033E3E]">
                        Reset Password
                    </h1>

                    <p className="mt-3 text-sm text-[#587575]">
                        Enter your new password below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* New Password */}
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
                            New Password
                        </label>

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
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

                    {/* Error */}
                    {error && (
                        <p className="text-sm font-semibold text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Success */}
                    {message && (
                        <p className="text-sm font-semibold text-green-700">
                            {message}
                        </p>
                    )}

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
                        Reset Password
                    </button>

                </form>

                {/* Login */}
                <p className="mt-7 text-center text-sm text-[#587575]">
                    Remember your password?{" "}
                    <Link
                        to="/auth/login"
                        className="font-bold text-[#033E3E] hover:text-[#4C8888]"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default ResetPassword;

