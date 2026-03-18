function manipularClasses() {
    const box1 = document.querySelector('.box1');
    const box2 = document.querySelector('.box2');
    const box3 = document.querySelector('.box3');

    box1.classList.add('nova-classe1');
    box2.classList.remove('box2');
    box3.classList.toggle('nova-classe3');
}
