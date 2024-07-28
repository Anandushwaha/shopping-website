let label=document.getElementById('label')
let shoppingcart =document.getElementById('shopping_cart')
let basket=JSON.parse(localStorage.getItem('data'))||[]

let generatecartitem=()=>{
    if(basket.length!==0){
        return(shoppingcart.innerHTML=basket.map((x)=>{
            let{id,name,price,image}=x;
            return`
                <div class="cart-item">
                <p>${name}</p>
                <div class="cartimage">
                <img src=${image} alt=${name} />
                </div>
                <p>${price}</p>
                <button onclick="removefromcart('${id}')">remove<?button>
                </div>
            `
        })
    )

        
    }

}
generatecartitem()
// remove

const removefromcart = (id) => {
  basket= basket.filter((x)=>x.id!==id)
  localStorage.setItem('data', JSON.stringify(basket));
  generatecartitem();
};

document.addEventListener('DOMContentLoaded', () => {
  generatecartitem();
});
// total
let Total_amount = () => {
    let total_amount = 0
    basket.map((item) => {
      total_amount += item.item*item.price
    })
    label.innerHTML = `
      <div class="checkout area">
        <h3>Total Amount: ${total_amount}</h3>
        <button class="update-btn" onclick=window.location.reload()>update</button>
      </div>
    `
  }
  Total_amount()