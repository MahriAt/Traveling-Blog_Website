import { useState } from "react";
import '../styles/Contacts.css'

interface FormData {
  name: string;
  email: string;
  message: string;}

export default function Contacts(){
    

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("sending");

  try {
    const response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to send");

    setStatus("sent");
    setFormData({ name: "", email: "", message: "" });
  } catch (err) {
    console.error(err);
    setStatus("error");
  }
};
    return(
      <div className="Contact-Container">
        <div className="leftContactMe">
          <h1>Contact Me</h1>
          <div className="contact-socialmedia">
            <a href="https://linkedin.com"><img src="./src/assets/linkedin.png"/></a>
            <a href="https://facebook.com"><img src="./src/assets/facebook.png"/></a>
            <a href="https://instagram.com"><img src="./src/assets/instagram.png"/></a>
          </div>
        </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "sent" && <p className="form-success">Message sent!</p>}
        {status === "error" && <p className="form-error">Something went wrong. Try again.</p>}
    </form>
    </div>
    );
}
