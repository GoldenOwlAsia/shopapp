import fs from 'fs';
import path from 'path';
import configs from '../../configs';
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

  createImageUrl(fileName) {
    return `${configs.DOMAIN}/images/${fileName}`;
  }

  parseBase64(rootBase64) {
    return rootBase64.replace(/^data:image\/[a-z]+;base64,/, '');
  }

  isBase64ImageString(base64String) {
    const matched = base64String.match(/^data:image\/[a-z]+;base64,/);
    return matched && matched.length > 0;
  }
}

export default new ImageHelper();