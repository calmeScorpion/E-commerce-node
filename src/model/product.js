const fs = require('fs');
const path = require('path');
const appDirName = require('../utils/path');

const productFilepath = path.join(appDirName, 'data', 'db.json');

const getAllProducts = (cb) => {
  fs.readFile(productFilepath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, price, image, description) {
    (this.id = id),
      (this.title = title),
      (this.price = price),
      (this.image = image),
      (this.description = description);
  }

  save(cb) {
    getAllProducts((products) => {
      products.push(this);

      fs.writeFile(productFilepath, JSON.stringify(products), (err) => {
        if (!err) {
          return cb();
        }
        console.log(err);
      });
    });
  }

  update(cb) {
    getAllProducts((products) => {
      products = products.map((product) => {
        if (product.id !== this.id) {
          return product;
        }
        return this;
      });
      fs.writeFile(productFilepath, JSON.stringify(products), (err) => {
        if (!err) {
          return cb();
        }
      });
    });
  }

  static getProductDetailsById(productID, cb) {
    getAllProducts((products) => {
      const productData = products.find(({ id }) => id === productID);
      cb(productData);
    });
  }

  static fetchAll(cb) {
    getAllProducts(cb);
  }
};
