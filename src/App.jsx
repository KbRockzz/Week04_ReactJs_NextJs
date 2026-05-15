import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dataWid, setDataWid] = useState(null);
  const [userId, setUserId] = useState(1);

  var url = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    async function fetchdata() {
      // setError(null);
      // setLoading(true);
      try {
        // var res = await fetch(url);
        var resWid = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (!resWid.ok) {
          throw new Error("Loi");
        }

        var result = await resWid.json(); 
        setDataWid(result)
        // var data = await res.json();
        // setData(data)
      }
      catch (err) {
        setError(err);
        console.log(err.message);
      }
      finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  
    fetchdata();
  }, [userId]);
  

  return (
    <div style={{ padding: '20px' }}>
      <input 
        type="number" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
        min="1"
        max="10"
      />
      <p>Nhập ID để tìm kiếm (1-10)</p>

      <hr />

      {loading && <p>Đang tải dữ liệu...</p>}
      
      {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

      {dataWid && !loading && !error && (
        <div>
          <h2>Tên: {dataWid.name}</h2>
          <p>Email: {dataWid.email}</p>
          <p>Công ty: {dataWid.company?.name}</p>
        </div>
      )}
    </div>
  );
}

export default App
