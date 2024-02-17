import axios from 'axios';

const baseUrl = '/api/persons';

const getContacts = async () => {
  // axios(url) - send a GET request default method
  const request = axios(baseUrl);
  const { data } = await request;
  return data;
};

const createContact = async (contactObj) => {
  const request = axios.post(baseUrl, contactObj);
  const { data } = await request;
  return data;
};

const deleteContact = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const { data } = await request;
  return data;
};

const updateContact = async (id, updatedObj) => {
  const response = axios.put(`${baseUrl}/${id}`, updatedObj);
  const { data } = await response;
  return data;
};

export default { getContacts, createContact, deleteContact, updateContact };
