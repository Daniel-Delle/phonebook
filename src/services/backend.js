import axios from "axios";
const baseUrl = "http://localhost:3009/persons";

const newPersons = {
  name: "",
  number: "",
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updatePerson = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
  return request.then((response) => response.data);
};

const editPerson = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};

export default {
  getAll: getAll,
  createPerson: createPerson,
  deletePerson: deletePerson,
  updatePerson: updatePerson,
  editPerson: editPerson
};
