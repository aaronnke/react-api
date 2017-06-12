import axios from 'axios';

export default {
  fetchProjects: (search = '') => {
    const url = `http://localhost:3000/projects?search=${search}`;
    return axios.get(url)
      .then(response =>
        response.data,
      );
  },
  fetchProject: (id) => {
    const url = `http://localhost:3000/projects/${id}`;
    return axios.get(url)
      .then(response =>
        response.data,
      );
  },
  createProject: (name, price, image = '') => {
    const url = 'http://localhost:3000/projects';
    return axios.post(url, {
      name,
      price,
      image,
    }).then(response =>
      response.data);
  },
};
