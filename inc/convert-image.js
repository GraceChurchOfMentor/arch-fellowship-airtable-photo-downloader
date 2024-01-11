import { convert } from 'easyimage'

const convertImage = {
  convert: async (src, dst) => {
    try {
      await convert({ src, dst })
    } catch (e) {
      console.log("Error: ", e)
    }
  }
}

export default convertImage