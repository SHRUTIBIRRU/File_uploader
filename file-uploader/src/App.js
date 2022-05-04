import './App.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  const [uploadFile, setUploadFile] = useState()
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [Isfile, setIsfile] = useState(false)
  const changeHandler = (event) => {
    setUploadFile(event.target.files[0])
    // console.log(event.target.files[0])
    setIsfile(true)
  }
  const addFileHandler = (f) => {
    const formData = new FormData()
    formData.append('Files', uploadFile)
if (Isfile) {
  const newFiles = [...uploadedFiles]
  newFiles.push(f)
  setUploadedFiles(newFiles)
}
   

    fetch('http://localhost:5000/uploaded', {
      method: 'POST',
      body: formData
    }).then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="App">
      <center style={{ color: 'royalblue', fontSize: '2rem' , fontStyle : 'bold'}}>Upload and Download Files </center>
      <div className="inputfiles">
        <input class="form-control inputform" type="file" name="file" onChange={changeHandler} />
        <button type='submit' class="btn btn-success w-100 inputform" onClick={() => addFileHandler(uploadFile)}>Upload File</button>
      </div>
      {Isfile ? (<div className="filelist">
        <ul class="list-group ">
        {
          uploadedFiles.map((item)=> <li key={item.name}  class="list-group-item">{item.name}</li>  )
        }
        </ul>
        
        {/* <p>FileName: {uploadFile.name}</p> */}

      </div>) : (
        <p className='inputform'> Please Select File to show details</p>
      )}
    </div>
  );
}

export default App;
