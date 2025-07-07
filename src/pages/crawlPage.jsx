import React from 'react'
import { useState,useRef,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function CrawlPage() {
    const urlRef = useRef();
    const statusRef=useRef();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false); //Spinner


    async function crawl(){
        statusRef.current.innerText = "⏳ Crawling started...";
        setLoading(true);
        let url=urlRef.current.value
        try{
        let response=await axios.post('http://localhost:8000/crawl',{url})
        console.log(response.data)
        statusRef.current.innerText = "✅ " + response.data.status;
        setTimeout(()=>{
            navigate('/chat');
        },3000);
        }
        catch (err){
            console.log(err);
            statusRef.current.innerText="❌ Crawl failed. Check console."
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-400'>
        <h1 className='text-white text-4xl p-2 font-bold p-8'>Welcome to the Crawl Page</h1>
        <p className='text-[16px]'>Input the URL to the website you wish to query from</p>
        <input type="text" placeholder="Enter your url" className='border mt-4 w-80' ref={urlRef}/>
        <button onClick={crawl} className='border mt-2' disabled={loading}>Submit</button>
        {/* Spinner */}
        {loading &&(
            <div className='mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white'></div>
        )}
        <div className='text-black mt-4 transition-opacity duration-300' id="status" ref={statusRef}>

        </div>
    </div>
  )
}

export default CrawlPage
