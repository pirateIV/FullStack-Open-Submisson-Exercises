import axios from 'axios';

const baseUrl = 'http://localhost:3000/contacts';

const getContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(({data}) => data)
};
export default { getContacts };
