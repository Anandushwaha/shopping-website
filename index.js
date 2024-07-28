

let basket = JSON.parse(localStorage.getItem('data')) || [];

let currentIndex = 0;
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
// carasaul
function showImage(index) {
    const images = document.querySelectorAll('.carousel-image');
    if (index >= images.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = images.length - 1;
    } else {
        currentIndex = index;
    }
    const carouselImages = document.querySelector('.carousel-images');
    carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextImage() {
    showImage(currentIndex + 1);
}

function prevImage() {
    showImage(currentIndex - 1);
}

setInterval(() => {
    nextImage();
}, 3000); // Change image every 3 seconds

document.addEventListener('DOMContentLoaded', () => {
    showImage(currentIndex);
});

// cart 

const shop=document.getElementById('shop')

let generateshop =()=>{
    shop.innerHTML=shopitemdata.map((x,index)=>{

        let {id,name,price,image}=x
        let wishlistClass = wishlist.includes(id) ? 'wishlist-added' : '';
        
        return`
               <div class="shop_item" id=product-id-${id}>
            <img src=${image} alt="">
                
                <div>
                <h3>${name}</h3>
                <p>${price}</p>
                <button onclick ="addtocart('${id}','${name}','${price}','${image}')">Add to cart</button>
                   
                <span class="heart-icon ${wishlistClass}" onclick="toggleWishlist('${id}')">    <img src="heart.png" alt=""></span>
                </div>
                </div>
                 
                
               
                
                
                
             `
    })
}


let addtocart=(id,name,price,image)=>{
basket.push({
    id:id,
    item:1,
    name:name,
    price:price,
    image:image
})
    localStorage.setItem('data',JSON.stringify(basket))
}
generateshop()

// wishlist


const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    generateshop();
};


document.addEventListener('DOMContentLoaded', () => {
    
    console.log('shopitemdata:', shopitemdata);

    
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    
    searchInput.addEventListener('input', () => {
        
        const query = searchInput.value.toLowerCase();

        searchResults.innerHTML = '';

        
        if (query) {
            
            const suggestions = shopitemdata.filter(item => item.name.toLowerCase().includes(query));
            console.log('Suggestions:', suggestions);

        
            if (suggestions.length > 0) {
            
                suggestions.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'search-suggestion';
                    div.innerText = item.name;
                    div.addEventListener('click', () => {

                        searchInput.value = item.name;
                        searchResults.innerHTML = '';
                        
                    });
                    searchResults.appendChild(div);
                });
            } else {
                
                searchResults.innerHTML = '<div class="search-suggestion">No results found</div>';
            }
        }
    });
});


function correctSpelling(query) {
   
    const corrections = {
        tshirt: 'T-shirt',
        pant: 'pants',
        shrt: 'shirt'
    };
    return corrections[query.toLowerCase()] || query;
}
document.addEventListener('DOMContentLoaded', () => {
    
    console.log('shopitemdata:', shopitemdata);

    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) {
        console.error('Search input or search results container not found');
        return;
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query) {
            const suggestions = shopitemdata.filter(item => item.name.toLowerCase().includes(query));
            console.log('Suggestions:', suggestions);

            if (suggestions.length > 0) {
                suggestions.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'search-suggestion';
                    div.innerText = item.name;
                    div.addEventListener('click', () => {
                        window.location.href = `product.html?id=${item.id}`;
                    });
                    searchResults.appendChild(div);
                });
            } else {
                searchResults.innerHTML = '<div class="search-suggestion">No results found</div>';
            }
        }
    });
});

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

searchInput.addEventListener('blur', () => {
    const query = searchInput.value.trim();
    if (query && !searchHistory.includes(query)) {
        searchHistory.push(query);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const historyDiv = document.createElement('div');
    historyDiv.className = 'search-history';
    
    searchHistory.forEach(query => {
        const div = document.createElement('div');
        div.className = 'search-suggestion';
        div.innerText = query;
        div.addEventListener('click', () => {
            searchInput.value = query;
            searchResults.innerHTML = '';
            // Optionally, trigger search here
        });
        historyDiv.appendChild(div);
    });
    
    searchResults.appendChild(historyDiv);
});
function highlightMatch(text, query) {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    return text.slice(0, index) + `<span class="highlight">${text.slice(index, index + query.length)}</span>` + text.slice(index + query.length);
}

suggestions.forEach(item => {
    const div = document.createElement('div');
    div.className = 'search-suggestion';
    div.innerHTML = highlightMatch(item.name, query);
    div.addEventListener('click', () => {
        searchInput.value = item.name;
        searchResults.innerHTML = '';
    });
    searchResults.appendChild(div);
});
suggestions.forEach(item => {
    const div = document.createElement('div');
    div.className = 'search-suggestion';
    div.innerHTML = `
        ${highlightMatch(item.name, query)}
        <p>${item.price}</p>
        <img src="${item.image}" alt="${item.name}" class="preview-image">
    `;
    div.addEventListener('click', () => {
        searchInput.value = item.name;
        searchResults.innerHTML = '';
    });
    searchResults.appendChild(div);
});
