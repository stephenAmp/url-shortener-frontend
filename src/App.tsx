import { useState } from "react";
import "../src/App.css";
import { createShortUrl } from "./services/url.service";
import { ApiError, NetworkError } from "./lib/api";
import { BASE_URL } from "./lib/shared";

export default function App(){
  const [url, setUrl ] = useState("");
  const [errorMessage, setErrorMessage ] = useState<string|null>(null);
  const [shortCode, setShortCode] = useState<null | string>(null)
  
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

      checkUrl()
      const response = await createShortUrl(url.trim());
      setShortCode(response.short_code);
    

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
            {shortCode &&<div className="url-box">
              <a target="_blank" rel="noopener noreferrer" className="url-link" href={BASE_URL+"/urls/"+shortCode}>{displayUrl}</a>
            </div>}
            <button className="btn" disabled = {url.trim().length === 0} onClick={submitUrl}>Generate tiny-weeny URL</button>
        </div>
    </div>
  )
}