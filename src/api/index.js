import axiosRoot from 'axios';

// TODO: (easy reference, remove) `http://localhost:9000/api/`;
const baseUrl = import.meta.env.VITE_API_URL;

// nu zal vöör elk axios request automatisch de baseUrl geplakt worden
const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token) => {
  if (token) {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}` -> blackbox ai generated
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
};

// zal niet meer gebruikt worden? -> outdated: alle fotos (niet op userID)
// toch wel getAll zal alle fotos voor ingelogde user geven
export const getAll = async (url) => {
  const {
    data
  } = await axios.get(url); 

  return data.items;
};

//de url = old: Id get all by userID (zal veranderen naar vb: getById fotoID)
export const getById = async (url) => {
  const {
    data
  } = await axios.get(url); 

  return data.items;
};

export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${url}/${id}`);
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

//create
//update
/**
 * addPhotoToAlbum ->
 * 
 * @param {*} url 
 * @param {*} param1 
 */
export const addPhotoToAlbumRequest = async(url, { arg: body }) => {
  const { albumID, imageID, ...values } = body;
  await axios.post(`${url}/${albumID}/${imageID}`, {}); //empty object for back-end validation -> will throw the default error msg in core/validation.js
}

// nieuwe methode:
export const save = async (url, formData) => {
  try {
    const response = await axios.post(`${url}`, formData, {
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


// voor login
export const post = async (url, { arg }) => {
  const { data } = await axios.post(url, arg);
  return data;
};