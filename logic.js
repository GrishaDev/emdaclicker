
//Made by Grisha

// Some variables, includes config.js
let days=0;
let dps = 0;
let dpc = 1;

let days_waited= "You waited "+days+" days for emda";
let dayspersec = "Days per second: "+dps;

let dpcvisual = document.getElementById("dpcvisual");
let score = document.getElementById("score");
let dpselem= document.getElementById("dps");
let dpcelem = document.getElementById("dpc");
//------------------------------------------------

//Run the game
init();
setInterval(main, INTERVAL_VALUE);
// -------------------

//Methods
function init() //initialization of stuff
{
    let shopdiv = document.getElementById("items");

    for(let i=0; i<shops.length;i++)
    {
        let newdiv = document.createElement("div");
        newdiv.classList.add('divitem');

        let btn = document.createElement("INPUT");
        btn.setAttribute("type", "button");
        btn.disabled = true;
        btn.setAttribute("id", i);

        if(i==9)
            btn.setAttribute("value", shops[i].name+": "+"ALOT");
        else
            btn.setAttribute("value", shops[i].name+": "+shops[i].price);
        btn.classList.add("item");
        btn.onclick = function() {buya(i) };

        newdiv.appendChild(btn);
        shopdiv.appendChild(newdiv);
    }
}

function main() // Logic, runs every INTERVAL_VALUE seconds.
{
    days += dps/100;
    score.innerHTML = "You waited "+beautifydays(days)+" days for emda";

    for(let i=0; i<shops.length;i++)
    {
        if(days >= shops[i].price)
        {
            document.getElementById(i).disabled = false;
        }
    }
    achievements();
}

function clicka() // Executed on emda click.
{
    days+= dpc;
    score.innerHTML = "You waited "+beautifydays(days)+" days for emda";

    dpcvisual.style.visibility="visible";
    dpcvisual.innerHTML="+"+beautifydays(dpc); 
    dpcvisual.style.bottom="50%";
    dpcvisual.style.transitionDuration = "0.3s";

    setTimeout(function()
    { 
        dpcvisual.style.transitionDuration = "0s"
        dpcvisual.style.visibility="hidden";
        dpcvisual.style.bottom="30%";
    }, 300);
}

function achievements() // Handles achievements
{
    for(let i=0; i < achs.length; i++)
    {
        if(days >= achs[i].price && !achs[i].entered)
        {
            document.getElementById("ach").innerHTML = achs[i].name;
            document.getElementById("deskpic").classList.add(achs[i].clas);
            achs[i].entered = true;
        }
    }
}

function buya(i) // Handles buying upgrade
{
    if(days >= shops[i].price)
    {
        days -= shops[i].price;
        score.innerHTML = "You waited "+beautifydays(days)+" days for emda";
        dps += shops[i].dps;
        dpselem.innerHTML = "Days per second: "+beautifydays(dps);

        dpc += Math.ceil(shops[i].dps/10);

        dpcelem.innerHTML = "Days per click: "+beautifydays(dpc);
        shops[i].price = Math.round(shops[i].price * 1.25);

        let div = document.getElementById("items");
        while (div.firstChild) {
            div.firstChild.remove();
        }
        init();
    }
}

function beautifydays(days) // Formats number(needed for large numbers)
{
    let daystxt = scientificToDecimal(Math.round(days)).toString();
    let txt = daystxt.toString();

    for(let i=0; i<nums.length; i++)
    {
        let numsize = nums[i].num;
        let numsizeoffset = (nums[i].num)+2;
        let position = 2 - (numsizeoffset - daystxt.length);
        let symbol = nums[i].symbol;

        if(daystxt.length >= numsize && daystxt.length <= numsizeoffset)
        {
            txt = calculatedays(daystxt,position,symbol,4,true)
        }
        else if(daystxt.length >= nums[nums.length-1].num)
        {
            txt = calculatedays(daystxt,position,symbol,(daystxt.length-numsize)+1,false);
        }
    }
     return txt;
}

function calculatedays(daystxt,position,symbol,len,need) // Part of number formation
{
    let str='';

    for(let i=0; i<len; i++)
    {
        if(i==position && need)
            str += daystxt[i].toString()+'.';
        else
            str += daystxt[i].toString();
    }
    str+=symbol;

    return str;
}

function scientificToDecimal(num) // Transfers numbers like 2.3024E+13 to normal number
{
    //if the number is in scientific notation remove it
    if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        var zero = '0',
            parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
            e = parts.pop(),//store the exponential part
            l = Math.abs(e), //get the number of zeros
            sign = e/l,
            coeff_array = parts[0].split('.');
        if(sign === -1) {
            num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
        }
        else {
            var dec = coeff_array[1];
            if(dec) l = l - dec.length;
            num = coeff_array.join('') + new Array(l+1).join(zero);
        }
    }
    return num;
};

//------------------------------------------------------------------