function getWeather() {
    const apiKey = 'b1171383f1951ca7cb8d58600f207299';
    const citySelect = document.getElementById('citySelect');
    const selectedCity = citySelect.options[citySelect.selectedIndex].value;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados do servidor');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherInfo(data);
        })
        .catch(error => {
            console.error('Erro ao processar solicitação:', error);
            alert('Erro ao obter dados de clima. Tente novamente.');
        });
}

function displayWeatherInfo(data) {
    const weatherCard = document.getElementById('weatherCard');
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherIcon = document.getElementById('weatherIcon');

    const temperatura = data.main.temp;
    const umidade = data.main.humidity;
    const descricaoClima = data.weather[0].description;
    const minima = data.main.temp_min;
    const maxima = data.main.temp_max;

    weatherInfo.innerHTML = `
        <p>Temperatura: ${temperatura}°C</p>
        <p>Umidade: ${umidade}%</p>
        <p>Descrição do clima: ${descricaoClima}</p>
        <p>Temperatura mínima: ${minima}</p>
        <p>Temperatura máxima: ${maxima}</p>
    `;

    let iconUrl = '';
    switch (descricaoClima.toLowerCase()) {
        case 'céu limpo':
            iconUrl = 'img/sol.png';
            break;
        case 'algumas nuvens':
            iconUrl = 'img/algumas.png';
            break;
        case 'nublado':
            iconUrl = 'img/nublado.png';
            break;
        case 'trovoada':
            iconUrl = 'img/trovoada.png';
            break;
        case 'chuva', 'chuva de banho':
            iconUrl = 'img/chuva.png';
            break;
        case 'neve':
            iconUrl = 'img/neve.png';
            break;
        case 'névoa':
            iconUrl = 'img/vento.png';
            break;
    }

    weatherIcon.innerHTML = `<img src="${iconUrl}" id="icon">`;

    // Exibe o card de clima
    weatherCard.style.display = 'block';
}