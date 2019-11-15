setup = () => {
    document.getElementById('date').value = new Date().toDateInputValue();
    console.log(new Date().toDateInputValue());;
    document.getElementById('copy').addEventListener('click', (event) => {
        addAnimation(event, 'bounceOut', 'bounceIn');
        console.log(event.target.classList.add("animated"));
        getAllText();
        var copyText = document.getElementById("hiddenArea");
        console.log(document.getElementsByTagName('main-container'))

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");
    }, false);
};

function addAnimation(element, animation1, animation2) {
    element.target.classList.add('animated');
    element.target.classList.add(animation1);
    setTimeout(() => {
        element.target.classList.add(animation2);
        element.target.classList.remove(animation1);
        setTimeout(() => {
            element.target.classList.remove(animation2);

        },1000);
    },2000);
}

getAllText = () => {
    const inputs = document.getElementsByTagName('input');
    var string = '';
    Array.from(inputs).map((input, index) => {
        if(input.value.length > 0) {
            var c = '';
            if (index === 0) {
                c = input.value.replace('T', ' ');
            } else if (input.type === 'checkbox') {
                c = `${input.value}: ${input.checked ? 'Ja' : 'Nej'}` + '\n';
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
