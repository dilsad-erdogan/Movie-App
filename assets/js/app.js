const search_text = document.querySelector(".search_text");

search_text.addEventListener("keydown", event =>{
    if(event.keyCode == 13){
        searchMovie();
    }
});

async function searchMovie(){
    const request = await fetch(`http://www.omdbapi.com/?apikey=5a96bbee&s=${search_text.value}`); //sitede arattığımız filmi başka bir site yardımı ile aratıyoruz 
    const data = await request.json();
    
    let movies = data.Search.map(m => {
        return{
            title: m.Title,
            description: `${m.Year}/${m.Type}`,
            imdbID: m.imdbID,
            poster: m.Poster === 'N/A' ? 'assets/images/default.png' : m.Poster,
            isFavourite: false
        }
    }); //araştırma sonucunu bu şekilde düzenliyoruz prepareMovies fonksiyonunda adlandırdığımız şekillerde

    prepareMovies(movies);

} //aratılan filmi bulmak için bu linkten araştırma yapıyor
//asenkron bir fonksiyon yaptık çünkü bu satır asenkron çalışıyor ve bu satırı bizim beklememiz gerekiyor bu yüzden await ekledik

//filmleri hazırlamak için
function prepareMovies(movies){
    document.querySelector("#movies").innerHTML = "";
    movies.forEach(movie => {
        let movie_card = document.createElement("movie-card"); //movie-card tagini otomatik üret
        movie_card.setAttribute("title", movie.title); //oluşturulan movie-card'a movie değişkeninin adını ekle 
        movie_card.setAttribute("poster", movie.poster); //poster'i ekle
        movie_card.setAttribute("description", movie.description); //yazısını ekle
        movie_card.setAttribute("isFavourite", movie.isFavourite); //beğeni butonu
        movie_card.setAttribute("imdbID", movie.imdbID); //beğeni butonu

        document.querySelector("#movies").append(movie_card); //movies id'li div'e üretilen movie_card'ı ekle
    });
}