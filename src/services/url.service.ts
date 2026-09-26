import { api } from "../lib/api";
import type { CreateUrl, CreateUrlResponse } from "../lib/types/url";

export const createShortUrl = (payload:CreateUrl)=>{
return api.post<CreateUrlResponse>("/urls", payload)
}