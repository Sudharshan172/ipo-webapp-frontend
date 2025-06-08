import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);

        try {
            const response = await fetch("https://ipo-webapp-backend.onrender.com/auth/signin/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Invalid credentials!");

            localStorage.setItem("token", data.access_token);  // Store token
            alert("Signin Successful!");

            // Reload the page after login so app state updates
            window.location.href="/";

            // No need to navigate here, reload will do that
            // navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-600">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                <p className="text-sm text-center mt-4">
                    New User?{" "}
                    <button onClick={() => navigate("/signupnow")} className="text-blue-500 underline">
                        Sign Up Now
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
