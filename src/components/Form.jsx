import backend from "../services/backend";
import Notification from "./Notification";

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

    // handling duplicate names and replacing numbers if there are duplicate names
    // variables containing array methods some and find to check for duplicates
    const exists = persons.some((person) => {
      return person.name === newName;
    });

    const personId = persons.find((person) => {
      return person.name === newName;
    });

    // replacing old numbers with new ones
    if (exists) {
      const confirmed = window.confirm(
        `${personId.name} is already added to the phonebook, replace the old number with a new one?`,
      );
      if (confirmed) {
        backend
          .updatePerson(personId.id, newPerson)
          .then((updatedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id === personId.id ? updatedPerson : person,
            );
            (setPersons(updatedPersons),
              setSuccessMsg(`${personId.name} has been changed`));
            successMsgTimeout;
          })
          .catch(() => {
            setErrorMsg(
              `Information of ${personId.name} has already been removed from the server`,
            );
            errorMsgTimeout;
          });
      } else {
        alert(`${newName} with phone number ${newNumber} could not be added`);
        return;
      }

      // creating a new person in the phonebook
    } else {
      // updating phonebook
      backend.createPerson(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
      });

      setNewName("");
      setNewNumber("");
      setSuccessMsg("added to phonebook");
      successMsgTimeout;
    }
  };

  return (
    <div>
      <form onSubmit={addNameAndNumber}>
        <div>
          name: <input value={newName} onChange={nameOnChange} /> <br />
          number: <input value={newNumber} onChange={numberOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
