// Acciones (tipos string) y funciones de API para agendas
import ApiClient from '../services/apiCommunicator';
import { ContactActions } from './contactStore';
import { toast } from "react-toastify";

export const AgendaActions = {
  LOAD_AGENDAS: "LOAD_AGENDAS",
  SET_CURRENT_AGENDA: "SET_CURRENT_AGENDA",
  DELETE_AGENDA: "DELETE_AGENDA",
};

export const agendaOperations = {
  loadAgendas: async (dispatch) => {
    try {
      const agendas = await ApiClient.Agendas.getAll();
      if (!Array.isArray(agendas)) throw new Error("Formato de respuesta inválido");
      dispatch({ type: AgendaActions.LOAD_AGENDAS, payload: agendas });
    } catch (error) {
      console.error("Error en loadAgendas:", error);
      toast.error(error.message);
    }
  },

  createAgenda: async (agendaName, dispatch) => {
    try {
      const response = await ApiClient.Agendas.create(agendaName);
      if (!response.slug) throw new Error("API no devolvió slug");
      dispatch({ type: AgendaActions.SET_CURRENT_AGENDA, payload: response.slug });
      return response;
    } catch (error) {
      throw new Error(error.message || "Nombre inválido o agenda ya existente");
    }
  },

  loadAgendaContacts: async (agendaSlug, dispatch) => {
    try {
      const contacts = await ApiClient.Contacts.getByAgenda(agendaSlug);
      dispatch({ type: AgendaActions.SET_CURRENT_AGENDA, payload: agendaSlug });
      dispatch({ type: ContactActions.LOAD_CONTACTS, payload: contacts });
    } catch (error) {
      throw new Error("Error cargando contactos: " + error.message);
    }
  },

  deleteAgenda: async (agendaSlug, dispatch) => {
    try {
      await ApiClient.Agendas.delete(agendaSlug);
      dispatch({ type: AgendaActions.DELETE_AGENDA, payload: agendaSlug });
    } catch (error) {
      throw new Error(error.message || "Error eliminando agenda");
    }
  },
};
