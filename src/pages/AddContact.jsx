import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddContact = () => {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado añadido

  useEffect(() => {
    if (id) {
      const contact = store.contacts.find(c => c.id === parseInt(id));
      if (contact) setForm(contact);
    }
  }, [id, store.contacts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!store.currentAgenda) {
      toast.error("¡Selecciona una agenda primero!");
      setIsSubmitting(false);
      return;
    }

    try {
      const baseUrl = `https://playground.4geeks.com/contact/agendas/${store.currentAgenda}/contacts`;
      const url = id ? `${baseUrl}/${id}` : baseUrl;

      const response = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.detail?.[0]?.msg || data.detail || "Error desconocido";
        throw new Error(errorMessage);
      }

      dispatch({ type: id ? "UPDATE_CONTACT" : "ADD_CONTACT", payload: data });
      toast.success(`Contacto ${id ? "actualizado" : "creado"} correctamente 🎉`);
      navigate("/contacts");

    } catch (error) {
      toast.error(error.message || "Error crítico al guardar");
      console.error("Detalle del error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar" : "Nuevo"} Contacto</h2>
      <Link
        to="/contacts"
        className="btn btn-outline-secondary mb-2"
      >
        <i className="fas fa-arrow-left me-2"></i>
        Volver a Contactos
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre completo"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Teléfono"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Dirección"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};