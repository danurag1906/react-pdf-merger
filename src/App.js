import { useState, useEffect } from "react";
import PDFMerger from "pdf-merger-js/browser";
import "./App.css";
import {MdPictureAsPdf} from'react-icons/md'

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

  

  return (
    <div className="App">
      <input
        style={{ display: "none" }}
        id="fileUpload"
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileEvent}
      />
      <label htmlFor="fileUpload">
        <a className="btn btn-primary my-2"> Upload Files </a>
      </label>

      <a className="btn btn-warning my-2" style={{marginLeft:'1rem'}} href={`${mergedPdfUrl}`} download >Merge Files</a>
      

      {!mergedPdfUrl?(
        <p className="danger" >only pdf files allowed</p>
      ):(
        <div className="uploaded-files-list">
        {uploadedFiles.map((file) => (
          <div className="eachFile" > <MdPictureAsPdf/> {file.name}</div>
        ))}
      </div>
      )}

    </div>
  );
}

export default App;
