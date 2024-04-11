let productContainer;
let selectedProduct = [];


function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    var hero = document.getElementById("hero");
    
    if (sidebar.classList.contains("hidden")) {
      // Show the sidebar
      sidebar.classList.remove("hidden");
      hero.classList.remove("col-span-7");
      hero.classList.add("col-span-6");
    } else {
      // Hide the sidebar
      sidebar.classList.add("hidden");
      hero.classList.remove("col-span-6");
      hero.classList.add("col-span-7");
    }
  }


function createProductDiv(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('productDiv', 'p-2', 'border', 'rounded', 'bg-white');

    const subProductDiv = document.createElement('div');
    subProductDiv.classList.add('w-full', 'h-14', 'bg-[#702dff]', 'rounded-md');

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;
    image.classList.add('w-[16rem]', 'h-[16rem]', 'mx-auto');
    image.setAttribute('data-id', product.id);// set product id as a data attribute
    image.setAttribute('data-category', product.category);// set product category as data attribute
    image.setAttribute('data-image', product.image);// set product image as data attribute

    const title = document.createElement('span');
    title.textContent = product.title;
    title.classList.add('mt-2', 'w-50', 'text-xs');

    const id = document.createElement('span');
    id.textContent = product.id;
    id.classList.add('float-right','text-white')

    const category = document.createElement('p');
    category.textContent = product.category;
    category.classList.add('font-extrabold', 'text-gray-400', 'w-[70%]', 'h-7', 'float-right', 'text-end', 'pr-4');

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;
    price.classList.add('w-[30%]', 'h-7', 'pl-4', 'mt', 'font-bold', 'text-white', 'hover:text-slate-300');

    const rating = document.createElement('p');
    rating.textContent = `Rating: ${product.rating.rate}`;
    rating.classList.add('w-[100%]', 'h-5', 'text-end', 'float-right', 'pr-4', 'text-[#f39c12]');

    const count = document.createElement('p');
    count.textContent = `${product.rating.count} reviews`;
    count.classList.add('ml-2', 'bg-[#9b59b6]', 'w-24', 'h-6', 'text-center', 'text-white', 'rounded-full');

    subProductDiv.appendChild(rating);
    subProductDiv.appendChild(category);
    subProductDiv.appendChild(price);

    productDiv.appendChild(id);
    productDiv.appendChild(count);
    productDiv.appendChild(image);
    productDiv.appendChild(subProductDiv);

    image.addEventListener('click', function(event) {
        const productId = image.dataset.id; // retrieving product id
        const productCategory = image.dataset.category; // retrieving product category
        const productImage = image.dataset.image; // retrieving image

        const formExists = productDiv.querySelector('form');

        if (!formExists) {
            const form = document.createElement('form');
            form.classList.add('productForm', 'w-70', 'h-120', 'p-8', 'rounded-xl', 'mt-5','bg-[#000524]');
            form.style.position = 'absolute'; // Set form to absolute position
            form.style.top = '50%'; // Center form vertically
            form.style.left = '50%'; // Center form horizontally
            form.style.transform = 'translate(-50%, -50%)'; // Center form using transform

            const id = document.createElement('span');
            id.classList.add('text-white','h-6','w-6','border','float-right','mt-2','text-sm','mr-2');
            id.textContent = productId;

            const productCat = document.createElement('p');
            productCat.textContent = ` ${productCategory}`;
            productCat.classList.add('h-10', 'font-bold','border', 'mb-3', 'px-4', 'py-1','text-white');

            const numberInput = document.createElement('input');
            numberInput.type = 'number';
            numberInput.placeholder = 'Enter quantity';
            numberInput.classList.add('form-control', 'w-full', 'h-10', 'border', 'mb-3', 'px-4','min-1','max-50');
            numberInput.min = 0;
            numberInput.max = 50;
            // numberInput.value = 1;

            const buy = document.createElement('button');
            buy.type = 'button';
            buy.textContent = 'Buy';
            buy.classList.add('bg-[#2ecc71]', 'w-full', 'h-12', 'mb-3', 'rounded-lg', 'font-bold', 'hover:bg-green-600', 'transition', 'delay-200');

            const addStock = document.createElement('button');
            addStock.type = 'button';
            addStock.textContent = 'Add to Stock';
            addStock.classList.add('bg-[#f39c12]', 'w-full', 'h-12', 'rounded-lg', 'font-bold', 'hover:bg-orange-500', 'transition', 'delay-200');

            addStock.addEventListener('click', () => {
            const quantity = Number(numberInput.value, 10);

            if(!isNaN(quantity) && quantity > 0){

                // adding selected product to array
                selectedProduct.push({
                    id: productId,
                    category: productCategory,
                    quantity: quantity,
                    image: productImage,
                });

                console.log('selected products: ', selectedProduct);
            }else{
                alert("Please select quantity");
            }
            })

            form.appendChild(id);
            form.appendChild(productCat);
            form.appendChild(numberInput);
            form.appendChild(buy);
            form.appendChild(addStock);

            productDiv.appendChild(form);

             // Close form when clicking outside the form or its associated image
             const closeFormHandler = function(event) {
                if (!form.contains(event.target) && event.target !== image) {
                    form.remove();
                    document.removeEventListener('click', closeFormHandler);
                }
            };

            document.addEventListener('click', closeFormHandler);
        }

        // Hide all other forms except the one clicked
        const allForms = document.querySelectorAll('.productForm');
        allForms.forEach(form => {
            if (form !== productDiv.querySelector('form')) {
                form.remove();
            }
        });
    });

    return productDiv;
}

function renderProducts(products) {
    const productContainer = document.getElementById('products-container');

    products.forEach(product => {
        const productDiv = createProductDiv(product);
        productContainer.appendChild(productDiv);
        // console.log({product});
    });
}



function fetchData() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            renderProducts(json);
        })
        .catch(error => console.error('Error fetching products:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});
