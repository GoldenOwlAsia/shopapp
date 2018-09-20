import fs from 'fs';
import path from 'path';
const IMAGE_PATH = path.join(__dirname, '../../../public/images/');

class ImageHelper {
  createImageFromBase64(fileName, base64Content) {
    return new Promise((resolve, reject) => {
      try {
        const filePath = IMAGE_PATH + fileName;
        return fs.writeFile(filePath, base64Content, 'base64', function(err) {
          if (err) return reject(err);
          return resolve(true);
        });
      } catch(err) {
        return reject(err);
      }
    });
  }

  parseBase64(rootBase64) {
    return rootBase64.replace(/^data:image\/[a-z]+;base64,/, '');
  }
}

export default new ImageHelper();