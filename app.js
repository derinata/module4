'use strict';

const form = document.getElementById('searchForm');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (event) => {
  event.preventDefault();  // stop normal form submit

  const queryInput = document.getElementById('query');
  const query = queryInput.value.trim();
  if (!query) return;

  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    resultsDiv.innerHTML = '';

    if (data.length === 0) {
      resultsDiv.textContent = 'No results found.';
      return;
    }

    data.forEach(item => {
      const show = item.show;
      const article = document.createElement('article');


      const h2 = document.createElement('h2');
      h2.textContent = show.name;
      article.appendChild(h2);


      const link = document.createElement('a');
      link.href = show.url;
      link.target = '_blank';
      link.textContent = 'More details';
      article.appendChild(link);


      const img = document.createElement('img');
      const imageUrl = show.image?.medium
        ? show.image.medium
        : 'https://placehold.co/210x295?text=Not+Found';
      img.src = imageUrl;
      img.alt = show.name;
      article.appendChild(img);


      const summaryDiv = document.createElement('div');
      summaryDiv.innerHTML = show.summary || '<em>No summary available.</em>';
      article.appendChild(summaryDiv);

      resultsDiv.appendChild(article);
    });

  } catch (error) {
    console.error('Fetch error:', error);
    resultsDiv.innerHTML = '<p>Error fetching data.</p>';
  }
});
