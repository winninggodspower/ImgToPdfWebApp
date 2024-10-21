export const prepareQuizResourceData = (resourceType, textInput, pdfFile, pictureFile) => {
    const formData = new FormData();
    formData.append('resource_type', resourceType);    
  
    if (resourceType === 'text') {
      formData.append('text', textInput);
    } else if (resourceType === 'pdf' && pdfFile) {
      formData.append('pdfFile', pdfFile);
    } else if (resourceType == 'picture' && pictureFile) {
      for (let i = 0; i < pictureFile.length; i++) {
        formData.append('pictureFile', pictureFile[i]); // Append each picture file
      }
    }
  
    return formData;
  };

  
export const sendQuizResourceRequest = async (formData) => {
    try {
      let response = await fetch('/create-ai-quiz', {
        method: 'POST',
        body: formData, // Pass the FormData object
      });
  
      if (!response.ok) {
        throw new Error("Something went wrong during the quiz creation.");
      }
  
      let data = await response.json();
      return data; // Return the parsed data (containing the UUID)
    } catch (error) {
      console.error("Error while sending quiz resource:", error);
      throw error; // Re-throw the error for further handling
    }
  };
  