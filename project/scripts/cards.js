export async function loadProducts(dataFile) {
    try {
        const data = await getDataInfo(dataFile);
        displayProducts(data);
    } catch (error) {
        console.error("ERROR loading or displaying data: ", error);
        alert("Error trying to get data. Try later.");
    }
}

async function getDataInfo(dataJSON) {
    const response = await fetch(dataJSON);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

const displayProducts = (products) => {
    const cards = document.getElementById("cards");
    cards.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("section");
        card.classList.add("product-card");

        const productImg = document.createElement("img");
        const productName = document.createElement("h2");
        const productDescription = document.createElement("p");
        const productPrice = document.createElement("p");
        const productSizeButtons = document.createElement("div");
        const cartMessage = document.createElement("div");

        productImg.setAttribute("src", product.icon);
        productImg.setAttribute("alt", product.productName);
        productImg.setAttribute("loading", "lazy");
        productImg.setAttribute("width", "383");
        productImg.setAttribute("height", "384");

        productName.innerHTML = product.productName;
        productDescription.innerHTML = product.description;

        productPrice.classList.add("price-display");
        productPrice.innerHTML = `$${product.priceS}`;

        productSizeButtons.classList.add("size-buttons");

        const sizes = product.additionsInfo.sizes;
        Object.keys(sizes).forEach(sizeKey => {
            const sizeLabel = sizes[sizeKey];
            const sizeButton = document.createElement("button");
            sizeButton.innerHTML = sizeLabel;
            sizeButton.classList.add("size-button");

            sizeButton.addEventListener("click", () => {
                let selectedPrice;
                switch (sizeKey) {
                    case "small": selectedPrice = product.priceS; break;
                    case "medium": selectedPrice = product.priceM; break;
                    case "large": selectedPrice = product.priceL; break;
                    case "extraLarge": selectedPrice = product.priceXL; break;
                }
                productPrice.innerHTML = `$${selectedPrice}`;
            });

            productSizeButtons.appendChild(sizeButton);
        });

        const cartIcon = document.createElement("img");
        cartIcon.setAttribute("src", "./images/cart.png");
        cartIcon.setAttribute("alt", "Add to the cart");
        cartIcon.classList.add("cart-icon");

        cartIcon.onclick = () => {
            cartMessage.innerHTML = "Product Added to the Cart";
            cartMessage.classList.add("cart-message", "show");

            setTimeout(() => {
                cartMessage.classList.remove("show");
                cartMessage.innerHTML = "";
            }, 1000);
        };

        card.appendChild(productImg);
        card.appendChild(productName);
        card.appendChild(productDescription);
        card.appendChild(productPrice);
        card.appendChild(productSizeButtons);
        card.appendChild(cartIcon);
        card.appendChild(cartMessage);

        cards.appendChild(card);
    });
};