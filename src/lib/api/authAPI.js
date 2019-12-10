import client from "./client"
import qs from "qs"

export const check = () => client.get("/auth/check")

export const login = ({ email, password }) =>
  client.post("/auth/login", qs.stringify({ email, password }))

export const logout = () => client.post("/auth/logout")

export const register = ({ email, password }) =>
  client.post("/users", qs.stringify({ email, password }))
