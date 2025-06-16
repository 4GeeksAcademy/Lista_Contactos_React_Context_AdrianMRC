import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Demo } from "./pages/Demo";
import { Contact } from "./pages/Contact";
import { AddContact } from "./pages/AddContact";
import { Error } from "./pages/Error";
import { AgendaSelector } from "./components/AgendaSelector";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />} >
      <Route path="/home" element={<Home />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/agenda-selector" element={<AgendaSelector />} />
      <Route path="/contacts" element={<Contact />} />
      <Route path="/add-contact" element={<AddContact />} />
      <Route path="/edit-contact/:id" element={<AddContact />} />
    </Route>
  )
);
