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
// currently not used
export const getById = async ({ url, id }) => {
  const {
    data
  } = await axios.get(`${url}/${id}`); 

  return data.items;
};

//get all images by album-ID
export const getAlbumImages = async (albumId) => {
  try {
    // Make a GET request to the endpoint /albums/:albumId/images
    const { data } = await axios.get(`albums/${albumId}/images`);
    return data.items; // Return the images from the response
  } catch (error) {
    console.error("Failed to fetch album images", error);
    throw error; // Rethrow the error to be handled by SWR or calling code
  }
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
export const updateById = async(url, { arg: body }) => {
  const { id, ...values } = body;
  
  try {
    await axios.put(`${url}/${id}`, values);
  } catch (error) {
    
    throw error;
  }
  
}

//combine 2 above posts
export const postPhoto = async(url, { arg: body }) => {
  const { albumID, imageID, ...values } = body;
  
  //create album and then add foto
  if(url.includes("create-and-add-photo")){
    console.log(`posting: url: ${url} values: ${values}`)
    await axios.post(`${url}`, values);
    //add foto to album
  }else{
    await axios.post(`${url}/${albumID}/${imageID}`, {}); //empty object for back-end validation -> will throw the default error msg in core/validation.js
  }
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