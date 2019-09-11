var exp = '', number, decimal, equal, operator, allowSR = true;
var textview = document.forms['calculator']['textview'];

function insert(num)
{
    //console.log('hocche');
    if(equal)
    {
        exp = num;
        textview.value = exp;
        number = true;
        equal = false;
    }
    else
    {
        exp = textview.value + num;
        textview.value = exp;
        number = true;
    }
    if(operator) decimal = false;
    SR('a');
}

function insertop(op)
{
    textview.value = exp + op;
    operator = true;
    equal = false;
    allowSR = false;
    SR('a');
}
function insertdec()
{
    if(number && !decimal)
    {
        textview.value = exp + '.';
        decimal = true;
        operator = false;
    }
}
function equalto() 
{ 
    let x = textview.value; 
    let y = eval(x);
    textview.value = y;
}
function clr()
{
    exp ='';
    textview.value = exp;
    decimal = false;
}

function back()
{
    exp = textview.value;
    exp = exp.substring(0, exp.length-1);
    textview.value = exp;
}
function SR(x)
{
    if(x=='sr')
    {
        exp = Math.sqrt(exp);
        textview.value = exp;
    }
    else if(x=='cr')
    {
        exp = Math.cbrt(exp);
        textview.value = exp;
    }
    else if(x=='s')
    {
        exp = exp*exp;
        textview.value = exp;
    }
    else if(x=='c')
    {
        exp = exp*exp*exp;
        textview.value = exp;
    }
    else if(x=='f')
    {
        let res = 1;
        for(var i=1;i<=exp;i++)
        res *= i;
        textview.value = res;
    }
    else if(x=='l')
    {
        exp = Math.log(exp);
        textview.value = exp;
    }
    else if(x=='a' && allowSR)
    {
        document.getElementById('sr').value = false;
        document.getElementById('cr').value = false;
        document.getElementById('s').value = false;
        document.getElementById('c').value = false;
        document.getElementById('f').value = false;
        document.getElementById('l').value = false;
    }
    else if(!allowSR)
    {
        document.getElementById('sr').value = true;
        document.getElementById('cr').value = true;
        document.getElementById('s').value = true;
        document.getElementById('c').value = true;
        document.getElementById('f').value = true;
        document.getElementById('l').value = true;
    }
}
/*
var answer = 0;
var operand1 = ''
var operator = ''
var operand2 = ''
var keyPressed = ''

document.addEventListener('keydown',function(event){

    console.log(event)
    keyPressed = event.key;

    if (keyPressed>=0 && keyPressed<=9) {
        addOperand(keyPressed);
    } else if (keyPressed=='Backspace') {
        del();
    } else if (keyPressed=='Delete') {
        clearAll();
    } else if (keyPressed=='Enter') {
        equals();
    } else {
        if(keyPressed=='+'||keyPressed=='-'||keyPressed=='/'||keyPressed=='*')
            addOperatorBinary(keyPressed);
    }

})

//BINARY operator parser function
function addOperatorBinary(op) {

    if(operator=='' || operator.length==1 && operand1 && !operand2) // to restrict situations like a +-/* b
    {
        if (op=='**')
            op = '^';
        operator = op;
        document.getElementById('previous').value = document.getElementById('current').value + operator;
    } else {
        if (operand1 && operand2 && operator)  // for situation like 2+5+ => 7+ 
        {
            equals();
            operator = op;
            addOperatorBinary(op);
        }
    }
    console.log("operator->"+operator);
    
}

//Operand parser function (both UNARY and BINARY)
function addOperand(op) {
 
    //When a new operation begins the calculator will be reset
    // but it will not happen if user chooses current answer as one of the next operand
    if(answer && operand1 && !operator)
        clearAll();
    
    //To take operands as input 
    if (operator=='') {
        operand1 += op;
        console.log("operand1->"+operand1);
        document.getElementById('current').value = operand1;
    } else {
        operand2 += op;
        console.log("operand2->"+operand2);
        document.getElementById('current').value = operand2;
    }

}

//To calculate results (for Binary operations)
function equals() {

    document.getElementById('previous').value += document.getElementById('current').value;

    //If second operand is missing then it will take first operand as second operand as well
    if(!operand2)
        operand2 = operand1;

    //This switch is to perform binary operations
    switch(operator)
    {
        case '+': let v1 = parseInt(operand1);
                  let v2 = parseInt(operand2);
                  operand1 = v1 + v2;
                  break;
        case '-': operand1 -= operand2;
                  break;
        case '*': operand1 *= operand2;
                  break;
        case '/': operand1 /= operand2;
                  break;
        case '%': operand1 %= operand2;
                  break;
        case '^': operand1 **= operand2;
                  break;
        case 'C': operand1 = fact(operand1)/(fact(operand1-operand2)*fact(operand2));
                  break;
        case 'P': operand1 = fact(operand1)/fact(operand1-operand2);
                  break;
    }

    answer = 1;
    document.getElementById('current').value = operand1;
    operator = operand2 = '';

    console.log('After equals operator: '+operator);
    console.log('After equals operand1: '+operand1);
    console.log('After equals operand2: '+operand2);
    

}


//UNARY operator parser and UNARY operation calculating function
function addOperatorUnary(op) {

    //This switch is to display the current unary operation with proper formatting
    switch(op) 
    {
        case '!': document.getElementById('previous').value = operand1 + op;
                  break;
        case '1/x': document.getElementById('previous').value = '1'+'/'+operand1;
                    break;
        case 'x^2':
        case 'x^3': document.getElementById('previous').value = '('+ operand1 + ')^' + op[2];
                    break;
        case '10^x': document.getElementById('previous').value = '10^' +'('+ operand1 + ')';
                     break;
        case 'e^x': document.getElementById('previous').value = 'e^' +'('+ operand1 + ')';
                    break;
        default: document.getElementById('previous').value = op +'('+ operand1 + ')';
    }
    
    //This switch is to perform unary operations
    switch(op)
    {
        case 'sin': operand1 = Math.sin(operand1);
                    break;
        case 'isin': operand1 = Math.asin(operand1);
                     break;
        case 'cos': operand1 = Math.cos(operand1);
                    break;
        case 'icos': operand1 = Math.acos(operand1);
                     break;
        case 'tan': operand1 = Math.tan(operand1);
                    break;
        case 'itan': operand1 = Math.atan(operand1);
                     break;
        case 'ln': operand1 = Math.log(operand1);
                   break;
        case 'log10': operand1 = Math.log10(operand1);
                      break;
        case 'log2': operand1 = Math.log2(operand1);
                     break;
        case '√': operand1 = Math.sqrt(operand1);
                  break;
        case '∛': operand1 = Math.cbrt(operand1);
                  break;
        case '!': operand1 = fact(operand1);
                  break;
        case '1/x': operand1 = 1/operand1;
                    break;
        case 'x^2': operand1 *= operand1;
                    break;
        case 'x^3': operand1 *= (operand1*operand1);
                    break;
        case '10^x': operand1 = 10 ** operand1;
                     break;
        case 'e^x': operand1 = 2.71828 ** operand1;
                    break;
    }

    answer = 1;
    document.getElementById('current').value = operand1;
    operator = '';

}

//To reset the calculator
function clearAll() {

    document.getElementById('previous').value = '';
    document.getElementById('current').value = '';
    operand1 = operand2 = operator = '';
    answer = 0;

}

//To reset the current entry, but not the calculator
function clearEntry() {

    //When there is an answer, the CLEAR ENTRY will do CLEAR ALL
    if(answer)
        document.getElementById('previous').value = '';

    //If user is typing the first operand then it will be reset
    if(operand2 == '' && operator == '')
        operand1 = ''

    //If user is typing the second operand then it will be reset
    if(operand1 !== '' && operator !== '')
        operand2 = ''

    document.getElementById('current').value = '';

}

//To delete the current entry one by one
function del() {

    //When there is an answer, the DEL will do CLEAR ALL
    if(answer)
        clearAll();

    var result = document.getElementById('current').value;
    var newResult = ''
    
    //When DEL is used as BACKSPACE
    for(var i=0;i<result.length-1;i++){
        newResult += result[i];
        if(operand1 !== '' && operator !== '')
                operand2 = newResult;

        if(operand2 == '' && operator == '')
                operand1 = newResult;
        
    }

    //When DEL is used as CLEAR ENTRY
    if (!newResult) {
        if(operand1 !== '' && operator !== '')
            operand2 = newResult;

        if(operand2 == '' && operator == '')
            operand1 = newResult;
    }

    document.getElementById('current').value = newResult;

}

// Factorial Operation
function fact(op) {
    let result = 1;
    for(var i=1;i<=op;i++)
        result *= i;
    return result;
}*/