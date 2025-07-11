import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    setResponseMsg(data.message);
    setName("");
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Hello User 👋</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: 10, fontSize: 16 }}
        />
        <button type="submit" style={{ marginLeft: 10, padding: 10 }}>
          Submit
        </button>
      </form>
      {responseMsg && <p style={{ marginTop: 20 }}>{responseMsg}</p>}
    </main>
  );
}
