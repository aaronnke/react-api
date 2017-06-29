import axios from 'axios';

export default {
  fetchProjects: (search) => {
    let url = 'http://localhost:3000/projects';
    if (search) url += `?search=${search}`;
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
  getPresignedUrl: () => {
    const url = 'http://localhost:3000/projects/new';
    return axios.get(url)
      .then(response =>
        response.data,
    );
  },
  uploadImage: (url, img) =>
    axios.put(url, img, {
      headers: {
        'Content-Type': img.type,
      },
    }).then((response) => {
      let imageUrl = response.config.url;
      imageUrl = imageUrl.slice(0, imageUrl.indexOf('?'));
      return imageUrl;
    },
  ),
  createProject: (project) => {
    const url = 'http://localhost:3000/projects';
    return axios.post(url, project)
      .then(response =>
      response.data);
  },
  createUser: (params) => {
    const url = 'http://localhost:3000/users';
    return axios.post(url, { user: params })
      .then(response =>
      response.data);
  },
};
