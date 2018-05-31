

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
    let a = Math.round(days).toString();
    let b=a.toString();

    let lenn = nums.length;

    for(let x=0; x<nums.length; x++)
    {
        if(a.length >= nums[x].num && a.length <= nums[x].num+2)
        {
         //   console.log(a.length);
            b = calculatedays(nums[x].num-2,a.length,a,x);
        }
        else if(a.length >= nums[nums.length-1].num)
        {
            b = calculatedays(nums[x].num-2,a.length,a,x);
        }
    }

     return b;
}

function calculatedays(num,len,a,x)
{
    b='';

    let offset = num - a.length;

    // for(let j=0;j <4; j++)
    // {
    //     if
    // }
    let val=0;

    if(offset == 2)
        val = 0;
    else if(offset == 1)
        val = 1;
    else
        val=2;

    for(let i=0; i<4; i++)
    {
        if(i==val)
            b += a[i].toString()+'.';
        else
            b += a[i].toString();
    }
    b+=nums[x].symbol;

    return b;
}
