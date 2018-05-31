// import { nums, achs, shops } from './config.js';

let days=0;
let dps = 0;
let dpc = 1;

let days_waited= "You waited "+days+" days for emda";
let dayspersec = "Days per second: "+dps;

let nums = 
[
    {
        num: 7,
        symbol: "M"
    },
    {
        num: 10,
        symbol: "B"
    },
    {
        num: 13,
        symbol: "T"
    },
    {
        num: 16,
        symbol: "Q"
    },
]

let achs = 
[
    {
        name: "Maybe emda soon..",
        price: 100,
        clas:'glow1',
        entered: false
    },
    {
        name: "One day will be emda.",
        price: 1000,
        clas: 'glow2',
        entered: false
    },
    {
        name: "Need to keep going..",
        price: 50000,
        clas: 'glow3',
        entered: false
    },
    {
        name: "One day will be emda.",
        price: 2500000,
        clas: 'glow4',
        entered: false
    },
    {
        name: "Exploring universe to find emda",
        price: 100000000,
        clas: 'glow5',
        entered: false
    },
    {
        name: "Need to buy 'ALOT'",
        price: 80000000000,
        clas: 'glow6',
        entered: false
    },
    {
        name: "INFINITY = EMDA?",
        price: 9992090000000,
        clas: 'glow7',
        entered: false
    },
    {
        name: "still here?",
        price: 340958348953849589984358943598348982,
        clas: 'glow8',
        entered: false
    }
]   
let shops = 
[
    {
        name: "weekend",
        price: 50,
        dps: 1
    },
    {
        name: "gimel",
        price: 200,
        dps: 4
    },
    {
        name: "yom d",
        price: 1000,
        dps: 20
    },
    {
        name: "mega gimelim",
        price: 5000,
        dps: 100
    },
    {
        name: "admama",
        price: 25000,
        dps: 500
    },
    {
        name: "ram2",
        price: 130000,
        dps: 5000
    },
    {
        name: "keva no emda",
        price: 1000000,
        dps: 100000
    },
    {
        name: "ezrahut no emda",
        price: 920000100,
        dps: 100000000
    },
    {
        name: "never emda?",
        price: 92034526523000100,
        dps: 10000342520000
    },
    {
        name: "?!",
        price: 9203452652300010898967634754865834534564346575450,
        dps: 10000342520045646456452343243445656554654600
    }
];

init();

function init()
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

function dpser()
{

    days += dps/100;

    let actualdays = beautifydays(days);

    document.getElementById("score").innerHTML = "You waited "+actualdays+" days for emda";

    for(let i=0; i<shops.length;i++)
    {
        if(days >= shops[i].price)
        {
            document.getElementById(i).disabled = false;
        }
    }

    achievements();
}

setInterval(dpser, 10);
function clicka()
{
    days+= dpc;
    document.getElementById("score").innerHTML = "You waited "+beautifydays(days)+" days for emda";

    document.getElementById("dpcvisual").style.visibility="visible";
    document.getElementById("dpcvisual").innerHTML="+"+dpc; 
    document.getElementById("dpcvisual").style.bottom="50%";
    document.getElementById("dpcvisual").style.transitionDuration = "0.3s";


    setTimeout(function()
    { 
        document.getElementById("dpcvisual").style.transitionDuration = "0s"
        document.getElementById("dpcvisual").style.visibility="hidden";
        document.getElementById("dpcvisual").style.bottom="30%";
    }, 300);
}

function achievements()
{

    //console.log(achs[0]);

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
function buya(i)
{
    console.log(i);
    if(days >= shops[i].price)
    {
        console.log("bought");
        days -= shops[i].price;
        document.getElementById("score").innerHTML = "You waited "+beautifydays(days)+" days for emda";
        dps += shops[i].dps;
        document.getElementById("dps").innerHTML = "Days per second: "+beautifydays(dps);

        dpc ++;
        if(dps > 20)
        {
            dpc += Math.round(dps/10);
        }

        document.getElementById("dpc").innerHTML = "Days per click: "+beautifydays(dpc);

        shops[i].price = Math.round(shops[i].price * 1.25);

        let div = document.getElementById("items");
        while (div.firstChild) {
            div.firstChild.remove();
        }
        init();
    }
}

function beautifydays(days)
{
    let daystxt = scientificToDecimal(Math.round(days)).toString();
    let txt = daystxt.toString();

    //let lenn = nums.length;

    for(let i=0; i<nums.length; i++)
    {
        let numsize = nums[i].num;
        let numsizeoffset = (nums[i].num)+2;
        let position = 2 - (numsizeoffset - daystxt.length);
        let symbol = nums[i].symbol;

        if(daystxt.length >= numsize && daystxt.length <= numsizeoffset)
        {
           // console.log(daystxt);
            txt = calculatedays(daystxt,position,symbol,4,true)
        }
        else if(daystxt.length >= nums[nums.length-1].num)
        {
            txt = calculatedays(daystxt,position,symbol,(daystxt.length-numsize)+1,false);
        }
    }
     return txt;
}

function calculatedays(daystxt,position,symbol,len,need)
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

function scientificToDecimal(num) {
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