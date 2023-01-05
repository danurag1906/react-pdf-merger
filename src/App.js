import { useState, useEffect } from "react";
import PDFMerger from "pdf-merger-js/browser";
import "./App.css";
import {FaArrowCircleRight} from 'react-icons/fa'

import EachFile from "./EachFile";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id:0,
      file:''
    }
  ]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState('');


  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    
    files.forEach((file) => {
      let lastIndex=uploaded[uploaded.length-1].id;
      uploaded.push({
        id:lastIndex+1,
        file:file
      });
    });
    setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  let finalFiles=uploadedFiles.filter(file=>file.id!=0)
  
  useEffect(() => {
    const render = async () => {
      const merger = new PDFMerger();

      for (let i=0;i<finalFiles.length;i++) {
        await merger.add(finalFiles[i].file);
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



  return ( 
    <>
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
        <>
        {finalFiles.map((file ) => (
          <EachFile key={file.id} name={file.file.name} />
        ))}
        </>
      )}

    </div>
    </>
  );
}



export default App;
