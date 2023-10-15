import axios from 'axios';
import React from 'react';
import { useState } from 'react';

export default function search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [input, setInput] = useState('');
    const [result, setResult] = useState();
    
    function handleinput (event:any) {
        setInput(event.target.value)
    }



    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://tucmcrandom-food-backend.vercel.app/api/search-menu-by-name',
        headers: { 
          'Content-Type': 'application/json'
        },
        data :JSON.stringify({
        "foodname": input
      })
      };

      async function makeRequest() {
        try {
          const response = await axios.request(config);
          console.log(response.data);
            setResult(response.data)
        }
        catch (error) {
          console.log(error);
        }
      }
    
      
    return (
        <>
        <div className='flex align-middle justify-center text-center mt-5'>
        <label className=" flex w-2/5 align-middle justify-center text-center">
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
            placeholder="Search for anything..." 
            type="text" 
            name="search" 
            value={input}
            onInput={handleinput}
             />
        </label>
        </div>
        <div className='flex justify-center'>
          <button className=' bg-pink-200 hover:bg-pink-300 focus:bg-pink-500 px-4 py-1 rounded-xl my-3 transition duration-500 ' onClick={makeRequest}>search</button>
        </div>
        <div>
            <p>{result?.foodname}</p>
        </div>
        </>

    )






}