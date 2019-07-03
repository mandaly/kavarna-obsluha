export default class Orders {

  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  renderHTML(){
    let html = "";

    this.dataStore.orders.forEach(order => {

      let datumObjednavky = new Date(order.created_at);
      let cekani = Math.round((new Date() - datumObjednavky)/1000/60 - 120); //nebo Date.now()

      html += `
      <div data-id="${order.id}" class="order order--${cekani > 40 ? "critical" : cekani > 20 ? "slow" : "ok"}">
      <div class="order__header">
        <h2 class="order__table">Stůl č. ${order.position}</h2>
        <div class="order__time">${cekani} min</div>
      </div>
      <ul class="order__items">
      `;

      order.products.forEach(product => {
        html += `<li class="order__item">${product.pivot.amount}x ${product.name}</li>`
      })
     
        html += `</ul>
      <button class="button button--full">ODBAVIT</button>
      </div>
      `;
    });

    if (html !== ""){
      document.querySelector("#orders").innerHTML = html;
      const buttons = document.querySelectorAll(".button");
      for(let button of buttons){
        button.addEventListener("click", (e) => {
          let id = e.target.closest("[data-id]").dataset.id;
          this.dataStore.updateOrder(id)
            .then(() => console.log("updated")

            )
        });
      }

    }
  }


}

