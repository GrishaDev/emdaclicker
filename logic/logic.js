
//Made by Grisha

// Some variables, includes config.js
let days=0;
let dps = 0;
let dpc = 1;
let dpcmult = 1;

let days_waited= "You waited "+days+" days for emda";
let dayspersec = "Days per second: "+dps;

let dpcvisual = document.getElementById("dpcvisual");
let score = document.getElementById("score");
let dpselem= document.getElementById("dps");
let dpcelem = document.getElementById("dpc");
//------------------------------------------------

//Run the game
init();

// -------------------

//Methods
function init() //initialization of stuff
{
    setInterval(main, INTERVAL_VALUE);
    getSave();
    reloadShops();
    reloadClickShops();
}

function getSave() // Load saved game if any
{
    let storageScore =  Number(localStorage.getItem("score"));
    let storageDps= Number(localStorage.getItem("dps"));
    let storageDpc = Number(localStorage.getItem("dpc"));
    let storageDpcMult = Number(localStorage.getItem("dpcmult"));
    let storageShops = JSON.parse(localStorage.getItem("shops"));
    let storageClickShops = JSON.parse(localStorage.getItem("clickshops"));

    if(storageScore != undefined && storageDps != undefined && storageDpc != undefined
      && storageDpcMult!=undefined && storageShops!=undefined && storageClickShops!=undefined)
    {
        days = storageScore;
        dps = storageDps;
        dpc = storageDpc;
        dpcmult = storageDpcMult;
        shops = storageShops;
        clickshops = storageClickShops;

        if(dpc < 1)
            dpc = 1;
    }
    updateElems();
}

function setSave() // Save the game
{
    localStorage.setItem("score", days.toString());
    localStorage.setItem("dps", dps.toString());
    localStorage.setItem("dpc", dpc.toString());
    localStorage.setItem("dpcmult", dpcmult.toString());
    localStorage.setItem("shops", JSON.stringify(shops));
    localStorage.setItem("clickshops", JSON.stringify(clickshops));
}

function updateElems() // Update dps, dpc etc
{
    score.innerHTML = "You waited "+beautifydays(days)+" days for emda";
    dpselem.innerHTML = "Days per second: "+beautifydays(dps);
    dpcelem.innerHTML = "Days per click: "+beautifydays(dpc*dpcmult);
}

function reloadShops() // Reload available shops
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

function reloadClickShops() // Reload click upgrades
{
    let shopdiv = document.getElementById("clickitems");
    console.log("am i here");
    for(let i=0; i<clickshops.length;i++)
    {
        let newdiv = document.createElement("div");
        newdiv.classList.add('divclickitem');

        newdiv.setAttribute("tooltip","Multiply your days per click!\nPrice: "+clickshops[i].price);
        let btn = document.createElement("INPUT");
        btn.setAttribute("type", "button");
        btn.disabled = true;
        btn.setAttribute("id", IDCLICK_BONUS+i);
        btn.setAttribute("value", clickshops[i].name);

        btn.classList.add("item");
        btn.onclick = function() {clickbuya(i) };

        // let span = document.createElement("span");
        // span.classList.add("tooltiptext");
        // span.setAttribute("value",clickshops[i].price);

        //newdiv.appendChild(span);
        newdiv.appendChild(btn);
        shopdiv.appendChild(newdiv);
    }
}
function main() // Logic, runs every INTERVAL_VALUE seconds.
{
    days += dps/100;
    updateElems();

    for(let i=0; i<shops.length;i++)
    {
        if(days >= shops[i].price)
        {
            //console.log("SHOPS:: "+days+" is bigger than "+shops[i].price);
            document.getElementById(i).disabled = false;
        }
        else
        {
            document.getElementById(i).disabled = true;
        }
    }
    for(let i=0; i<clickshops.length;i++)
    {
        if(days >= clickshops[i].price)
        {
            //console.log("click SHOPS:: "+days+" is bigger than "+clickshops[i].price);
            document.getElementById(IDCLICK_BONUS+i).disabled = false;
        }
        else
        {
            document.getElementById(IDCLICK_BONUS+i).disabled = true;
        }
    }
    achievements();
}

function clicka() // Executed on emda click.
{
    days+= dpc*dpcmult;
    updateElems();
    clickAnimation();
}

function clickAnimation() // Animation of clicking
{
    dpcvisual.style.visibility="visible";
    dpcvisual.innerHTML="+"+beautifydays(dpc*dpcmult); 
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
        dps += shops[i].dps;
        dpc += Math.ceil(shops[i].dps/10);

        updateElems()
        shops[i].price = Math.round(shops[i].price * 1.25);

        let div = document.getElementById("items");
        while (div.firstChild) {
            div.firstChild.remove();
        }
        reloadShops();
        setSave();
    }
}

function clickbuya(i) // Handles buying upgrade
{
    if(days >= clickshops[i].price)
    {
        days -= clickshops[i].price;
        dpcmult *= clickshops[i].dpc

        updateElems()

        clickshops.splice(i,1);
        // let div = document.getElementById(IDCLICK_BONUS+i);
        // console.log(div);
        // div.remove();

        let div = document.getElementById("clickitems");
        while (div.firstChild)
        {
            div.firstChild.remove();
        }
        reloadClickShops();
        setSave();
    }
}

function wipe() // Wipe data
{
    let sure = prompt("Are you sure to delete all saved progress? type yes");

    if(sure==="yes")
    {
        localStorage.removeItem("score");
        localStorage.removeItem("dps");
        localStorage.removeItem("dpc");
        localStorage.removeItem("dpcmult");
        localStorage.removeItem("shops");
        localStorage.removeItem("clickshops");
        location.reload();
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