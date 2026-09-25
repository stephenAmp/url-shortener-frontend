import { useState } from "react";
import "../src/App.css";
import { createShortUrl } from "./services/url.service";
import { ApiError, NetworkError } from "./lib/api";

export default function App(){
  const [url, setUrl ] = useState("");
  const [errorMessage, setErrorMessage ] = useState<string|null>(null);
  const [shortUrl, setShortUrl] = useState<null | string>(null)
  

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

async function submitUrl() {   
  try{
      setErrorMessage(null)
      setShortUrl(null)
      
      checkUrl()
      const response = await createShortUrl(url.trim());
      setShortUrl(response.short_code);

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
            {shortUrl &&<div className="url-box">
              <span>https://tw.go/{shortUrl}</span>
            </div>}
            <button className="btn" disabled = {url.trim().length === 0} onClick={submitUrl}>Generate tiny-weeny URL</button>
        </div>
    </div>
  )
}