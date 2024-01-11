import Downloader from 'nodejs-file-downloader'

const downloader = {
  downloadAttachment: (url, fileName, directory, pb) => {
    const downloader = new Downloader({
      url,
      fileName,
      directory,
      cloneFiles: false,
      skipExistingFileName: true,
      onProgress: (percentage, chunk, remainingSize) => {
        pb.update(percentage, { filename: fileName })
      },
    })
    try {
      return downloader.download()
      //Downloader.download() returns a promise.
    } catch (error) {
      //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
      //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
      console.log("Download failed", error)
    }
  }
}

export default downloader