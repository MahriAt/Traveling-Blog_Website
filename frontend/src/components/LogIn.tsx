import { useState } from "react";
import '../styles/LogIn.css'
import { AUTHOR } from "../data/constants";
type FormData = {
    username: string,
    password: string
}



export default function LogIn(){
    const [author, setAuthor] = useState(false);
    const [logIn, setLogIn] = useState(true);

    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: ""
    });

    const [status, setStatus] = useState<"idle" | "loading" | "loggedIn" | "error">("idle");
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Authentication failed");

        const data = await response.json();
        console.log(data);

        setStatus("loggedIn");
        AUTHOR.isAuthenticated = true;
        setFormData({ username: "", password: "" });
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
        setTimeout(() => {
            setLogIn(false);
        }, 2000);
    };

    return (
        <div className={`author-login ${logIn ? 'active' : ''}`}>
            <div className={`login-question ${author ? 'deactive' : ''}`}>
            <h3>Are you an Author of this blog?</h3>
            <div style={{display: "flex", justifyContent: "center", gap: 10}}>
            <button onClick={() => setAuthor(!author)}>Yes</button>
            <button onClick={() => setLogIn(!logIn)}>No</button>
            </div>
            </div>

            {author && (
                <>
                <div style={{display: status === "idle" ? "flex" : "none"}}>
                    <form className="login-form" onSubmit={handleLogin}>
                        <h3>Log In</h3>
                        <div className="form-group">
                            <label htmlFor="name">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="text"
                                placeholder="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" disabled={status === "loading"}>
                            {status === "loading" ? "..." : "Log In"}
                        </button>
                    </form>
                </div>
                <div style={{justifyContent: "center", display: status === "loggedIn" ? "flex" : "none" } }>
                    <h2 style={{ color: "black"}} >You are logged In!</h2>
                </div>
                </>
            )}
        </div>
    );
}