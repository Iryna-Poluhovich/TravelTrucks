'use client';

import { useState } from "react";
import css from "./BookingForm.module.css";

interface Props {
  camperId: string;
  camperName: string;
  price: number;
}

export default function BookingForm({ camperId, camperName, price }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);

  const total = (price || 0) * days;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || days < 1) {
      alert("Please fill name, email and days.");
      return;
    }
    setLoading(true);
    try {
      // mock send — your real implementation would POST to backend
      await new Promise((r) => setTimeout(r, 700));
      alert(`Booking successful for ${camperName}. Total: €${total.toFixed(2)}`);
      setName(""); setEmail(""); setDays(1);
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={css.form} onSubmit={submit}>
      <h3>Book {camperName}</h3>
      <label>Name
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label>Days
        <input type="number" min={1} value={days} onChange={(e) => setDays(Number(e.target.value))} />
      </label>

      <div className={css.total}>Total: €{total.toFixed(2)}</div>

      <button type="submit" disabled={loading}>{loading ? "Booking..." : "Book now"}</button>
    </form>
  );
}