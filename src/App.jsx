import { useEffect, useState } from "react";

import backend from "./services/backend";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";

function App() {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [persons, setPersons] = useState([]);

  // Making state of value and onChange tally
  const handleValueState = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberState = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterState = (event) => {
    setFilter(event.target.value);
  };

  // adding names to server

  // fetching phonebook names from server
  useEffect(() => {
    backend.getAll().then((phonebook) => {
      setPersons(phonebook);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification successMsg={successMsg} errorMsg={errorMsg} />

      {/* filter component that shows search box */}
      <Filter type={"input"} onChange={handleFilterState} filter={filter} />

      <h2>add a new</h2>

      {/* component that handles form */}
      <Form
        nameOnChange={handleValueState}
        numberOnChange={handleNumberState}
        newName={newName}
        newNumber={newNumber}
        persons={persons}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setSuccessMsg={setSuccessMsg}
        setErrorMsg={setErrorMsg}
      />

      <h2>Numbers</h2>

      {/* filter component that filters names in phonebook */}
      <Filter
        type={"list"}
        persons={persons}
        filter={filter}
        setPersons={setPersons}
      />
    </div>
  );
}

export default App;
