const apiKey = "01cb760d1e80437fa8c7c02bb3838f3c"; 
const fetchNews = async (category) => {
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok && data.articles.length > 0) {
          displayNews(data.articles);
      } else {
          console.error("No articles found or an error occurred.");
      }
  } catch (error) {
      console.error("Error fetching news:", error);
  }
};

const displayNews = (articles) => {
    const content = document.querySelector('.content');
    content.innerHTML = ''; 
  
    console.log(articles);  
    articles.forEach(article => {
        if (!article.urlToImage || !article.title || !article.description) {
            return;
        }
  
        const articleHTML = `
            <div class="article">
                <div class="img">
                    <img src="${article.urlToImage}" alt="News Image">
                </div>
                <div class="text1">
                    <h2>${article.title}</h2>
                </div>
                <div class="text2">
                    <p>${article.description}</p>
                </div>
                <div class="button">
                    <a href="${article.url}" target="_blank">Read More</a>
                </div>
            </div>
        `;
        content.innerHTML += articleHTML;
    });
};


// Adding event listeners to buttons
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', function() {
      const category = this.innerText.toLowerCase(); 
      fetchNews(category); 
  });
});
