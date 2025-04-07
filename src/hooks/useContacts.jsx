import { useEffect, useCallback } from "react";    // Añade import
import { useGlobalReducer } from "./useGlobalReducer";
import { contactOperations } from "../store/contactStore";

export function useContacts() {
    const { state, dispatch } = useGlobalReducer();
    const agendaSlug = state.currentAgenda;

    const loadContacts = useCallback(async () => {
        if (!agendaSlug) return;
        try {
            await contactOperations.loadContacts(agendaSlug, dispatch);
        } catch (err) {
            console.error("Error cargando contactos:", err.message);
        }
    }, [agendaSlug, dispatch]);

    useEffect(() => {
        if (agendaSlug) loadContacts();
    }, [loadContacts]);

    async function addContact(newContact) {
        if (!agendaSlug) return;
        await contactOperations.createContact(agendaSlug, newContact, dispatch);
    }

    async function updateContact(id, updatedContact) {
        if (!agendaSlug) return;
        await contactOperations.updateContact(agendaSlug, id, updatedContact, dispatch);
    }

    async function deleteContact(id) {
        if (!agendaSlug) return;
        await contactOperations.deleteContact(agendaSlug, id, dispatch);
    }

    return {
        contacts: state.contacts,
        error: state.error,
        agendaSlug,
        loadContacts,
        addContact,
        updateContact,
        deleteContact
    };
}
