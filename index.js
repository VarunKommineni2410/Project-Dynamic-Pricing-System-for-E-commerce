class DynamicPricingSystem {
    constructor() {
      this.productCatalog = {}; // Stores product details
      this.competitorPrices = {}; // Stores competitor prices
      this.salesData = {}; // Stores historical sales data
    }
  
    // Add a product to the catalog
    addProduct(productId, details) {
      this.productCatalog[productId] = details;
      this.salesData[productId] = []; // Initialize sales data
    }
  
    // Update inventory levels
    updateInventory(productId, newInventory) {
      if (this.productCatalog[productId]) {
        this.productCatalog[productId].inventory = newInventory;
      }
    }
  
    // Record a sale
    recordSale(productId, quantity) {
      if (this.salesData[productId]) {
        this.salesData[productId].push(quantity);
      }
    }
  
    // Calculate demand based on historical sales data
    calculateDemand(productId) {
      const sales = this.salesData[productId] || [];
      const totalSales = sales.reduce((sum, qty) => sum + qty, 0);
      return sales.length ? totalSales / sales.length : 0; // Average sales
    }
  
    // Update competitor prices
    updateCompetitorPrices(productId, price) {
      this.competitorPrices[productId] = price;
    }
  
    // Price adjustment algorithm
    adjustPrices() {
      for (let productId in this.productCatalog) {
        const details = this.productCatalog[productId];
        const demand = this.calculateDemand(productId);
        const inventory = details.inventory;
        const competitorPrice = this.competitorPrices[productId] || Infinity;
  
        // Pricing logic
        if (demand > 5 && inventory < 10) {
          details.price = Math.min(details.price * 1.2, competitorPrice * 0.95); // Increase price
        } else if (demand < 3 && inventory > 20) {
          details.price = details.price * 0.9; // Decrease price
        } else {
          details.price = Math.min(details.price, competitorPrice * 0.98); // Stay competitive
        }
  
        // Update the catalog
        this.productCatalog[productId] = details;
      }
    }
  
    // Get pricing suggestions
    getPricingSuggestions() {
      const suggestions = [];
      for (let productId in this.productCatalog) {
        const details = this.productCatalog[productId];
        suggestions.push({
          productId,
          currentPrice: details.price,
          suggestedPrice: details.price, // Current implementation adjusts in place
        });
      }
      return suggestions;
    }
  
    // Admin dashboard
    displayDashboard() {
      console.log("Admin Dashboard:");
      for (let productId in this.productCatalog) {
        const details = this.productCatalog[productId];
        console.log(`Product ID: ${productId}`);
        console.log(`Price: $${details.price.toFixed(2)}`);
        console.log(`Inventory: ${details.inventory}`);
        console.log(`Demand: ${this.calculateDemand(productId).toFixed(2)}`);
        console.log('-----------------------------');
      }
    }
  }
  
  // Example usage:
  const pricingSystem = new DynamicPricingSystem();
  
  // Adding products
  pricingSystem.addProduct("p1", { price: 100, inventory: 50 });
  pricingSystem.addProduct("p2", { price: 200, inventory: 15 });
  
  // Simulating sales
  pricingSystem.recordSale("p1", 5);
  pricingSystem.recordSale("p1", 7);
  pricingSystem.recordSale("p2", 1);
  
  // Updating competitor prices
  pricingSystem.updateCompetitorPrices("p1", 110);
  pricingSystem.updateCompetitorPrices("p2", 190);
  
  // Adjusting prices
  pricingSystem.adjustPrices();
  
  // Displaying the dashboard
  pricingSystem.displayDashboard();
  