import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useContacts } from '../hooks/useContacts';
import { toast } from 'react-toastify';
import { ContactForm } from '../components/ContactForm';

export const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    agendaSlug,
    contacts,
    addContact,
    updateContact
  } = useContacts();

  const [initialData, setInitialData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && contacts?.length) {
      const found = contacts.find(c => c.id === parseInt(id));
      if (found) setInitialData(found);
    }
  }, [id, contacts]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      if (id) {
        await updateContact(id, data);
        toast.success('Contacto actualizado correctamente 🎉');
      } else {
        await addContact(data);
        toast.success('Contacto creado correctamente 🎉');
      }
      navigate('/contacts');
    } catch (error) {
      toast.error(error.message || 'Error guardando contacto');
    } finally {
      setLoading(false);
    }
  };

  if (!agendaSlug) return <p>Selecciona una agenda para añadir contactos</p>;

  return (
    <div className="container mt-4">
      <h2>{id ? 'Update' : 'New'} Contact</h2>

      <Link to="/contacts" className="btn btn-outline-secondary mb-3">
        <i className="fas fa-arrow-left me-2"></i>Back to contacts
      </Link>

      <ContactForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitting={loading}
      />
    </div>
  )
};
