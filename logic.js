

let days=0;
let dps = 0;
let dpc = 1;

let days_waited= "You waited "+days+" days for emda";
let dayspersec = "Days per second: "+dps;

let achs = [false,false,false,false,false,false,false,false];
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

    achievements();
}

setInterval(dpser, 10);
function clicka()
{
   // console.log("adding by click");
    days+= dpc;
    document.getElementById("score").innerHTML = "You waited "+Math.round(days)+" days for emda";
}

function achievements()
{

    console.log(achs[0]);

    if(days >= 3 && !achs[0]) // 100
    {
        document.getElementById("ach").innerHTML = "Maybe emda soon..";
        document.getElementById("deskpic").classList.add('glow1');
        achs[0] = true;
        console.log(achs[0]);
    }
    else if(days >= 4 && !achs[1]) // 1000
    {
        document.getElementById("ach").innerHTML = "One day will be emda.";
        document.getElementById("deskpic").classList.add('glow2');
        achs[1] = true
    }
    else if(days >= 5 && !achs[2]) // 50000
    {
        document.getElementById("ach").innerHTML = "Need to keep going";
        document.getElementById("deskpic").classList.add('glow3');
        achs[2] = true
    }
    else if(days >= 6) // 2500000
    {
        document.getElementById("ach").innerHTML = "Is there even emda?.";
        document.getElementById("deskpic").classList.add('glow4');
    }
    else if(days >= 7) // 100000000
    {
        document.getElementById("ach").innerHTML = "Exploring universe to find emda";
        document.getElementById("deskpic").classList.add('glow5');
    }
    else if(days >= 8) // 80000000000
    {
        document.getElementById("ach").innerHTML = "Need to buy 'ALOT'";
        document.getElementById("deskpic").classList.add('glow6');
    }
    else if(days >= 9) // 9992090000000
    {
        document.getElementById("ach").innerHTML = "INFINITY = EMDA?";
        document.getElementById("deskpic").classList.add('glow7');
    }
    else if(days >= 10) // 34095834895384958998435894359834898534985389454
    {
        document.getElementById("ach").innerHTML = "still here?";
        document.getElementById("deskpic").classList.add('glow8');
    }
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

        document.getElementById("dpc").innerHTML = "Days per click: "+dpc;

        shops[i].price = Math.round(shops[i].price * 1.25);

        let div = document.getElementById("items");
        while (div.firstChild) {
            div.firstChild.remove();
        }
        init();
    }
}