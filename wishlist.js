
let wishlist1 =document.getElementById('Wishlist')
let basket=JSON.parse(localStorage.getItem('data'))||[]


let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

const wishlistContainer = document.getElementById('wishlist');

const generateWishlist = () => {
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
    } else {
        wishlistContainer.innerHTML = wishlist.map(id => {
            const item = shopitemdata.find(x => x.id == id);
            return `
                <div class="wishlist-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.price}</p>
                        </div>
                        <button onclick="removeFromWishlist('${item.id}')">Remove from Wishlist</button>
                </div>
            `;
        }).join('');
    }
};

const removeFromWishlist = (id) => {
    wishlist = wishlist.filter(item => item !== id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    generateWishlist();
};

document.addEventListener('DOMContentLoaded', () => {
    generateWishlist();
});
