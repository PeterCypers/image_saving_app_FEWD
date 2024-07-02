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

// oude methode:
/* 
export const save = async (url, form) => {
  const foto = form.get("fotoFile");
  const userID = form.get("userID");
  const dateUploaded = form.get("dateUploaded");
  // test data:
  console.log(`${foto}\n${userID}\n${dateUploaded}`);
  // end test
  // await axios({
  //   method: 'POST',
  //   url: `${baseUrl}/${url}/`,
  //   data: form, //just send the FormData object
  //   headers: form.getHeaders(),
  // });
  await axios.postForm(`${baseUrl}/${url}/`,form);
};
*/


// nieuwe methode:
export const save = async (url, formData) => {
  try {
    const response = await axios.post(`${baseUrl}/${url}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
