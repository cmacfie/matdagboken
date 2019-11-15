setup = () => {
    document.getElementById('date').value = new Date().toDateInputValue();
    console.log(new Date().toDateInputValue());
    rotatingImages();
    document.getElementById('copy').addEventListener('click', (event) => {
        addAnimation(event.target, 'bounceOut', 'bounceIn', 1000, 1000);
        getAllText();
        var copyText = document.getElementById("hiddenArea");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");
    }, false);
};

function rotatingImages() {
    const images = ['apple', 'baker', 'cherries', 'chocolate', 'cupcake', 'pizza', 'strawberry', 'sushi', 'watermelon'];
    const imageDOM = document.getElementById('image');
    var order = [];
    for(var i = 0; i < images.length; i++) {
        order.push(i);
    }
    console.log(order);
    const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
    shuffleArray(order);
    var counter = 0;
    imageDOM.src = `images/${images[order[counter]]}.png`;
    counter++;
    addAnimation(imageDOM, 'zoomInLeft', 'zoomOutRight', 3000, 1000);
    if(counter === order.length) {
        counter = 0;
        shuffleArray(order);
    }
    setInterval(() => {
        imageDOM.src = `images/${images[order[counter]]}.png`;
        counter++;
        addAnimation(imageDOM, 'zoomInLeft', 'zoomOutRight', 3000, 1000);
        if(counter === order.length) {
            counter = 0;
            shuffleArray(order);
        }
    }, 4000);
}

function addAnimation(element, animation1, animation2, timeUntilRemove, delay2) {
    element.classList.add('animated');
    element.classList.add(animation1);
    setTimeout(() => {
        element.classList.add(animation2);
        element.classList.remove(animation1);
        setTimeout(() => {
            element.classList.remove(animation2);

        },delay2);
    },timeUntilRemove);
}

getAllText = () => {
    const inputs = document.getElementsByTagName('input');
    var string = '';
    const dinnerFields = document.getElementsByClassName('dinner-field');
    const isJustEndOfDay = Array.from(dinnerFields).filter(dinnerField => {
        return dinnerField.value.length > 0;
    }).length === 0;
    Array.from(inputs).map((input, index) => {
        if(input.value.length > 0) {
            var c = '';
            if (index < 2) {
                if(!isJustEndOfDay) {
                    c = input.value.replace('T', ' ');
                }
            } else if (input.type === 'checkbox') {
                if(!isJustEndOfDay) {
                    c = `${input.value}: ${input.checked ? 'Ja' : 'Nej'}` + '\n';
                }
            } else {
                c = `${input.name} ${input.value}` + '\n';
            }
            string += c;
        }
    });
    document.getElementById('hiddenArea').textContent  = string;
};

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

setup();
