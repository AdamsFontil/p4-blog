import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  console.log("object received by service", newObject);

  const response = await axios.post(baseUrl, newObject, config);
  console.log("Servicewhat is config", config);
  console.log("Servicewhat is the reponse---", response.data);
  return response.data;
};

const createNewComment = async (id, comment) => {
  console.log('id and comment received', id, comment);
  const response = await fetch(`${baseUrl}/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ comment })
  })

  if (!response.ok) {
    throw new Error("Failed to add comment")
  }
  const data = await response.json()
  console.log('did it work', data);
  return data
}

const update = (id, newObject) => {
  console.log("what is newObject", newObject);
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  console.log("what is request,,,", response);
  return response.data;
};

export default { getAll, setToken, create, update, remove, createNewComment };
