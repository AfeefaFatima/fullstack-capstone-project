import React, { useState } from "react";
import { useNavigate } from "react-router";
import { API } from "../services/api";

export default function LoginPage() {
    const nav = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });

    const submit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("giftlink_token");
        const response = await fetch(`${API}/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": token ? `Bearer ${token}` : "" },
                body: JSON.stringify(form)
            }
        );
        const data = await response.json();

        if (!response.ok)
            throw new Error(data.message || "Login failed");

        localStorage.setItem("giftlink_token", data.token);
        localStorage.setItem("giftlink_user", JSON.stringify(data.user));
        nav("/")
    };
    return
    <form onSubmit={submit}>
        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

        <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        
        <button>Login</button>
    </form>
}
