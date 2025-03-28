// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import { storeReducer, initialStore } from "../store";  // Import the reducer and the initial state.


const StoreContext = createContext()


export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore, () => ({ ...initialStore }));
    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}