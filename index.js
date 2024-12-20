class DynamicPricingSystem {
  constructor() {
      this.products = {}; 
  }

  
  addProduct(productId, price, inventory) {
      this.products[productId] = { price, inventory, sales: 0 };
  }

  
  recordSale(productId, quantity) {
      if (this.products[productId]) {
          this.products[productId].sales += quantity;
      }
  }

  
  adjustPrices() {
      for (let productId in this.products) {
          const product = this.products[productId];
          const demand = product.sales;  

          if (demand > 10 && product.inventory < 5) {
              
              product.price *= 1.2;
          } else if (demand < 5 && product.inventory > 20) {
              
              product.price *= 0.8;
          }
      }
  }

 
  displayProducts() {
      for (let productId in this.products) {
          const product = this.products[productId];
          console.log(`Product ID: ${productId}, Price: $${product.price}, Inventory: ${product.inventory}, Sales: ${product.sales}`);
      }
  }
}


const pricingSystem = new DynamicPricingSystem();


pricingSystem.addProduct("p1", 100, 50);
pricingSystem.addProduct("p2", 200, 25);


pricingSystem.recordSale("p1", 12);  
pricingSystem.recordSale("p2", 3);   


pricingSystem.adjustPrices();


pricingSystem.displayProducts();
