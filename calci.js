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
