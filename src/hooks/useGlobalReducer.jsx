//gestiona state (agenda, contactos, errores), fuente única de verdad
import React, { createContext, useReducer, useContext } from 'react';
import { ContactActions } from '../store/contactStore';
import { AgendaActions } from '../store/agendaStore';

const GlobalContext = createContext();

const initialState = {
  currentAgenda: null,
  contacts: [],
  agendas: [],
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case ContactActions.LOAD_CONTACTS:
      return { ...state, contacts: action.payload };
    case ContactActions.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };
    case ContactActions.DELETE_CONTACT:
      return { ...state, contacts: state.contacts.filter(c => c.id !== action.payload) };
    case ContactActions.UPDATE_CONTACT: {
      const idx = state.contacts.findIndex((c) => c.id === action.payload.id);
      if (idx === -1) return state;
      const updatedContacts = [...state.contacts];
      updatedContacts[idx] = action.payload;
      return { ...state, contacts: updatedContacts };
    }
    case "SET_CURRENT_AGENDA":
      return {
        ...state,
        currentAgenda: action.payload,
        contacts: [],
        error: null
      };

    case AgendaActions.LOAD_AGENDAS:
      return { ...state, agendas: action.payload };

    case AgendaActions.DELETE_AGENDA:
      return {
        ...state,
        agendas: state.agendas.filter((a) => a.slug !== action.payload),
        currentAgenda:
          state.currentAgenda === action.payload ? null : state.currentAgenda,
        contacts:
          state.currentAgenda === action.payload ? [] : state.contacts
      };

    case ContactActions.SET_ERROR:
    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }

};
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalReducer = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalReducer debe usarse dentro de StoreProvider");
  return context;
};