'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
    product_name: "Amazon Echo",
    product_description: "Echo Dot (2nd Generation) - Black",
    product_price: 36.29,
    qty_on_hand: 10,
    image: "https://www.bhphotovideo.com/images/images2000x2000/amazon_b01dfkc2so_echo_dot_black_1282300.jpg"
}, {
    product_name: "Xbox 360",
    product_description: "Xbox 360 4GB System Console with Peggle 2 Bundle",
    product_price: 114.14,
    qty_on_hand: 3,
    image: "https//i5.walmartimages.com/asr/e65e9eec-08ec-4f43-81b4-4b28c3574773_1.998493048c6c9acec123050cc3be90ad.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF"
}, {
    product_name: "Samsung Chromebook",
    product_description: "Samsung 11.6 Chromebook - Intel Celeron - 2GB Memory - 16GB eMMC Flash Memory - Black",
    product_price: 99.99,
    qty_on_hand: 2,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6111/6111505_sd.jpg;maxHeight=640;maxWidth=550"
}, {
    product_name: "Samsung Galaxy",
    product_description: "Samsung Galaxy S8 Unlocked 64GB - US Version (Midnight Black)",
    product_price: 499.20,
    qty_on_hand: 4,
    image: "https://images-na.ssl-images-amazon.com/images/I/41DD2Kl0%2BrL._SX385_.jpg"
}, {
    product_name: "PlayStation 4",
    product_description: "PlayStation 4 Pro 1TB Console - Destiny 2 Bundle",
    product_price: 359.07,
    qty_on_hand: 5,
    image: "https://farm5.staticflickr.com/4071/35616215602_9c4628ce9e_b.jpg"
}, {
    product_name: "NETGEAR Nighthawk Router",
    product_description: "NETGEAR Nighthawk AC1750 Smart Dual Band WiFi Router (R6700)",
    product_price: 69.03,
    qty_on_hand: 15,
    image: "images-na.ssl-images-amazon.com/images/I/41vwx7bqtrL._SL500_AC_SS350_.jpg"
}]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};