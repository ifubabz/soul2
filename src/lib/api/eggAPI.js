import client from "./client"
import qs from "qs"

export const getEggs = email => client.get("egg/eggs", qs.stringify({ email }))
