import React from 'react';
import { useState } from "react"
import { BookOpen, FileText, Image, Upload } from "lucide-react"
import { prepareQuizResourceData, sendQuizResourceRequest } from './quizService';

export default function Component() {
  const [resourceType, setResourceType] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [pdfFile, setPdfFile] = useState(null)
  const [pictureFile, setPictureFile] = useState(null)
  const [textInput, setTextInput] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = async () => {
    setIsLoading(true);
    if (resourceType) {
      // Prepare the form data
      const formData = prepareQuizResourceData(resourceType, textInput, pdfFile, pictureFile);
  
      try {
        // Send the form data
        let response = await sendQuizResourceRequest(formData);
  
        // Redirect to quiz page with quiz UUID
        window.location.href = `/quiz/${response.uuid}`;
      } catch (error) {
        alert(error.message);
      }
      console.log(`Starting quiz with resource type: ${resourceType}`);
    } else {
      setIsDialogOpen(true);
    }
    setIsLoading(false);
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0])
    }
  }

  const handlePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPictureFile(e.target.files)
    }
  }

  const handleTextChange = (e) => {
    setTextInput(e.target.value)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Start a New Quiz</h2>
          <p className="text-sm opacity-70">Choose a resource type to generate questions from.</p>
          <p className="text-sm mt-2">
            {resourceType
              ? `Selected resource: ${resourceType}`
              : "No resource type selected"}
          </p>
          <div className="card-actions justify-end mt-4">
            <label htmlFor="resource-modal" className="btn btn-outline btn-block">
              Choose Resource Type
            </label>
          </div>
          <div className="card-actions justify-end mt-2">
            <button className="btn btn-primary btn-block" onClick={handleStartQuiz}>
              { isLoading ?  
                <span className="loading loading-spinner loading-lg"></span> : 
                'Start Quiz'
              }
            </button>
          </div>
        </div>
      </div>

      <input type="checkbox" id="resource-modal" className="modal-toggle" checked={isDialogOpen} onChange={() => setIsDialogOpen(!isDialogOpen)} />
      <dialog className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Choose Resource Type</h3>
          <p className="py-4">Select the type of resource you want to use for generating quiz questions.</p>
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input type="radio" name="resource" className="radio" value="pdf" checked={resourceType === "pdf"} onChange={(e) => setResourceType(e.target.value)} />
              <BookOpen className="w-4 h-4" />
              <span className="label-text">PDF Resource</span>
            </label>
            {resourceType === "pdf" && (
              <div className="mt-2 flex items-center">
                <input type="file" accept=".pdf" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
                <Upload className="w-4 h-4 ml-2" />
              </div>
            )}
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input type="radio" name="resource" className="radio" value="text" checked={resourceType === "text"} onChange={(e) => setResourceType(e.target.value)} />
              <FileText className="w-4 h-4" />
              <span className="label-text">Text Resource</span>
            </label>
            {resourceType === "text" && (
              <textarea 
                className="textarea textarea-bordered mt-2" 
                placeholder="Enter your text here"
                value={textInput}
                onChange={handleTextChange}
              ></textarea>
            )}
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input type="radio" name="resource" className="radio" value="picture" checked={resourceType === "picture"} onChange={(e) => setResourceType(e.target.value)} />
              <Image className="w-4 h-4" />
              <span className="label-text">Picture Resource</span>
            </label>
            {resourceType === "picture" && (
              <div className="mt-2 flex items-center">
                <input type="file" accept="image/*" multiple={true} onChange={handlePictureChange} className="file-input file-input-bordered w-full max-w-xs" />
                <Upload className="w-4 h-4 ml-2" />
              </div>
            )}
          </div>
          <div className="modal-action">
            <label htmlFor="resource-modal" className="btn">Confirm</label>
          </div>
        </div>
      </dialog>
    </div>
  )
}
