import { useState } from "react";
import "../src/App.css";
import { createShortUrl } from "./services/url.service";
import { ApiError, NetworkError } from "./lib/api";
import { BASE_URL } from "./lib/shared";
import type { CreateUrl } from "./lib/types/url";

export default function App(){
  const [url, setUrl ] = useState("");
  const [errorMessage, setErrorMessage ] = useState<string|null>(null);
  const [expiresAt, setExpiresAt ] = useState<string>("")
  const [customCode, setCustomCode ] = useState<string>("")
  const [shortCode, setShortCode] = useState<null | string>(null)
  const [minDate] = useState(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
});
  
  function checkUrl(){
    try {
        const parsedUrl = new URL(url.trim());

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            console.error("Invalid URL");
            return;
        }
    } catch {
        console.error("Invalid URL");
        return;
    }

  }
  const displayUrl = "http://tw.com/" + shortCode


async function submitUrl() {   
  try{
      setErrorMessage(null)
      setShortCode(null)

      const payload:CreateUrl= {
        "original_url": url.trim(),
        "expires_at": expiresAt ? new Date(`${expiresAt}T23:59:59`).toISOString() : undefined,
        "custom_code": customCode.trim() || undefined,
      }
      console.log("PAYLOAD:", payload)

      checkUrl()
      const response = await createShortUrl(payload);
      
      setShortCode(response.short_code);
      setExpiresAt("")
      setUrl("")
      setCustomCode("")

    } catch (error) {
        if(error instanceof ApiError){
          setErrorMessage(error.message)
          return
        }

        if(error instanceof NetworkError){
          setErrorMessage("Unable to connect to the internet try again later.")
          return
        }

        setErrorMessage("Something went wrong.")
    }
}



  return(
    <div className="page-container">
        <div className="page-description-box">
            <h1 className="heading">Welcome to TinyWeeny, your favourite URL shortener service</h1>
            <span className="description">Paste your url to turn it into a tiny-weeny url</span>
            <input 
            className="input-field"
             placeholder="Type here..."
             value={url}
             onChange={(e)=>setUrl(e.target.value)}
             />
              {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
        {/* OPTIONAL FIELDS */}
              <h3 className="optional-heading">Optional Settings</h3>
              <hr className="seperator"/>
              <div className="optional-fields-box">
                <div className="alias-box">
                  <h3 className="optional-heading">Custom code / alias</h3>
                  <input 
                  className="alias-input-custom"
                    value={customCode}
                    onChange={(e)=>
                      setCustomCode(e.target.value)
                    }
                    placeholder="e.g summer-sale"
                  />
                  {!customCode && <span className="hint-text">Leave blank to generate a random code.</span>}
                </div>
                <div className="expires-box">
                  <h3 className="optional-heading">Expires</h3>
                    <div>
                      <input
                        type="date"
                        className="alias-input-expiry"
                        value={expiresAt}
                        min={minDate}
                        onChange={(e) => setExpiresAt(e.target.value)}
                      />
                    </div>
                </div>
              </div>
            {/* ACTION BUTTON */}
            <div className="footer-grp">
              <button className="btn" disabled = {url.trim().length === 0} onClick={submitUrl}>Generate tiny-weeny URL</button>

              {shortCode &&<div className="url-box">
              <a target="_blank" rel="noopener noreferrer" className="url-link" href={BASE_URL+"/urls/"+shortCode}> {displayUrl}</a>
            </div>}
            </div>
    </div>
  )
}