import { useState } from "react";
import "../src/App.css";
import { createShortUrl } from "./services/url.service";

export default function App(){
  const [url, setUrl ] = useState("");
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
      checkUrl()
      const response = await createShortUrl(url.trim());
      setShortUrl(response.short_code);

    } catch (error) {
        console.error("FAILED TO CREATE SHORT URL:", error);
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
            {shortUrl &&<div className="url-box">
              <span>{shortUrl}</span>
            </div>}
            <button className="btn" disabled = {url.trim().length === 0} onClick={submitUrl}>Generate tiny-weeny URL</button>
        </div>
    </div>
  )
}