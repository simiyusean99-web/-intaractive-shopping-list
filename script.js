let shoppingItems = JSON.parse(localStorage.getItem("shoppingItems")) || [];

const itemNameInput = document.getElementById("itemName");
const itemPriceInput = document.getElementById("itemPrice");
const addButton = document.getElementById("addButton");
const shoppingList = document.getElementById("shoppingList");
const totalCost = document.getElementById("totalCost");
const clearButton = document.getElementById("clearButton");


function displayItems() {

    shoppingList.innerHTML = "";

    shoppingItems.forEach(function(item, index) {

        const li = document.createElement("li");

        li.className = "shopping-item";

        if (item.purchased) {
            li.classList.add("purchased");
        }

        li.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>

            <div class="item-buttons">

                <button class="purchase-button">
                    ${item.purchased ? "Purchased" : "Mark Purchased"}
                </button>

                <button class="edit-button">
                    Edit
                </button>

                <button class="delete-button">
                    Delete
                </button>

            </div>
        `;

        li.querySelector(".purchase-button").addEventListener("click", function() {

            item.purchased = !item.purchased;

            saveItems();
            displayItems();

        });


        li.querySelector(".edit-button").addEventListener("click", function() {

            editItem(index);

        });


        li.querySelector(".delete-button").addEventListener("click", function() {

            shoppingItems.splice(index, 1);

            saveItems();
            displayItems();

        });


        shoppingList.appendChild(li);

    });

    updateTotal();
}


addButton.addEventListener("click", function() {

    const name = itemNameInput.value.trim();

    const price = parseFloat(itemPriceInput.value);


    if (name === "" || isNaN(price)) {

        alert("Please enter an item and a valid price.");

        return;
    }


    const newItem = {

        name: name,

        price: price,

        purchased: false

    };


    shoppingItems.push(newItem);

    saveItems();

    displayItems();


    itemNameInput.value = "";

    itemPriceInput.value = "";

});


function editItem(index) {

    const item = shoppingItems[index];


    const newName = prompt(
        "Enter the new item name:",
        item.name
    );


    const newPrice = prompt(
        "Enter the new price:",
        item.price
    );


    if (newName === null || newPrice === null) {

        return;

    }


    const price = parseFloat(newPrice);


    if (newName.trim() === "" || isNaN(price)) {

        alert("Please enter valid information.");

        return;

    }


    item.name = newName.trim();

    item.price = price;


    saveItems();

    displayItems();

}


function updateTotal() {

    const total = shoppingItems

        .filter(function(item) {

            return item.purchased;

        })

        .reduce(function(sum, item) {

            return sum + item.price;

        }, 0);


    totalCost.textContent = total.toFixed(2);

}


function saveItems() {

    localStorage.setItem(
        "shoppingItems",
        JSON.stringify(shoppingItems)
    );

}


clearButton.addEventListener("click", function() {

    shoppingItems = [];

    saveItems();

    displayItems();

});


displayItems();