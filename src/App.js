import { useState, useEffect } from "react";
import PDFMerger from "pdf-merger-js/browser";
import "./App.css";
import {MdPictureAsPdf} from'react-icons/md'
import {BsFillArrowDownSquareFill,BsFillArrowUpSquareFill} from 'react-icons/bs'
import {FaArrowCircleRight} from 'react-icons/fa'

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState();

  useEffect(() => {
    const render = async () => {
      const merger = new PDFMerger();

      for (const file of uploadedFiles) {
        await merger.add(file);
      }

      const mergedPdf = await merger.saveAsBlob();
      const url = URL.createObjectURL(mergedPdf);

      return setMergedPdfUrl(url);
    };

    render().catch((err) => {
      throw err;
    });

     setMergedPdfUrl();
  }, [uploadedFiles, setMergedPdfUrl]);

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    files.forEach((file) => {
      uploaded.push(file);
    });
    setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const handleUp=(name)=>{
    const data=[...uploadedFiles]
    let index;
    
    if(name!=data[0].name){
      for(let i=0;i<data.length;i++){
        if(data[i].name==name){
          index=i;
          break;
        }
      }
      let temp=data[index];
      data[index]=data[index-1];
      data[index-1]=temp;
      setUploadedFiles(data)
    }
  }

  const handleDown=(name)=>{
    const data=[...uploadedFiles]
    let index;
    
    if(name!=data[data.length-1].name){
      for(let i=0;i<data.length;i++){
        if(data[i].name==name){
          index=i;
          break;
        }
      }

      [data[index],data[index+1]]=[data[index+1],data[index]]
      setUploadedFiles(data)
    }
  }
  

  return (
    <div className="App">
      <div className="header">
      <h4 className="mb-4 p-2" >PDF-Merger</h4>
      </div>
      <div className="instructions">
        <p><FaArrowCircleRight/> Add the PDF files in the order to be merged</p>
        <p><FaArrowCircleRight/> Refresh to clear data</p>
      </div>
      <input
        style={{ display: "none" }}
        id="fileUpload"
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileEvent}
      />
      <div className="buttons">
        <label htmlFor="fileUpload">
          <a className="btn btn-danger my-2"> Upload Files </a>
        </label>

        <a className="btn btn-warning my-2 mx-2"  href={`${mergedPdfUrl}`} download >Merge Files</a>
      </div>
      

      {!mergedPdfUrl?(
        <p className="danger" >Loading...</p>
      ):(
        <div className="uploaded-files-list">
        {uploadedFiles.map((file) => (
          <div className="eachFile" > <MdPictureAsPdf/> {file.name} <div className="arrows"><BsFillArrowUpSquareFill className="mx-2" onClick={()=>handleUp(file.name)} /><BsFillArrowDownSquareFill onClick={()=>handleDown(file.name)} /></div> </div>
        ))}
      </div>
      )}

    </div>
  );
}

export default App;
