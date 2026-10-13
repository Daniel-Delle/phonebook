import backend from "../services/backend";

function Form({
  newName,
  newNumber,
  nameOnChange,
  numberOnChange,
  persons,
  setPersons,
  setNewName,
  setNewNumber,
  setSuccessMsg,
  setErrorMsg,
  editingPersonId,
  setEditingPersonId,
}) {
  // setting message that shows new name added or updated to null
  const successMsgTimeout = setTimeout(() => {
    setSuccessMsg(null);
  }, 3000);

  const errorMsgTimeout = setTimeout(() => {
    setSuccessMsg(null);
  }, 3000);

  // handling form submission
  const addNameAndNumber = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // updating an existing person
    if (editingPersonId !== null) {
      backend
        .updatePerson(editingPersonId, newPerson)
        .then((updatedPerson) => {
          const updatedPersons = persons.map((person) =>
            person.id === editingPersonId ? updatedPerson : person,
          );

          setPersons(updatedPersons);
          setSuccessMsg(`${updatedPerson.name} has been changed`);
          setEditingPersonId(null);
          setNewName("");
          setNewNumber("");
          successMsgTimeout;
        })
        .catch(() => {
          setErrorMsg(
            `Information of ${newName} has already been removed from the server`,
          );
          errorMsgTimeout;
        });

      return;
    }

    // creating a new person in the phonebook
    backend.createPerson(newPerson).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      setNewName("");
      setNewNumber("");
      setSuccessMsg("added to phonebook");
      successMsgTimeout;
    });
  };

  return (
    <div>
      <form onSubmit={addNameAndNumber}>
        <div>
          name: <input value={newName} onChange={nameOnChange} /> <br />
          number: <input value={newNumber} onChange={numberOnChange} />
        </div>
        <div>
          <button type="submit">
            {editingPersonId === null ? "add" : "update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
