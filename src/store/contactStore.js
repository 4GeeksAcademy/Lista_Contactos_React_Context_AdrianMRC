import ApiClient from '../services/apiCommunicator';

export const ContactActions = {
  LOAD_CONTACTS: "LOAD_CONTACTS",
  ADD_CONTACT: "ADD_CONTACT",
  UPDATE_CONTACT: "UPDATE_CONTACT",
  DELETE_CONTACT: "DELETE_CONTACT",
  SET_ERROR: "SET_ERROR",
};

export const contactOperations = {
  loadContacts: async (agendaSlug, dispatch) => {
    try {
      const contacts = await ApiClient.Contacts.getByAgenda(agendaSlug);
      dispatch({ type: ContactActions.LOAD_CONTACTS, payload: contacts });
    } catch (error) {
      dispatch({ type: ContactActions.SET_ERROR, payload: "Error cargando contactos: " + error.message });
    }
  },

  createContact: async (agendaSlug, contact, dispatch) => {
    try {
      await ApiClient.Contacts.create(agendaSlug, contact);
      await contactOperations.loadContacts(agendaSlug, dispatch);
    } catch (error) {
      throw new Error(error.message || "Error creando contacto");
    }
  },

  updateContact: async (agendaSlug, id, contact, dispatch) => {
    try {
      const updated = await ApiClient.Contacts.update(agendaSlug, id, contact);
      dispatch({
        type: ContactActions.UPDATE_CONTACT,
        payload: { id, ...contact, ...updated },
      });
      await contactOperations.loadContacts(agendaSlug, dispatch);
    } catch (error) {
      throw new Error(error.message || "Error actualizando contacto");
    }
  },

  deleteContact: async (agendaSlug, id, dispatch) => {
    try {
      await ApiClient.Contacts.delete(agendaSlug, id);
      await contactOperations.loadContacts(agendaSlug, dispatch);
    } catch (error) {
      dispatch({ type: ContactActions.SET_ERROR, payload: "Error eliminando contacto: " + error.message });
    }
  },
};
