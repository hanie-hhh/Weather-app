const getloc = async () => {
    const url = 'http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone';
    const response = await fetch(url);
    return response.json();
}

const getweather = async (lat , lon) => {
    let api = 'f0894defae7c5584798f8812232a40c2';

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
    const response = await fetch(url);
    return response.json();
}

function getdon() {
    let dayon;
    let d = new Date();
    console.log(new Date());
    if (d.getHours() >= 6 && d.getHours() <= 19) {
        dayon = 'Day';
    } else {
        dayon = 'Night';
    }
    return dayon;
}
function getIcon(weMain) {
        let icon;
        switch (weMain) {
            case 'Thunderstorm':
                icon = `${weMain}.svg`;
                break;
            case 'Drizzle':
                icon = `${weMain}.svg`;
                break;
            case 'Rain':
                icon = `${weMain}.svg`;
                break;
            case 'Snow':
                icon = `${weMain}.svg`;
                break;
            case 'Clear':
                const DayOrNigh = getdon();
                icon = `${weMain}-${DayOrNigh}.svg`;
                break;
            case 'Clouds':
                icon = `${weMain}.svg`;
                break;
            case 'Atmosphere':
                icon = `${weMain}.png`;
                break;
        }
        return icon;
    }

function getTemp(weTemp){
    const k = weTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;
    return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}

const loti = document.querySelector('.timezone');
let icon = document.querySelector('.icon');
const dese = document.querySelector('.degree-section');
const deg = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span');
const tede = document.querySelector('.temperature-description');

getloc().then (locData =>{
    console.log(locData);
        loti.textContent = locData.timezone;
            return getweather(locData.lat , locData.lon);
}).then(weData =>{
    console.log(weData);
    const weTemp = weData.main.temp;
    const weMain = weData.weather[0].main;
    const weDes = weData.weather[0].description;
    console.log(weTemp,weMain,weDes);

    const iconName = getIcon(weMain);
    icon.innerHTML = `<img src='icons/${iconName}' alt=""/>`;

    deg.textContent = Math.floor(weTemp);
    unit.textContent = 'K';

    dese.addEventListener('click', function(){
        if(unit.textContent === 'K'){
            deg.textContent = getTemp(weTemp).far;
            unit.textContent = 'F';
        }
        else if(unit.textContent === 'F'){
            deg.textContent = getTemp(weTemp).can;
            unit.textContent = 'C';
        }
        else{
            deg.textContent = getTemp(weTemp).kel;
            unit.textContent = 'K';
        }
    })
    tede.textContent = weDes;
})

