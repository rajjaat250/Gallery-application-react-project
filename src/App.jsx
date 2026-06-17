import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userdata, setuserData] = useState([]);
  const [Index, setIndex] = useState(1);
  const[selectedimage,setselectedimage]=useState(null);


  async function getdata() {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${Index}&limit=30`
    );
    setuserData(response.data);
  }

  useEffect(() => {
    getdata();
  }, [Index]);

  let printuserdata = <div className="fixed inset-0 flex items-center justify-center bg-zinc-950">
  <h1 className="text-xs font-light tracking-[0.3em] text-white opacity-30 animate-pulse uppercase">
    Loading
  </h1>
</div>

  if (userdata.length > 0) {
    printuserdata = userdata.map((elem, idx) => {
      return (
        <div
          key={idx}
          className="overflow-hidden rounded-lg shadow-lg h-40 w-44 bg-white"
       onClick={()=>setselectedimage(elem.download_url)}
       >
          <img
            className="h-full w-full object-cover"
            src={elem.download_url}
            alt=""
          />
        </div>
      );
    });
  }

  return (
    
    <div className="bg-black h-screen text-white overflow-auto">
      <nav className="bg-black text-2xl  font-bold flex text-orange-400 items-center justify-center">
        <h1> Gallery Application</h1>
      </nav>
      
     

      <div className="flex flex-wrap gap-5">
        {printuserdata}
      </div>

      <div className="flex justify-center gap-5 items-center p-4">
        <button
          className="bg-orange-400 active:scale-95 rounded px-4 py-2 cursor-pointer font-bold text-black"
          onClick={() => {
            setuserData([]);
            setIndex(Index + 1);
          }}
        >
          NEXT
        </button>
<h1 className="bg-orange-400 text-black rounded-2xl flex flex-wrap gap-5 items-center p-4 overflow-auto"> PAGE:{Index}</h1>

       <button
  className={`bg-orange-400 active:scale-95 rounded px-4 py-2 font-bold text-black ${
    Index === 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer'
  }`}
  onClick={() => {
    if (Index > 1) {
      setuserData([]);
      setIndex(Index - 1);
    }
  }}
>
  Previous
</button>

      </div>

      {/*---lightboxmodal code for images to view big ---*/}
      {selectedimage && (
        <div
          className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4"
          onClick={() => setselectedimage(null)}
        >
          <button
            className="absolute top-5 right-5 text-white text-4xl font-bold hover:text-gray-300 cursor-pointer z-50 "
            onClick={() => setselectedimage(null)}
          >
            &times;
          </button>
          {/* Badi Image Container */}
          <div
            className="max-w-4xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()} // Isse badi image par click karne se popup band nahi hoga
          >
            <img
              src={selectedimage}
              alt="Enlarged view"
              className="rounded-lg max-w-full max-h-[85vh] object-contain shadow-2xl border border-gray-700"
            />
          </div>
        </div>
      )}
      {/* --- LIGHTBOX MODAL CODE END --- */}

    </div>
  );
};
      


export default App;
