const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {

        const towns = jsonObject['towns'];

        for (let i = 0; i < towns.length; i++) {
            if ( towns[i].name == 'Soda Springs') {

                let card = document.createElement('section');
                let h2 = document.createElement('h2');

                let event1 = document.createElement('p');
                let event2 = document.createElement('p');
                let event3 = document.createElement('p');
              
                h2.textContent = '2020 Events';
                event1.textContent = towns[i].events[0];
                event2.textContent = towns[i].events[1];
                event3.textContent = towns[i].events[2];

                card.appendChild(h2);
                card.appendChild(event1);
                card.appendChild(event2);
                card.appendChild(event3);                

                document.querySelector('div.events').appendChild(card);

            }
        }
    });