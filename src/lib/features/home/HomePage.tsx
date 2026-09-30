import "../home/Home.css"
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deactivateUrl, getAllUrls } from "../../../services/url.service"
import { formatDate } from "../../shared"
import { ChevronLeft, ChevronRight, Loader2, } from "lucide-react"
import type { Url } from "../../types/url"
import { useEffect, useState } from "react"



export default function HomePage(){
const [page, setPage] = useState<number>(1)
const [q, setQ] = useState<string|undefined>(undefined)
const [debouncedQ, setDebouncedQ] = useState<string|undefined>(undefined)
const [status, setStatus] = useState<string|undefined>(undefined)
const [createdFrom] = useState<string|undefined>(undefined)
const [createdBefore] = useState<string|undefined>(undefined)

const limit = 10

const {data: allUrls, isLoading: loadingAllUrl, isError: urlsError } = useQuery({queryKey:["urls", page, limit, debouncedQ, status, createdFrom, createdBefore], queryFn:()=> getAllUrls(page, limit, debouncedQ, status, createdFrom, createdBefore)})


useEffect(()=>{
const timer = setTimeout(()=> setDebouncedQ(q),300)
return ()=> clearTimeout(timer)
},[q])


const queryClient = useQueryClient()

const deactivate = useMutation({
    mutationFn: deactivateUrl,
    onSuccess:()=> {
        setPage(1)
        return queryClient.invalidateQueries({queryKey:["urls"]})
    }
})

const totalPages = allUrls?.pagination.total_pages

const nextPage = ()=> {
    if(page < (totalPages ?? 1)){
        setPage(page + 1)
    }
}

const previousPage = () => {
    if(page > 1){
        setPage(page - 1)
    }
}

if(urlsError){
    return <p> An error occured</p>
}

return(
    <>
        <div className="nav-bar">
            <div className="nav-content">
                <h1>Tiny Weeny</h1>
                    <div className="account-details">
                        <p>Account</p>
                    </div>                    
            </div>             
        </div>
        <div className="homepage-container">
            
            <div className="header-container">
                <div className="page-description">
                    <h1 className="title">My URLs</h1>
                    <h2 className="description">Managed shortened URLs</h2>
                </div>
                <button className="generate-url-btn">+ Create new URL</button>
            </div>
            <div className="search-area">
                <input 
                    value = {q}
                    onChange={(e)=> {
                        setQ(e.target.value)
                        setPage(1)
                    }}
                    className="search-input"
                    placeholder="Search URLs..."
                />
                <div className="filter-area">
                    <span className="filter-text">Filter:</span>
                    <select 
                    className="filter-select-field"
                    value = {status ?? ""}
                    onChange={(e)=>{
                        setStatus(e.target.value || undefined)
                        setPage(1)
                    }}
                    >
                        <option value="">All Statuses</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
            </div>
            <div>
            
            <div className="pagination-box">
                <p className="pagination-details">{totalPages === 0 ? "No results" : `Page ${allUrls?.pagination.page} of ${totalPages}` }</p>
                <div className="pagination-btn-grp">
                    <button className="pagination-btn" onClick={previousPage} disabled={page === 1}>
                        <ChevronLeft size={20}/>
                    </button>
                    <button className="pagination-btn" onClick={nextPage} disabled ={page >= (totalPages ?? 0)}><ChevronRight size={20}/></button>
                </div>
            </div>
        
                {loadingAllUrl ? (
                    <div>
                        <Loader2 size={20} className="animate-spin" />
                    </div>
                    ):(
                    <table className="table">
                    <thead className="table-head">
                        <tr>
                            <th>SHORT URL</th>
                            <th>DESTINATION</th>
                            <th>CREATED</th>
                            <th>EXPIRY</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allUrls?.data.map((url:Url)=>
                        <tr key={url.uuid}>
                            <td>
                                <div className="url-field">
                                    <p className="metadata">tw.com/{url.short_code}</p>
                                    <p className="sub-metadata">Click to open in new tab</p>
                                </div>
                            </td>
                            <td>
                                <div className="destination-field">
                                    <p className="metadata">{url.original_url}</p>
                                    <p className="sub-metadata">Click to copy</p>
                                </div>
                            </td>
                            <td>
                                <p className="metadata">{formatDate(url.created_at)}</p>
                            </td>
                            <td>
                                <p className="metadata">{url.expires_at === null ?"Never" : formatDate(url.expires_at)}</p>
                            </td>
                            <td>
                                <div className="badge">
                                    <p className="badge-text">{url.isActive ? "Active" : "Inactive"}</p>
                                </div>
                            </td>
                            <td>
                                <div className="btn-grp">
                                    <button>View</button>
                                    <button>Delete</button>
                                </div>
                                <button onClick={()=>deactivate.mutate(url.short_code)} disabled={url.isActive === false || deactivate.isPending }>{deactivate.isPending ? <Loader2 className="animate-spin"/> : "Deactivate"}</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>)}
            </div>
        </div>
    </>
        
    )
}