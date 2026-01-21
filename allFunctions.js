document.addEventListener('click', e => {
    if (!e.target.matches('.button')) return;

    const parent = e.target.closest('.item');
    const id = Date.now(); // unique

    const items = JSON.parse(localStorage.getItem('savedItems')) || [];

    items.push({
        id,
        html: parent.outerHTML
    });

    localStorage.setItem('savedItems', JSON.stringify(items));

    window.location.href = 'Basket.html';
});



document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    
    if(!container)return;

    const newBtn=document.createElement('button');
    //const foundIt=document.getElementsByClassName('item');

    console.log('here it is:',container);
    console.log("type:",typeof(container))

    newBtn.textContent='Checkout  \nTotal';
    newBtn.style.paddingRight='10px'
    newBtn.style.backgroundColor='lightblue';
    newBtn.style.borderColor='lightblue';
    newBtn.style.width='100px';
    newBtn.style.height='50px'
    container.appendChild(newBtn);

    const newDiv=document.createElement('div');
    newDiv.textContent='Total';
    newDiv.style.height='100px';
    newDiv.style.width='100px';
    console.log("show me:",newDiv);


    const items = JSON.parse(localStorage.getItem('savedItems')) || [];

    items.forEach(item => {
        container.insertAdjacentHTML('beforeend', item.html);
    });

    // Convert buttons to REMOVE
    container.querySelectorAll('.button').forEach((btn, index) => {
        btn.textContent = 'Remove';
        btn.classList.replace('button', 'remove-btn');
        btn.dataset.id = items[index].id;
    });
    
});


document.addEventListener('click', e => {
    if (!e.target.matches('.remove-btn')) return;

    const id = Number(e.target.dataset.id);
    const itemEl = e.target.closest('.item');

    // Remove from DOM
    itemEl.remove();

    // Remove from storage
    let items = JSON.parse(localStorage.getItem('savedItems')) || [];
    items = items.filter(item => item.id !== id);
    localStorage.setItem('savedItems', JSON.stringify(items));
});