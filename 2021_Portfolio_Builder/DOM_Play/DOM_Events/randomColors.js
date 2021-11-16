const btn = document.querySelector('button');

btn.addEventListener('click', ()=> {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 255) + 1;
    const newColor = `rgb(${r}, ${g}, ${b})`;
     document.body.style.backgroundColor = newColor;
});