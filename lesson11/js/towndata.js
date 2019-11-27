const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {

        const towns = jsonObject['towns'];

        for (let i = 0; i < towns.length; i++) {
            if (towns[i].name == 'Fish Haven' || towns[i].name == 'Preston' || towns[i].name == 'Soda Springs') {
                let cardlink = document.createElement('a')

                let card = document.createElement('section');
                let h2 = document.createElement('h2');

                let motto = document.createElement('h3');
                let year = document.createElement('p');
                let pop = document.createElement('p');

                let rainfall = document.createElement('p');
                let pic = document.createElement('img');
                

                cardlink.setAttribute('href', '/lesson11/' + towns[i].name.replace(/\s(?=\w+)/g, "").toLowerCase() + '.html');
              
                h2.textContent = towns[i].name;
                motto.textContent = towns[i].motto;

                year.textContent = 'Year founded: ' + towns[i].yearFounded;
                pop.textContent = 'Current Population: ' + towns[i].currentPopulation;

                rainfall.textContent = 'Annual Rain Fall: ' + towns[i].averageRainfall + ' in';
                pic.setAttribute('src', '/lesson11/images/' + towns[i].photo);


                card.appendChild(h2);
                card.appendChild(motto);
                card.appendChild(year);
                card.appendChild(pop);
                card.appendChild(rainfall);
                card.appendChild(pic);
                

                document.querySelector('div.cards').appendChild(cardlink).appendChild(card);

            }
        }
    });