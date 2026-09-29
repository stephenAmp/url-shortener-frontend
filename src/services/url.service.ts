import { api } from "../lib/api";
import { ApiEndpoints } from "../lib/constants/ApiEndpoints";
import type { CreateUrl, CreateUrlResponse, GetUrlResponse } from "../lib/types/url";

export const createShortUrl = (payload:CreateUrl)=>{
return api.post<CreateUrlResponse>(ApiEndpoints.createShortUrl, payload)
}

export const getAllUrls = (page: number, limit: number)=>{
    return api.get<GetUrlResponse>(ApiEndpoints.getAllUrls(page, limit))
}

export const getRedirectUrl = (shortCode:string)=>{
    return api.get(ApiEndpoints.getRedirectUrl(shortCode))
}

export const deleteUrl = (uuid: string)=>{
    return api.delete(ApiEndpoints.removeUrl(uuid))
}

export const deactivateUrl = (shortCode: string)=>{
    return api.delete(ApiEndpoints.deactivateUrl(shortCode))
}

export const activateUrl = (uuid: string)=>{
    return api.patch(ApiEndpoints.activateUrl(uuid))
}
