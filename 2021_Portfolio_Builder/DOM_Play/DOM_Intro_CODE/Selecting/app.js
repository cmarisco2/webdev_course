const allImages = document.getElementsByTagName('img');

for(let image of allImages){
    // console.log(image.src);
    // image.src = 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
}

const squareImages = document.getElementsByClassName('square');

for(let img of squareImages){
    // img.src ='https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    console.log(img.src);
}

const newImages = document.querySelectorAll('img');

for(let img of newImages){
    img.src = 'https://images.unsplash.com/photo-1575540325855-4b5d285a3845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80';
}

