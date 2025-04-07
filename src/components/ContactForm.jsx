import { useState, useEffect } from 'react';
export function ContactForm({ initialData, onSubmit, submitting }) {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="form-control"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={submitting}
      >
        {submitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
