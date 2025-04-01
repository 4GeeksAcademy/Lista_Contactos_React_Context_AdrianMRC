import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Demo } from "./pages/Demo";
import { Contact } from "./pages/Contact";
import { AddContact } from "./pages/AddContact";
import { Error } from "./pages/Error";


export const router = createBrowserRouter(
    createRoutesFromElements(
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<Error />} >
        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/home" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact/:id" element={<AddContact />} />
      </Route>
    )
);