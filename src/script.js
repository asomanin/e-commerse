fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {
                console.log(json)
                const productContainer = document.getElementById('products-container');

                json.forEach(product => {
                // create a div element for each product
                const productDiv = document.createElement('div');
                productDiv.classList.add('p-4','border','rounded','bg-white');
                         
                // create an image element and set its src attribute
                const image = document.createElement('img');
                image.src = product.image;
                image.alt = product.title;
                image.classList.add('w-15','h-15');

                //create a paragraph element for the product title
                const title = document.createElement('p');
                title.textContent = product.title;
                title.classList.add('mt-2');

                //create a paragraph element for the product title
                const category = document.createElement('p');
                category.textContent = product.category;
                category.classList.add('font-extrabold','mt-2','text-blue-700');               

                

                // create a paragraph element for the product price
                const price = document.createElement('p');
                price.textContent = `${product.price}`;
                price.classList.add('mt-1');

                 // Append image, title, and price elements to the product div
                productDiv.appendChild(image);
                productDiv.appendChild(title);
                productDiv.appendChild(price);
                productDiv.appendChild(category);

                // append image, title and price elements to the product div
                productContainer.appendChild(productDiv);
                });
            })
            .catch(error => console.error('error fetching product'));
