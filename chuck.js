'use strict';

// -------- Part 1: random joke to CONSOLE --------
const randomBtn = document.getElementById('random-btn');

randomBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    console.log(data.value);
  } catch (error) {
    console.error('Error fetching random joke:', error);
  }
});

// -------- Part 2: search jokes and show on PAGE --------
const jokeForm = document.getElementById('joke-search-form');
const jokeInput = document.getElementById('joke-query');
const jokeResults = document.getElementById('joke-results');

jokeForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = jokeInput.value.trim();
  if (!query) return;

  const url = `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`;

  jokeResults.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();


    console.log(data);

    jokeResults.innerHTML = '';

    if (!data.result || data.result.length === 0) {
      jokeResults.textContent = 'No jokes found.';
      return;
    }

    data.result.forEach((joke) => {
      const article = document.createElement('article');
      const p = document.createElement('p');
      p.textContent = joke.value;
      article.appendChild(p);
      jokeResults.appendChild(article);
    });
  } catch (error) {
    console.error('Error searching jokes:', error);
    jokeResults.innerHTML = '<p>Something went wrong. Please try again.</p>';
  }
});
