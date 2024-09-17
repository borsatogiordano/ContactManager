import { useEffect, useState } from "react";
import { Header } from "./components/Header/header";
import { ContactPreview } from "./components/ContactPreview/contact";
import { STORAGE_SERVICE } from "./services/storage.js";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [mail, setMail] = useState("");

  // Carregar contatos do localStorage ao iniciar o app
  useEffect(() => {
    const savedContacts = STORAGE_SERVICE.listContacts();
    setContacts(savedContacts);
  }, []);

  // Função para adicionar novo contato
  function addNewContact(e) {
    e.preventDefault(); // Evita o reload da página
    if (!name || !tel || !mail) {
      return alert("Todos os campos são obrigatórios");
    }

    STORAGE_SERVICE.createContact(name, tel, mail); // Salvar contato no localStorage
    const updatedContacts = STORAGE_SERVICE.listContacts(); // Atualizar a lista de contatos
    setContacts(updatedContacts);

    // Limpar os campos do formulário após adicionar
    setName("");
    setTel("");
    setMail("");
  }

  return (
    <>
      <Header />
      <main>
        <aside className="ContactList">
          <header className="ContactListHeader">
            <form action="">
              <input type="text" placeholder="Busque um contato:" />
              <button></button>
            </form>
          </header>
          <section className="ContactForm">
            <form onSubmit={addNewContact}>
              <legend>Adicionar contato</legend>
              <input
                type="text"
                placeholder="Nome:"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Telefone:"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
              <input
                type="email"
                placeholder="E-mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <button type="submit">Adicionar</button>
            </form>
          </section>
          <section className="ContactListMain">
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <ContactPreview key={index} contact={contact} />
              ))
            ) : (
              <p>Nenhum contato encontrado</p>
            )}
          </section>
        </aside>
        <section></section>
      </main>
    </>
  );
}

export default App;

// estado para controlar oq vai ser exibido, pode ser string formAdd, se clicar em outro formList
