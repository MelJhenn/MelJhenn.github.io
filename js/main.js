$.fn.equalize = function() {
	var maxHeight = 0;	
    this.each (function (){
        if ($(this).height() > maxHeight) { 
        maxHeight = $(this).height(); 
        }
    });
    return this.each(function(){
        var $this = $(this);    
        $this.height(maxHeight);
        });
};
$(document).ready(function(){
    $.getJSON("http://localhost:8080/", function(books){
        let section = document.getElementById("section");
        books.forEach (each => {
            let card = document.createElement ("div");
            let title =document.createElement ("div");
            let author = document.createElement ("div");
            let description = document.createElement ("div");
            title.innerHTML = each.title;
            author.innerHTML = each.author;
            description.innerHTML = each.description;
            section.appendChild (card);
            card.appendChild (title);
            card.appendChild (author);
            card.appendChild (description);
            card.className = "card";
            title.className ="title";
            author.className = "author";
            description.className = "description"; 
        });
        $(".card").equalize();
    });
  });
