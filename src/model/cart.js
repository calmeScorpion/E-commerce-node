const fs = require('fs');
const path = require('path');
const appDirName = require('../utils/path');

const productFilepath = path.join(appDirName, 'data', 'cart.json');

module.exports = class Product {
  static getProductDetailsByIds(productID, cb) {
    var data = fs.readFileSync(productFilepath);
    var myObject = JSON.parse(data);
    myObject.push(productID);
    var newData = JSON.stringify(myObject);
    fs.writeFile(productFilepath, newData, (err) => {
      if (err) throw err;
      cb();
      console.log('Item added to Cart');
    });
  }
  static getDetailsById(productID, cb) {
    getAllProducts((products) => {
      const detailData = products.find(({ id }) => id === productID);
      cb(detailData);
    });
  }
};
exports.getAllProducts = (cb) => {
  fs.readFile(productFilepath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    console.log('file:-', fileContent);
    return cb(JSON.parse(fileContent));
  });
};
