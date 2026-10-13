import backend from "../services/backend";

function Filter({
  type,
  onChange,
  filter,
  persons,
  setPersons,
  setNewNumber,
  setNewName,
  setEditingPersonId,
}) {
  if (type === "input") {
    return (
      <div>
        filter shown with: <input value={filter} onChange={onChange} />
      </div>
    );
  }

  if (type === "list") {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase()),
    );

    // delete button
    function OnDelete(person) {
      const confirmed = window.confirm(`Delete ${person.name}?`);

      if (confirmed) {
        backend.deletePerson(person.id).then((deletdPerson) => {
          const newPhonebook = persons.filter(
            (person) => person.id !== deletdPerson.id,
          );
          setPersons(newPhonebook);
        });
      } else {
        return;
      }
    }

    return (
      <div>
        {filteredPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => OnDelete(person)}>delete</button>
            <button
              onClick={() => {
                setNewName(person.name);
                setNewNumber(person.number);
                setEditingPersonId(person.id);
              }}
            >
              edit
            </button>
          </p>
        ))}
      </div>
    );
  }
}

export default Filter;
