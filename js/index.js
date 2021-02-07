"use strict";

var searchButtonSubmit = document.querySelector('.search_button_submit'),
    nsfw = document.getElementById("nsfw"),
    religious = document.getElementById("religious"),
    political = document.getElementById("political"),
    racist = document.getElementById("racist"),
    sexist = document.getElementById("sexist"),
    explicit = document.getElementById("explicit"),
    jokesContainer = document.querySelector(".joke-list"),
    jokesNumber = document.querySelector(".joke_amount"),
    loader = document.querySelector(".loader");

// Click Event Listener to request the search a joke feature

searchButtonSubmit.addEventListener('click', () => {
    var selectedFlag = [], category, jokeData, filter_joke_keyword;
    document.querySelector('.search_button_submit').checked;
    nsfw.checked ? selectedFlag.push(nsfw.value):'';
    religious.checked ? selectedFlag.push(religious.value):'';
    political.checked ? selectedFlag.push(political.value):'';
    racist.checked ? selectedFlag.push(racist.value):'';
    sexist.checked ? selectedFlag.push(sexist.value):'';
    explicit.checked ? selectedFlag.push(explicit.value):'';
    selectedFlag = selectedFlag.join(",");
    category = document.querySelector('.joke_category').value;
    filter_joke_keyword  = document.querySelector('.filter_joke_keyword').value;
    jokesContainer.innerHTML = '';
    document.querySelector('.joke_number').innerHTML = '';
    jokesNumber.classList.add('hidden');
    loader.classList.remove('hidden');


    getJokesInfo(filter_joke_keyword, category, selectedFlag);

})

// getJokesInfo function to make the get api call with required parameters

var getJokesInfo = (keyword ,category, selectedFlag) => {
    var url = 'https://v2.jokeapi.dev/joke/'+ category +'?contains='+   encodeURIComponent(keyword) + '&blacklistFlags='+ encodeURIComponent(selectedFlag) +'&idRange=0-300&type=twopart&amount=5';
    fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "0fe6daf323msha04a638c8e1f137p1dba6ajsn648f46adf4e6",
		"x-rapidapi-host": "jokeapi-v2.p.rapidapi.com"
	}
})
    .then(res => res.json())
    .then(data => {
        jokesNumber.classList.remove('hidden');
        loader.classList.add('hidden');
        if(!data.error){
            document.querySelector('.joke_number').innerHTML = data.amount || 1;
            if (data.jokes && data.jokes.length > 0) {
                data.jokes.forEach(joke => {
                    jokesContainer.classList.remove("error");
                    renderResultsOnPage(joke);
                });
            }
        } else {
            document.querySelector('.joke_number').innerHTML = 0;
            jokesContainer.classList.add("error");
            jokesContainer.innerHTML = data.causedBy.join("\n");
        }
    })
}

// function to create the joke result DOM element and append it in the body after recieve the GET API call data

var renderResultsOnPage = (data) => {
    var result = document.createElement("div");
    result.classList.add("joke_block");
    console.log("data.type: ",data.type);

    var catTitle = document.createElement("p");
    catTitle.classList.add("joke_category_title");
    var catTitleText = document.createTextNode("Category: " +  data.category);
    catTitle.appendChild(catTitleText);

    var setup = document.createElement("p");
    setup.classList.add("setup_text");
    var setupText = document.createTextNode(data.setup);
    setup.appendChild(setupText);

    var delivery = document.createElement("p");
    delivery.classList.add("delivery_text");
    var deliveryText = document.createTextNode(data.delivery);
    delivery.appendChild(deliveryText);
    
    result.appendChild(setup);
    result.appendChild(delivery);
    result.appendChild(catTitle);

    jokesContainer.appendChild(result);
}