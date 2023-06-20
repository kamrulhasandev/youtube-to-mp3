import axios from "axios";
import React, { useRef, useState } from "react";
import { youtube_parser } from "./utlis";

function App() {
  const background = {
    background:  `rgb(0,0,0) `,
background:  `linear-gradient(117deg, rgba(0,0,0,1) 0%, rgba(47,222,245,1) 0%, rgba(114,176,162,1) 100%) `
  };


  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    

    inputUrlRef.current.value = '';

  }
  

  return (
    <div className=" px-2" style={background}>
      <div className="flex justify-center items-center h-[100vh]">
        <div className="text-center">
          <h1 className=" text-4xl md:text-6xl font-bold text-white">YouTube to MP3 Converter</h1>
          <p className="text-white md:text-xl py-3">Transform YouTube Videos to MP3 in just few seconds</p>
          <form action="" onSubmit={handleSubmit}>

          <input ref={inputUrlRef} className="form_input md:w-1/2 py-2 px-2 outline-none mb-4" type="text" placeholder="Paste a YouTube video URL.." name="youtubeUrl" />

          <br />
          <button type="submit" className=" from_button font-bold bg-white px-8 py-2 rounded-md mb-10">Search</button>
          </form>

          {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult} className="download_btn">Download MP3</a> : ''}


        </div>
      </div>
    </div>
  );
}

export default App;
