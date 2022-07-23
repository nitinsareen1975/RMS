import Axios from "../../services/axios-service";

const getRoles = data => {
  return Axios.get("/api/roles?filters="+encodeURIComponent(JSON.stringify(data)), undefined, undefined);
};

const updateRole = data => {
  return Axios.put("/api/roles/"+data.id, data, undefined);
};

const getRole = idx => {
  return Axios.get("/api/roles/"+idx, undefined, undefined);
};

const deleteRole = data => {
  return Axios.delete("/api/roles/"+ data.id, data, undefined);
};
const addRole = data => {
  return Axios.post("/api/roles/", data, undefined);
};

export default {
    getRoles,
    updateRole,
    getRole,
    deleteRole,
    addRole
};
