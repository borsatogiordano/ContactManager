const DB_KEY = "@test";

export const STORAGE_SERVICE = {
  // Listar contatos
  listContacts: () => {
    const storage = localStorage.getItem(DB_KEY);
    return storage ? JSON.parse(storage) : [];
  },

  // Criar novo contato
  createContact: (contactName, contactTel, contactMail) => {
    const storage = STORAGE_SERVICE.listContacts();

    if (!contactName || !contactTel || !contactMail) {
      return alert("Todos os campos são obrigatórios");
    }

    const newContact = {
      id: Date.now(), // Cria um ID único baseado no timestamp
      name: contactName,
      tel: contactTel,
      mail: contactMail,
    };

    const updatedContacts = [...storage, newContact];
    localStorage.setItem(DB_KEY, JSON.stringify(updatedContacts));

    return newContact; // Retorna o novo contato
  },

  // Atualizar contato existente
  updateContact: (contactId, updatedContact) => {
    const storage = STORAGE_SERVICE.listContacts();

    const contactIndex = storage.findIndex((item) => item.id === contactId);
    if (contactIndex === -1) {
      return alert("Contato não encontrado");
    }

    storage[contactIndex] = { ...storage[contactIndex], ...updatedContact };

    localStorage.setItem(DB_KEY, JSON.stringify(storage));

    return storage[contactIndex]; // Retorna o contato atualizado
  },

  // Deletar contato
  deleteContact: (contactId) => {
    const storage = STORAGE_SERVICE.listContacts();

    const updatedContacts = storage.filter((item) => item.id !== contactId);

    if (storage.length === updatedContacts.length) {
      return alert("Contato não encontrado");
    }

    localStorage.setItem(DB_KEY, JSON.stringify(updatedContacts));
    return true; // Retorna sucesso na exclusão
  },

  // Função de utilidade para buscar um contato por ID
  getContactById: (contactId) => {
    const storage = STORAGE_SERVICE.listContacts();
    return storage.find((contact) => contact.id === contactId) || null;
  },
};
