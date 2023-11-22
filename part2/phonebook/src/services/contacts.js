import axios from 'axios';

const baseUrl = 'http://localhost:3000/contacts';

const getContacts = () => {
  // axios(url) - send a GET request default method
  const request = axios(baseUrl)
  return request.then(({data}) => data)
};

const createContact = (contactObj) => {
  const request = axios.post(baseUrl, contactObj)
  return request.then(({data}) => data)
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(({data}) => data)
}

export default { getContacts, createContact, deleteContact };
