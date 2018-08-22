let xhr = new XMLHttpRequest();
let mostVotes;
let mostRecent;
let projectOne;
let projectTwo;
let projectThree;
let projectFour;
let friday;
let saturday;
let sunday;

//get function from the database
function getSelfies() {
    xhr.open('GET', "https://selfieproject.azurewebsites.net/api/selfie", true);
    xhr.send();
    xhr.addEventListener("readystatechange", processRequest, false);
}

// returns JSON object from the database
function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let entries = JSON.parse(xhr.responseText);
        // console.log(entries);
        buildLeaderboard(entries);
        buildGallery(entries);
        buildArrays(entries);
    }
}
// function to build various sort arrays
function buildArrays(entries){
    // sort by function
    mostVotes = entries.sort((a,b) => b.voteTotal-a.voteTotal);
    console.log(mostVotes);
    mostRecent = entries.sort((a,b) => new Date(b.dateTaken)-new Date(a.dateTaken));
    // project filters
    projectOne = entries.filter(entries => {
        return entries.selfieId[0]==="A";
    });
    projectTwo = entries.filter(entries => {
        return entries.selfieId[0]==="M";
    });
    projectThree = entries.filter(entries => {
        return entries.selfieId[0]==="C";
    });
    projectFour = entries.filter(entries => {
        return entries.selfieId[0]==="D";
    });
    // date filters
    friday = entries.filter(entries => {
        return entries.dateTaken[9]==="4";
    });
    saturday = entries.filter(entries => {
        return entries.dateTaken[9]==="5";
    });
    sunday = entries.filter(entries => {
        return entries.dateTaken[9]==="8";
    });

}
   
function project(){
    var x = document.getElementById("project").value;
    console.log(x);
    if(x=="projectOne"){      
        document.getElementById("gallery").innerHTML="";
        buildGallery(projectOne)
    }
    else if(x=="projectTwo"){
        document.getElementById("gallery").innerHTML="";
        buildGallery(projectTwo)    
    }
    else if(x=="projectThree"){
        document.getElementById("gallery").innerHTML="";
        buildGallery(projectThree) 
    }
    else if(x=="projectFour"){
        document.getElementById("gallery").innerHTML="";
        buildGallery(projectFour) 
    }

}

// filter by date
function date(){
    var x = document.getElementById("date").value;
    console.log(x);
    if(x=="friday"){      
        document.getElementById("gallery").innerHTML="";
        buildGallery(friday)
    }
    else if(x=="saturday"){
        document.getElementById("gallery").innerHTML="";
        buildGallery(saturday)    
    }
    else if(x=="sunday"){
        document.getElementById("gallery").innerHTML="";
        buildGallery(sunday) 
    }
    

}

// sort by functions
function sortBy(){
    var x = document.getElementById("sort").value;
   if(x==="dateTaken"){
        document.getElementById("gallery").innerHTML="";
        buildGallery(mostRecent)    
    }
    else if(x==="mostVotes"){
        document.getElementById("gallery").innerHTML="";
        buildGallery(mostVotes)
    }
}


// builds the leaderboard for top 5 votes
function buildLeaderboard(entries) {
    // variables that will be used in multiple statements
    let builtLeaderboard = [];
    const sortedVotes = entries.sort((a,b) => b.voteTotal-a.voteTotal);
    console.log(sortedVotes);
    // for loop runs through the entire json object returned by the database. #update loop length
    for (var i = 0; i <5; i++) {
        // creates the span using the unique anchorLink column as the id.
        entryId = entries[i].imageId;
        // creates entry
        entry = document.createElement("div");
        // assigns id for the entry
        entry.id = entryId;
        //assigns bootstrap css
        if (i ==0) {
            entry.className = "entry carousel-item col-md-4 active";
        }
        else {
            entry.className = "entry carousel-item col-md-4";
        }
        // builds div within existing "carousel" in the html
        document.getElementById("carousel").append(entry);
        // creates div to wrap the image and photo infor
        imageWrap=document.createElement("div");
        // adds bootstrap
        // imageWrap.className = "d-block col-4";
        entry.appendChild(imageWrap);
        // creates image
        image = document.createElement("img");
        // pulls in the image URL from the database
        image.src = entries[i].imageThumbnailUrl;
        // adds bootstrap css to img
        image.className = "img-fluid  mx-auto d-block";
        // adds the image to the entry div
        imageWrap.appendChild(image);
        // pulls in the photo id from the database
        let photoId = entries[i].selfieId;
        // creates the element for the cityState
        let ID = document.createElement("h5");
        // creates the text within the element
        let textnode = document.createTextNode("Photo ID: " + photoId);
        // these three lines nest the variables within the new header in the imageDiv
        ID.appendChild(textnode);
        imageWrap.appendChild(ID);
        // pulls in the photo id from the database
        let votes = entries[i].voteTotal;
        // creates the element for the cityState
        let voteTotal = document.createElement("h5");
        // creates the text within the element
        let textnode2 = document.createTextNode("Total Votes: " + votes);
        // these three lines nest the variables within the new header in the imageDiv
        voteTotal.appendChild(textnode2);
        imageWrap.appendChild(voteTotal);
    }
  };    
  
// builds the gallery for the remaining images based on most recent  
function buildGallery(entries) {
    // variables that will be used in multiple statements
    let builtGallery = [];
    const sortedDate = entries.sort((a,b) => new Date(b.dateTaken)-new Date(a.dateTaken));
    console.log(sortedDate);
    for (var i = 0; i <entries.length; i++) {
        // creates the span using the unique anchorLink column as the id.
        entryId = entries[i].imageId;
        // creates entry
        entry = document.createElement("div");
        // assigns id for the entry
        entry.id = entryId;
        //assigns bootstrap css
        entry.className= "entry col-md-4";
        // builds div within existing "gallery" in the html
        document.getElementById("gallery").append(entry);
        // creates image
        image = document.createElement("img");
        // pulls in the image URL from the database
        image.src = entries[i].imageThumbnailUrl;
        // adds bootstrap css to img
        image.className = "img-thumbnail imgSize";
        // adds the image to the entry div
        entry.appendChild(image);
        // pulls in the photo id from the database
        let photoId = entries[i].selfieId;
        // creates the element for the cityState
        let ID = document.createElement("h5");
        // creates the text within the element
        let textnode = document.createTextNode("Photo ID: "+photoId);
        // these three lines nest the variables within the new header in the imageDiv
        ID.appendChild(textnode);
        entry.appendChild(ID);
        // pulls in the photo id from the database
        let votes = entries[i].voteTotal;
        // creates the element for the cityState
        let voteTotal = document.createElement("h5");
        // creates the text within the element
        let textnode2 = document.createTextNode("Total Votes: "+votes);
        // these three lines nest the variables within the new header in the imageDiv
        voteTotal.appendChild(textnode2);
        entry.appendChild(voteTotal);
    } 
};    
  
//  shrinks header on scroll so phone numberis always visible 
window.onscroll = function (){shrinkHeader()};

let header = document.getElementById("header");
let other = document.getElementById("other");
let offset =header.offsetTop;

function shrinkHeader(){
    console.log(header.className);
    if (window.pageYOffset > offset){
        header.classList.replace("header","smallHeader");
        other.classList.add("hidden");
    }
    else{
        header.classList.replace("smallHeader", "header");
        other.classList.remove("hidden");
    }
};

// carousel javascript
$('#carouselExample').on('slide.bs.carousel', function (e) {
    /*

    CC 2.0 License Iatek LLC 2018
    Attribution required
    
    */
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-item').length;
    
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});
    
getSelfies()