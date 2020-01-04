import axios from 'axios';

export async function getAll() {
  return axios.get('https://backendthesis.herokuapp.com/data');
}

export async function update(id, body) {
  return axios.put(`https://backendthesis.herokuapp.com/data/${id}`, body);
}
export async function post(body) {
  return axios.post('https://backendthesis.herokuapp.com/data', body);
}

export async function remove(id) {
  return axios.delete(`https://backendthesis.herokuapp.com/data/${id}`);
}
