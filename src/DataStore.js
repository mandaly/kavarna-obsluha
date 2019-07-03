const API_NAME = 'zuzana';
const API_BASE = `https://czechitas.twoways.cz/api/${API_NAME}`;

export default class DataStore {

  constructor() {
    this.orders = [];
  }

  async getOrders(){
    try {
      let response = await fetch(`${API_BASE}/orders`);
      let data = await response.json();
      this.orders = data;
    } catch {
      alert ("Nepovedlo se načíst objednávky!");
    }
    
  }

  getOrderById(id){
    return this.orders.find(order => order.id == id)
  }

  async updateOrder(id) {
    let order = this.getOrderById(id);

      //sestavíme objekt objednávky pro odeslání na server
      const data = {
        status: 1,
        position: order.position,
        products: []
      };
  
      order.products.forEach(product => {
        data.products.push(
          {
            product_id: product.id,
            amount: product.pivot.amount
          });
      });
  
      await fetch(`${API_BASE}/orders/${id}`, {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(data)
      });
  
  }

}
