import "./UrlDetail.css"

export default function UrlDetail(){
    return(
        <div className="url-detail-container">
            <h1 className="url-detail-title">URL details</h1>
            <div className="details-grid">
                <div>
                    <p className="details-heading-title">Short URL</p>
                    <p className="details-heading-value">tinyweeny.com/summer-sale</p>
                </div>
                <div>
                    <p className="details-heading-title">Destination</p>
                    <p className="details-heading-value">https://www.example.com/product...</p>
                </div>
                <div>
                    <p className="details-heading-title">Clicks</p>
                    <p className="details-heading-value">125</p>
                </div>
                
            </div>
            <div className="details-grid">
                <div>
                    <p className="details-heading-title">Created</p>
                    <p className="details-heading-value">Sep 26, 2026 at 02:25 PM</p>
                </div>
                <div>
                    <p className="details-heading-title">Expiry</p>
                    <p className="details-heading-value">Never</p>
                </div>
                <div>
                    <p className="details-heading-title">Status</p>
                    <p className="details-heading-value">Active</p>
                </div>
            </div>
        </div>
    )
}