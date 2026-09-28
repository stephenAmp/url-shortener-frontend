import "../home/Home.css"

export default function HomePage(){
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
                <table className="table">
                    <thead className="table-head">
                        <tr>
                            <th>SHORT URL / CUSTOM CODE</th>
                            <th>DESTINATION</th>
                            <th>CREATED</th>
                            <th>STATUS</th>
                            <th>EXPIRY</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <div className="url-field">
                                    <p className="metadata">tinyweeny.com/summer-sale</p>
                                    <p className="sub-metadata">summer-sale</p>
                                </div>
                            </td>
                            <td>
                                <div className="destination-field">
                                    <p className="metadata">example.com/products/summer...</p>
                                    <p className="sub-metadata">Click to copy</p>
                                </div>
                            </td>
                            <td>
                                <p className="metadata">Sep 26, 2026</p>
                            </td>
                            <td>
                                <p className="metadata">Never</p>
                            </td>
                            <td>
                                <div className="badge">
                                    <p className="badge-text">Active</p>
                                </div>
                            </td>
                            <td>
                                <div className="btn-grp">
                                    <button>View</button>
                                    <button>Delete</button>
                                </div>
                                <button>Deactivate</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* ADD DETAIL screen */}
            </div>
        </div>
    </>
        
    )
}