let screen = document.getElementById('outScreen');
let buttons = document.getElementsByTagName('button');
let point = false; //to check if there's already a point in the number

function write(event) {
    let btType = event.target.className;
    let btContent = event.target.textContent;

    checkCases(btType, btContent);
}

function checkCases(btType, btContent) {
    if ((isEmpty() && btType == 'operator')
        || (isEmpty() && btType == 'point')) {
        return;
    } else if (btContent == 'C') {
        screen.value = '';
        point = false;
    } else if (btContent == '=') {
        calcResult();
    } else if (btType == 'operator' && isOperator()) { //if the last digit is an operator and an operator is typed, the last one is replaced
        screen.value = screen.value.slice(0, -1);
        screen.value += btContent;
    } else if (btType == 'point' && !point && !isOperator()) { //a point will only be written if variable point is false and the last digit is not an operator
        screen.value += btContent;
        point = true;
    } else if ((btType == 'point' && point) || (btType == 'point' && isOperator())) {
        return;
    } else {
        screen.value += btContent;
        
        if (isOperator()) {
            point = false; //if an operator is typed, the point variable is set to false
        }
    }
}

//check if the last digit is an operator
function isOperator() {
    let lastDigit = screen.value.slice(-1);

    switch (lastDigit) {
        case '+':
            return true;
        case '-':
            return true;
        case 'x':
            return true;
        case '÷':
            return true;
        default:
            return false;
    }
}

function isEmpty() {
    if (screen.value == '') {
        return true;
    } else {
        return false;
    }
}

function calcResult() {
    let written = screen.value;

    if (written == '') {
        return;
    } else if (written.charAt(written.length - 1) == '.' || isOperator()) {
        written += 0;
    }

    for (i in written) {
        if (written.charAt(i) == 'x') {
            written = written.replace('x', '*');
        } else if (written.charAt(i) == '÷') {
            written = written.replace('÷', '/');
        }
    }

    screen.value = eval(written);

    if (screen.value.indexOf('.') == -1) {
        point = false;
    } else {
        point = true;
    }
}

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', write);
}
