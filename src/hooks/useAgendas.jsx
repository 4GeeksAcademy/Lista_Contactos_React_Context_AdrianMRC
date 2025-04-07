// src/hooks/useAgendas.js
import { useGlobalReducer } from "./useGlobalReducer";
import { agendaOperations } from "../store/agendaStore";

export function useAgendas() {
    const { state, dispatch } = useGlobalReducer();
    const clearCurrentAgenda = () =>
        dispatch({ type: agendaOperations.SET_CURRENT_AGENDA, payload: null });

    async function loadAgendas() {
        await agendaOperations.loadAgendas(dispatch);
    }

    async function createAgenda(name) {
        return await agendaOperations.createAgenda(name, dispatch);
    }

    async function deleteAgenda(slug) {
        return await agendaOperations.deleteAgenda(slug, dispatch);
    }

    async function loadAgendaContacts(slug) {
        return await agendaOperations.loadAgendaContacts(slug, dispatch);
    }

    return {
        agendas: state.agendas,
        currentAgenda: state.currentAgenda,
        error: state.error,
        loadAgendas,
        createAgenda,
        clearCurrentAgenda,
        deleteAgenda,
        loadAgendaContacts,
    }
}
