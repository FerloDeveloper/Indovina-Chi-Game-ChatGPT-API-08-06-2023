"use strict";

const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";
const API_KEY = "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";
const input = document.querySelector(".input");
let inputValue = input.value;
const messageArea = document.querySelector(`.message-area`);
const btnSend = document.querySelector(`.btn-send`);

const categoryArr = [
	"un personaggio famoso storico o attuale scelto a caso",
	"un animale",
	"una pietanza o ingrediente scelta a caso",
	"un oggetto di uso comune scelto a caso",
];

let randomCharacter =
	categoryArr[Math.floor(Math.random() * categoryArr.length)];

console.log(`Personaggio estratto: ${randomCharacter}`);

// FUNZIONI
async function generateResponse(inputValue) {
	// 1. Mostrare il loader
	// 2. Chiamare le API di OpenAI
	const temperature = 0.3;
	// 3. Recuperare la risposta
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
		body: JSON.stringify({
			model: MODEL,
			messages: [
				{
					role: "system",
					content: `Simula di essere ${randomCharacter}, rispondi a domande su di te dando qualche indizio. Se il giocatore indovina la tua identita' comunicaglielo'. Se il giocatore scrive: "Mi arrendo", rivela la tua identita'.`
				},
				{
					role: "user",
					content: `${inputValue} (Rispondi a questo messaggio con un massimo di 100 caratteri.)`,
				},
			],
			temperature: temperature,
		}),
	});
	// 4. Interpretare la risposta in JSON
	const data = await response.json();
	// 5. Compilare la modale con i dati ricevuti
	const message = data.choices[0].message.content;
	messageArea.innerHTML = `<p>${message}</p>`;
	console.log(message);
}

btnSend.addEventListener("click", function () {
	inputValue = input.value;
	generateResponse(inputValue);
	input.value = "";
});

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    inputValue = input.value;
    generateResponse(inputValue);
		input.value = "";
  }
});