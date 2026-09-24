import { api } from "../lib/api";
import type { CreateUrlResponse } from "../lib/types/url";

export const createShortUrl = (originalUrl: string)=>{
return api.post<CreateUrlResponse>("/urls",{original_url: originalUrl})
}