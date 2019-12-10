import axios from "axios"

const client = axios.create({
  validateStatus: function(status) {
    return status >= 200 && status <= 503
  },
})

client.defaults.baseURL = "/api"
if (process.env.NODE_ENV === "development") {
  client.defaults.baseURL = "http://localhost:9090/api"
}

client.interceptors.request.use(config => {
  config.headers.common["Authorization"] = token()
  config.headers.common["Access-Control-Allow-Origin"] = "*"
  return config
})

const token = () => {
  const auth = JSON.parse(localStorage.getItem("auth"))
  if (auth && auth.token) {
    console.log("token", auth.token)
    return "Bearer " + auth.token
  }
  return ""
}

export default client
