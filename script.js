const lupa = document.getElementById('lupa');
const city = document.getElementById('city');
let modal = document.getElementById('modal');
const hourly = new XMLHttpRequest();
const now = new XMLHttpRequest();


lupa.onclick = ()=>
{
    
    if(city.value != '')
    {
        document.getElementById('now').innerHTML = '';
        document.getElementById('DIV').innerHTML = '';
        document.getElementById('error').innerHTML = '';
        hourly.open("GET", `http://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=b2bb251979e761162f9e9cbfd82bd14d&units=metric`);
        now.open("GET", `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=b2bb251979e761162f9e9cbfd82bd14d&units=metric`);
        now.send();
        hourly.send();
    }
    else
    {
        modal.innerHTML = `<p>Enter city</p>`;
        showModal();
    }
   
}


now.onreadystatechange=()=>
{
    if(now.readyState == XMLHttpRequest.DONE)
    {
        
            switch (now.status) 
            {
                case 200:
                    { 
                        const now_ = JSON.parse(now.responseText);
                        Now(now_);
                    }
                    break;
                case 404:{ Error_();}break;
                default:
                    break;
            }
           
    }
}




hourly.onreadystatechange=()=>
{
    if(hourly.readyState == XMLHttpRequest.DONE)
    {
            switch (hourly.status) 
            {
                case 200:
                    { 
                        const hourly_ = JSON.parse(hourly.responseText);
                        Hourly(hourly_);
                    }
                    break;
                default:
                    break;
            }
           
    }
}


function DayOfWeek()
{
    var days = 
    [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    return days[new Date().getDay()];
}

function Hourly(hourly_) 
{
    let div_ = document.getElementById('DIV');
    let table = document.createElement('table');
    let tr;
    let td;
    for (let i = 0; i < 6; i++) 
    {
        tr = document.createElement('tr');
        for (let j = 0; j < 7; j++) 
        {
            td = document.createElement('td');
            if(i == 0)
            { 
                td.setAttribute('colspan',7);
                td.innerText = "Hourly";
                tr.append(td);
                break;
            }
            tr.append(td);
        } 
        table.append(tr);
    }
    table.children[1].children[0].innerText = DayOfWeek();
    let date_;
    for (let i = 1; i < table.children[1].children.length; i++) 
    {
        date_ = new Date(hourly_.list[i].dt_txt);
        table.children[1].children[i].innerText =  date_.getHours() + ":" +date_.getMinutes()+date_.getSeconds();
    }
    let img;
    for (let i = 1; i < table.children[2].children.length; i++) 
    {
        img = document.createElement('img');
        img.setAttribute('src', "http://openweathermap.org/img/w/" + hourly_.list[i].weather[0].icon +  ".png");
        table.children[2].children[i].append(img);
        
    }
    table.children[3].children[0].innerText = 'Forecast';
    for (let i = 1; i < table.children[3].children.length; i++) 
    {
        table.children[3].children[i].innerText = hourly_.list[i].weather[0].main;
    }
    table.children[4].children[0].innerText = 'Temp(°C)';
    for (let i = 1; i < table.children[4].children.length; i++) 
    {
        table.children[4].children[i].innerText = Math.round(hourly_.list[i].main.temp).toString() + '°C';
    }
    table.children[5].children[0].innerText = 'Wind (km/h)';
    for (let i = 1; i < table.children[5].children.length; i++) 
    {
        table.children[5].children[i].innerText = Math.round(hourly_.list[i].wind.speed).toString();
    }
    for (let i = 0; i < table.children.length; i++) 
    {
        table.children[i].children[0].setAttribute('id','left');
        
    }
    table.children[0].children[0].style.color = "#06169e";
    table.children[0].children[0].style.fontWeight = "bold";
    table.children[0].children[0].style.fontSize = "26px";
    table.children[0].children[0].style.textIndent= "10%";
    table.children[0].children[0].style.height = '60px';
    table.children[0].children[0].style.textAlign = 'left';
    div_.append(table);
}


function Now(now_) 
{
    let div_ = document.getElementById('now');
    let table = document.createElement('table');
    table.setAttribute('id','table_now');
    let size = 5;
    let tr;
    let td;
    for (let i = 0; i < 5; i++) 
    {
        tr = document.createElement('tr');
        for (let j = 0; j < size; j++) 
        {
            td = document.createElement('td');
            tr.append(td);
            if(i >= 1) size=3;
        } 
        table.append(tr);
        
    }
    table.children[0].children[0].innerText = now_.name;
    table.children[1].children[0].innerText = now_.weather[0].main;
    table.children[0].children[0].style.textIndent= "10%";
    table.children[0].children[0].style.color= "#076969";
    table.children[0].children[0].style.fontWeight = "bold";
    table.children[0].children[0].style.fontSize = "22px";
    table.children[0].children[0].style.color= "#076969";
    table.children[1].children[0].style.textIndent= "10%";
    table.children[0].children[4].innerText = new Date().toLocaleDateString();
    table.children[0].children[4].style.fontWeight = "bold";
    table.children[0].children[4].style.color= "#076969";
    table.children[0].children[4].style.fontSize = "22px";
    table.children[0].children[4].style.textAlign= 'right';
    table.children[2].children[0].setAttribute('rowspan',3);
    let img = document.createElement('img');
    img.setAttribute('src', "http://openweathermap.org/img/w/" + now_.weather[0].icon +  ".png");
    img.setAttribute('id',"img_now");
    table.children[2].children[0].append(img);
    table.children[2].children[0].style.textAlign= 'center';
    table.children[0].children[1].setAttribute('rowspan',5);
    table.children[0].children[1].setAttribute('id','temp');
    table.children[0].children[1].innerText = Math.round(now_.main.temp).toString() + '°C';
    table.children[2].children[1].innerText = 'Min temperature';
    table.children[2].children[2].innerText = Math.round(now_.main.temp_min).toString() + '°C';
    table.children[3].children[0].innerText = 'Max temperature';
    table.children[3].children[1].innerText = Math.round(now_.main.temp_max).toString() + '°C';
    table.children[4].children[0].innerText = 'Wind speed (km/h)';
    table.children[4].children[1].innerText = Math.round(now_.wind.speed);
    div_.append(table);
}

function Error_() 
{
    let error = document.getElementById('error');
    let table = document.createElement('table');
    let tr;
    for (let i = 0; i < 3; i++) 
    {
        tr = document.createElement('tr');
        table.append(tr);
    }
    table.children[0].innerText = '404';
    table.children[0].style.color = "orange";
    table.children[0].style.fontSize = "42px";
    table.children[1].innerText = 'NOT FOUND';
    table.children[2].innerText = 'Please enter a different city';
    error.append(table);
}

function showModal()
{
    modal.classList.remove('nodispl');
    modal.classList.add('rollup');
    setTimeout(()=>
    {
        modal.classList.remove('rollup');
        modal.classList.add('nodispl');
    },3000);
}