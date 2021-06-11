// Leave the next line, the form must be assigned to a variable named 'form' in order for the exercise test to pass
const form = document.querySelector('form');
const groceryList = document.querySelector('#list');

// Uses old syntax.

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = form.elements.product;
    const qty = form.elements.qty;

    const groceryItem = document.createElement('li');

    groceryItem.innerText = `${qty.value} ${product.value}`;

    groceryList.appendChild(groceryItem);

    product.value = '';
    qty.value = '';
});