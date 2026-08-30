import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Forgot Password Email:", email);

        const response = await API.post(
            "/auth/forgotpassword",
            { email }
        );

        console.log("backendresponse:", response.data)
    };

    return (
        <div className="min-h-screen bg-[#033E3E] flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md rounded-3xl bg-[#E8F1F1] p-8 sm:p-10 shadow-2xl">

                {/* Header */}
                <div className="mb-8 text-center">

                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#033E3E]">
                        <span className="text-2xl text-[#92C7C7]">
                            ?
                        </span>
                    </div>

                    <p className="mb-2 text-xs font-bold uppercase tracking-[4px] text-[#4C8888]">
                        Account Recovery
                    </p>

                    <h1 className="text-4xl font-bold text-[#033E3E]">
                        Forgot Password?
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-[#587575]">
                        Enter your email address and we'll send you instructions
                        to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" "
                            required
                            className="
                peer w-full rounded-xl border-2 border-[#92C7C7]
                bg-white px-4 pt-5 pb-2
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
                            Email Address
                        </label>
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
                        Send Reset Link
                    </button>
                </form>

                {/* Back to Login */}
                <div className="mt-7 text-center">
                    <Link
                        to="/auth/login"
                        className="text-sm font-bold text-[#033E3E] hover:text-[#4C8888]"
                    >
                        ← Back to Login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;