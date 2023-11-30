const template = document.createElement("template");
template.innerHTML = `
<head>
    <link rel="stylesheet" href="components/movieCard/movieCard.css">
</head>

<div class="movie-container">
<div class="image-container">
    <img>
</div>
<div class="info">
    <h3 class="title"></h3>
    <p class="description"></p>
    <div class="action_container">
        <i class="isFavourite fa fa-heart"></i>
        <a target="_blank" class="button">IMDb</a>
    </div>
</div>
</div>
`

class movieCard extends HTMLElement{
    constructor(){
        super();

        this.isFavourite = false;
        this.attachShadow({mode : "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        setTimeout(() => {
            //attribute okumak
            this.shadowRoot.querySelector("h3.title").innerHTML = this.getAttribute("title"); //buraya atr olarak gelen adı oluşacak h3'ün title classlı olanlarına ekle 
            this.shadowRoot.querySelector("img").src = this.getAttribute("poster"); //gelen atrlerin poster olanını img olana ekle
            this.shadowRoot.querySelector("p.description").innerHTML = this.getAttribute("description");

            this.shadowRoot.querySelector(".button").setAttribute("href", `https://imdb.com/title/${this.getAttribute("imdbID")}`);

            if(this.getAttribute("isFavourite") == "true"){
                this.isFavourite = true;
                this.shadowRoot.querySelector(".isFavourite").classList.add("is_favourite");
            } //eğer bize gelen is_favourite true ise o elementin classListesine o sınıfı ekle ve artık beğeni tuşu aktif olsun

        }, 100); //app.js'den daha hızlı çalıştığı için bütün değerleri alamıyordu bu yüzden biraz yavaşlattık
    }

    favToggle(){
        this.isFavourite = !this.isFavourite;
        if(this.isFavourite){
            this.shadowRoot.querySelector(".isFavourite").classList.add("is_favourite");
        }else{
            this.shadowRoot.querySelector(".isFavourite").classList.remove("is_favourite");
        }
    }//fav olaylarını tam tersi yap

    connectedCallback(){
        this.shadowRoot.querySelector(".isFavourite").addEventListener("click", () => this.favToggle());
    } //favlı değilse favla

    disconnectedCallback(){
        this.shadowRoot.querySelector(".isFavourite").removeEventListener("click", () => this.favToggle());
    } //favlıysa favı kaldır
}

window.customElements.define("movie-card", movieCard);