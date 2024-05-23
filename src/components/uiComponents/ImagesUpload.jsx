'use client'
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa"

function ImagesUpload() {
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
      }, []);
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
    {...getRootProps()}
    className="flex flex-col items-center justify-center"
  >
    <input {...getInputProps()} />

    {isDragActive ? (
      <b>Drop the files here ...</b>
    ) : (
      <>
        <span className="p-2 ring-1 rounded-full mb-2">
          <FaCloudUploadAlt size={54} className="text-sky-500" />
        </span>
        <p>
          <b>Click to upload</b> or drag and drop
        </p>
        <p>JPG, PNG, of GIF</p>
      </>
    )}
  </div>
  )
}

export default ImagesUpload