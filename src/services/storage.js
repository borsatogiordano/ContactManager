const DB_KEY = "@test";

export const STORAGE_SERVICE = {
  // List Contacts
  listContacts: () => {
    const storage = localStorage.getItem(DB_KEY);

    if (storage) {
      return JSON.parse(storage);
    }
    return [];
  },

  // Create Contact
  createContact: (contactName, contactTel, contactMail) => {
    const storage = localStorage.getItem(DB_KEY);

    if (!contactName || !contactTel || !contactMail) {
      return alert("Todos os campos são obrigatórios");
    }

    const newContact = {
      name: contactName,
      tel: contactTel,
      mail: contactMail,
    };

    if (storage) {
      const storageParsed = JSON.parse(storage);

      const contacts = [...storageParsed, newContact];

      return localStorage.setItem(DB_KEY, JSON.stringify(contacts));
    }

    return localStorage.setItem(DB_KEY, JSON.stringify([newContact]));
  },

  deleteContact: (contactName) => {
    const storage = localStorage.getItem(DB_KEY);

    if (storage) {
      const storageParsed = JSON.parse(storage);

      const filteredContacts = storageParsed.filter(
        (item) => item.name !== contactName
      );

      return localStorage.setItem(DB_KEY, JSON.stringify(filteredContacts));
    }

    return alert("Contato não encontrado");
  },

  updateContactState: (contactName) => {
    const storage = localStorage.getItem(DB_KEY);

    if (storage) {
      const storageParsed = JSON.parse(storage);

      const updatedContacts = storageParsed.map((item) => {
        if (item.name === contactName) {
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        }
        return item;
      });

      return localStorage.setItem(DB_KEY, JSON.stringify(updatedContacts));
    }

    alert("Contato não encontrado");
    return false;
  },
};
