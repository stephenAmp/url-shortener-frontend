import "../home/Home.css"
import { useQuery } from "@tanstack/react-query"
import { getAllUrls } from "../../../services/url.service"
import { formatDate } from "../../shared"
import { ChevronLeft, ChevronRight, } from "lucide-react"
import type { Url } from "../../types/url"
import { useState } from "react"



export default function HomePage(){
const [page, setPage] = useState<number>(1)
const limit = 10

const {data: allUrls, isLoading: loadingAllUrl, isError: urlsError } = useQuery({queryKey:["urls", page, limit], queryFn:()=> getAllUrls(page, limit)})


const totalPages = allUrls?.pagination.total
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
  
if (loadingAllUrl){
    return <p> Loading ...</p>
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
                <input className="search-input"
                placeholder="Search URLs..."
                />
                <div className="filter-area">
                    <span className="filter-text">Filter:</span>
                    <select className="filter-select-field">
                        <option>All Statuses</option>
                    </select>
                </div>
            </div>
            <div>
            
            <div className="pagination-box">
                <p className="pagination-details">{allUrls?.pagination.page}-{allUrls?.pagination.limit} of {allUrls?.pagination.total_pages}</p>
                <div className="pagination-btn-grp">
                    <button className="pagination-btn" onClick={previousPage} disabled={page === 1}>
                        <ChevronLeft size={20}/>
                    </button>
                    <button className="pagination-btn" onClick={nextPage} disabled ={page === totalPages}><ChevronRight size={20}/></button>
                </div>
            </div>
        
                <table className="table">
                    <thead className="table-head">
                        <tr>
                            <th>SHORT URL</th>
                            <th>DESTINATION</th>
                            <th>CREATED</th>
                            <th>STATUS</th>
                            <th>EXPIRY</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allUrls?.data.map((url:Url)=>
                        <tr>
                            <td>
                                <div className="url-field">
                                    <p className="metadata">tw.com/{url.short_code}</p>
                                    <p className="sub-metadata">Click to copy</p>
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
                                <p className="metadata">{url.expires_at === null ?"Never" : url.expires_at}</p>
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
                                <button>Deactivate</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </>
        
    )
}