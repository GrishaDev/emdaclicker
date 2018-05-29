

let days=0;
let dps = 0;
let dpc = 1;

let days_waited= "You waited "+days+" days for emda";
let dayspersec = "Days per second: "+dps;

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
        document.getElementById("score").innerHTML = "You waited "+Math.round(days)+" days for emda";

        for(let i=0; i<shops.length;i++)
        {
            if(days >= shops[i].price)
            {
                document.getElementById(i).disabled = false;
            }
        }
       // console.log("adding by timer");
}

setInterval(dpser, 10);
function clicka()
{
   // console.log("adding by click");
    days+= dpc;
    document.getElementById("score").innerHTML = "You waited "+Math.round(days)+" days for emda";
}

function buya(i)
{
    console.log(i);
    if(days >= shops[i].price)
    {
        console.log("bought");
        days -= shops[i].price;
        document.getElementById("score").innerHTML = "You waited "+Math.round(days)+" days for emda";
        dps += shops[i].dps;
        document.getElementById("dps").innerHTML = "Days per second: "+dps;

        dpc ++;
        if(dps > 20)
        {
            dpc += Math.round(dps/10);
        }

        shops[i].price = Math.round(shops[i].price * 1.25);

        let div = document.getElementById("items");
        while (div.firstChild) {
            div.firstChild.remove();
        }
        init();
    }
}