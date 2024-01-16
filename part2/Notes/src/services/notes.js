import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/notes';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(reponse => reponse.data);
};

const create = newObject => {
  const request = axios.post(newObject);
  return request.then(reponse => reponse.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

export default { getAll, create, update };
