import axios from 'axios';

const baseUrl = `http://localhost:9000/api`;

export const getAll = async (url) => {
  const {
    data
  } = await axios.get(`${baseUrl}/${url}`); 

  return data.items;
};
//de url bevat de Id al
export const getById = async (url) => {
  const {
    data
  } = await axios.get(`${baseUrl}/${url}`); 

  return data.items;
};

export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};

export const save = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${baseUrl}/${url}/${id ?? ''}`,
    data: values,
  });
};
