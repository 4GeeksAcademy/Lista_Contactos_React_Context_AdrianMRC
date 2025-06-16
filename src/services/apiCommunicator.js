// Funciones puramente de comunicación a la API REST
const BASE_URL = "https://playground.4geeks.com/contact";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

const ApiClient = {
  // ======================== AGENDAS ========================
  Agendas: {
    getAll: () =>
      fetch(`${BASE_URL}/agendas`)
        .then(handleResponse)
        .then((data) => data.agendas),

    create: async (name) => {
      const response = await fetch(`${BASE_URL}/agendas/${name}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Error creando agenda");

      const data = await response.json();

      if (!data.slug) throw new Error("No se recibió slug de la agenda");

      return data;
    },

    delete: (slug) =>
      fetch(`${BASE_URL}/agendas/${slug}`, {
        method: "DELETE",
      }).then((response) =>
        response.status === 204 ? null : handleResponse(response)
      ),
  },

  // ======================== CONTACTOS ========================
  Contacts: {
  getByAgenda: async (agendaSlug) => {
    const response = await fetch(`${BASE_URL}/agendas/${agendaSlug}/contacts`);
    if (response.status === 429) throw new Error('Demasiadas peticiones. Intenta otra vez en unos segundos.');
    if (!response.ok) throw new Error('La agenda no existe');
    return response.json().then(data => data.contacts || []);
  },

    create: (agendaSlug, contactData) => fetch(`${BASE_URL}/agendas/${agendaSlug}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData)
    }).then(handleResponse),

    update: async (agendaSlug, contactId, contactData) => {
      const response = await fetch(`${BASE_URL}/agendas/${agendaSlug}/contacts/${contactId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
    
      if (!response.ok) throw new Error("Error actualizando contacto");
    
      // API NO devuelve nada (204) o simplemente devuelve vacío,
      // así que para evitar "data not defined", hacemos un check:
      try {
        const data = await response.json();
        return data;
      } catch {
        // si no devuelve json, simplemente regresamos el propio contacto enviado
        return { id: contactId, ...contactData };
      }
    },

    delete: (agendaSlug, contactId) => fetch(`${BASE_URL}/agendas/${agendaSlug}/contacts/${contactId}`, {
      method: "DELETE"
    }).then(response => {
      if (response.status !== 204) throw new Error("Failed to delete contact");
      return null;
    })
  }
};

export default ApiClient;