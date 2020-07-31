import React, { useState } from 'react';
// import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

function App() {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'rramos');
    setLoading(true);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/imgsrramos/image/upload',
      { method: 'POST', body: data }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <div className="container center">
      <h1>Upload Image</h1>
      <input
        type="file"
        name="file"
        placeholder="Escolha uma imagem"
        onChange={uploadImage}
      />
      <br />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: '300px' }} />
      )}
    </div>
  );
}

export default App;
