setup = () => {
    document.getElementById('date').value = new Date().toDateInputValue();
    console.log(new Date().toDateInputValue());;
    document.getElementById('copy').addEventListener('click', (event) => {
        addAnimation(event, 'bounceOut', 'bounceIn');
        getAllText();
        var copyText = document.getElementById("hiddenArea");

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

        },2000);
    },2000);
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
