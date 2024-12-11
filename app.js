const apiKey = "662fa4975b43f4f68dbfa38d1de7bb28"
const URL =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=662fa4975b43f4f68dbfa38d1de7bb28&page=1'
const imgURL = 'https://image.tmdb.org/t/p/w1280'
const searchURL =
    'https://api.themoviedb.org/3/search/movie?&api_key=662fa4975b43f4f68dbfa38d1de7bb28&query='
const form = document.getElementById('search-form')
const queryInput = document.getElementById('Movie_Engine')
const root = document.getElementById('root')
let movies = [],
    page = 1,
    inSearchPage = false
    const changeTheme = document.getElementById('changeTheme');
    const sidebar = document.querySelector('.Sidebar');
    const nav = document.getElementById('Nav');
    const logo = document.querySelector('.logo')

    const searchButton = document.querySelector('.search-block .btn');
    
    changeTheme.addEventListener('click', () => {
        sidebar.classList.toggle('Sidebar-Dark-mode');
        sidebar.classList.toggle('Sidebar-light-mode'); 
        searchButton.classList.toggle('btn-Dark-mode');
        nav.classList.toggle('Nav-light-mode');
        logo.classList.toggle('logo-light');
    
});

async function fetchData(URL) {
    try {
        const data = await fetch(URL).then((res) => res.json())
        return data
    } catch (error) {
        console.log(error.message)
        return null
    }
}

const fetchAndShowResults = async (URL) => {
    const data = await fetchData(URL)
    data && showResults(data.results)
}

const getSpecificPage = (page) => {
    const URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`
    fetchAndShowResults(URL)
}

const movieCard = (movie) =>
    `<div >
        <div class="card ">
        <a class="card-media" href="${movie.poster_path}">
          <img src="${movie.poster_path}" alt="${movie.original_title}" width="100%" />
        </a>

        <div class="card-content">
          <div class="card-cont-header">
            <div class="cont-left">
              <h4 style="font-weight: 600">${movie.original_title}</h4>
              <span style="color: #12efec">${formatDate(movie.release_date)}</span>
            </div>
            <div class="cont-right">
            </div>
          </div>

          <div class="describe">
            ${movie.overview}
          </div>
        </div>
      </div>
    </div>`

const formatDate = (dateString) => {
    if (!dateString) return 'No release date'

    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
}


const showResults = (items) => {
    let content = !inSearchPage ? root.innerHTML : ""
    if (items && items.length > 0) {
        items.map((item) => {
            let { poster_path, original_title, release_date, overview } = item

            if (poster_path) {
                poster_path = imgURL + poster_path
            } else {
                poster_path = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"
            }

            if (original_title.length > 18) {
                original_title = original_title.slice(0, 18) + "..."
            }

            if (!overview) {
                overview = "No overview yet..."
            }

            if (!release_date) {
                release_date = "No release date"
            }

            const movieItem = {
                poster_path,
                original_title,
                release_date,
                overview,
            }

            content += movieCard(movieItem)
        })
    } else {
        content += "<p>Something went wrong!</p>"
    }

    root.innerHTML = content 
}

const handleLoadMore = () => {
    getSpecificPage(++page)
}

const keepScrolling = (e) => {
    let el = document.documentElement
    if (
        !inSearchPage &&
        el.scrollTop + el.clientHeight == el.scrollHeight
    ) {
        console.log("BINGO!")
        handleLoadMore()
    }
}

form.addEventListener('submit', async (e) => {
    inSearchPage = true;
    e.preventDefault();
    const searchTerm = queryInput.value.trim();
    if(searchTerm){
        root.innerHTML="";
        const searchResultsURL = `${searchURL}${encodeURIComponent(searchTerm)}`;
    await fetchAndShowResults(searchResultsURL);
    query.value = "";
    }

})

window.addEventListener('scroll', keepScrolling)

function init() {
    inSearchPage = false
    fetchAndShowResults(URL)
}


init();