let xhr = new XMLHttpRequest();
var feedback = [];
var mostVotes = [];
var mostRecent = [];
let projectOne;
let projectTwo;
let projectThree;
let projectFour;
let friday;
let saturday;
let sunday;
let sortedVotes;



//get function from the database
function getSelfies() {
    xhr.open('GET', "https://selfieproject.azurewebsites.net/api/selfie", true);
    xhr.send();
    xhr.addEventListener("readystatechange", processRequest, false);
}

// returns JSON object from the database
function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        feedback = JSON.parse(xhr.responseText);
        console.log(feedback);
        buildLeaderboard(feedback);
        buildGallery(feedback);
        buildArrays(feedback);
        buildOtherArray(feedback);
    }
}
// function to build various sort arrays
function buildOtherArray(entries){
    // sort by function
    mostVotes = entries.sort(function(a,b){return b.voteTotal-a.voteTotal});
    console.log(mostVotes);

    // points.sort(function(a, b){return b - a});
    // return Array.prototype.slice.call(arr).sort(); // For array-like objects
} 

function buildArrays(entries){
    // sort by function
    mostRecent = entries.slice().sort((a,b) => new Date(b.dateTaken)-new Date(a.dateTaken));
    console.log(mostRecent);   
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

// filter by project
function project(){
    var x = document.getElementById("project").value;
    console.log(x);
    if(x=="projectOne"){      
        document.getElementById("gallery").innerHTML="";
        document.getElementById("date").value = "org";
        document.getElementById("sort").value = "org";
        buildGallery(projectOne)
    }
    else if(x=="projectTwo"){
        document.getElementById("gallery").innerHTML="";
        document.getElementById("date").value = "org";
        document.getElementById("sort").value = "org";
        buildGallery(projectTwo)    
    }
    else if(x=="projectThree"){
        document.getElementById("gallery").innerHTML="";
        document.getElementById("date").value = "org";
        document.getElementById("sort").value = "org";
        buildGallery(projectThree) 
    }
    else if(x=="projectFour"){
        document.getElementById("gallery").innerHTML="";
        document.getElementById("date").value = "org";
        document.getElementById("sort").value = "org";
        buildGallery(projectFour) 
    }

}

// filter by date
function date(){
    var x = document.getElementById("date").value;
    console.log(x);
    if(x=="friday"){      
        document.getElementById("gallery").innerHTML="";
        document.getElementById("project").value = "org";
        document.getElementById("sort").value = "org";
        buildGallery(friday)
    }
    else if(x=="saturday"){
        document.getElementById("gallery").innerHTML="";
        document.getElementById("project").value = "org";
        document.getElementById("sort").value = "org";
        buildGallery(saturday)    
    }
    
    else if(x=="sunday"){
        document.getElementById("gallery").innerHTML="";
        document.getElementById("project").value = "org";
        document.getElementById("sort").value = "org";
        buildGallery(sunday) 
    }
    console.log(saturday);

}

// sort by functions
function sortBy(){
    var x = document.getElementById("sort").value;
    console.log(x);
    console.log(mostRecent);
   if(x==="dateTaken"){
        document.getElementById("gallery").innerHTML="";
        document.getElementById("project").value = "org";
        document.getElementById("date").value = "org";
        buildGallery(mostRecent)    
    }
    else if(x==="mostVotes"){
        document.getElementById("gallery").innerHTML="";
        document.getElementById("project").value = "org";
        document.getElementById("date").value = "org";
        buildGallery(mostVotes)
        console.log(mostVotes);
    }
}


// builds the leaderboard for top 5 votes
function buildLeaderboard(lEntries) {
    // variables that will be used in multiple statements
    sortedVotes = lEntries.sort(function(a,b){return b.voteTotal-a.voteTotal});
    // console.log(sortedVotes);
    // for loop runs through the entire json object returned by the database. 
    for (var i = 0; i <5; i++) {
        // creates the span using the unique anchorLink column as the id.
        entryId = lEntries[i].imageId;
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
        image.src = lEntries[i].imageThumbnailUrl;
        // adds bootstrap css to img
        image.className = "img-fluid  mx-auto d-block";
        // adds the image to the entry div
        imageWrap.appendChild(image);
        // pulls in the photo id from the database
        let photoId = lEntries[i].selfieId;
        // creates the element for the cityState
        let ID = document.createElement("h5");
        // creates the text within the element
        let textnode = document.createTextNode("Photo ID: " + photoId);
        // these three lines nest the variables within the new header in the imageDiv
        ID.appendChild(textnode);
        imageWrap.appendChild(ID);
        // pulls in the photo id from the database
        let votes = lEntries[i].voteTotal;
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
function buildGallery(gEntries) {
    // variables that will be used in multiple statements
    let builtGallery = [];
    const sortedDate = gEntries.sort((a,b) => new Date(b.dateTaken)-new Date(a.dateTaken));
    // console.log(sortedDate);
    for (var i = 0; i <gEntries.length; i++) {
        // creates the span using the unique anchorLink column as the id.
        entryId = gEntries[i].imageId;
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
        image.src = gEntries[i].imageThumbnailUrl;
        // adds bootstrap css to img
        image.className = "img-thumbnail imgSize";
        // adds the image to the entry div
        entry.appendChild(image);
        // creats a div to format the photo info
        info = document.createElement("div");
        // adds css
        info.className = "info";
        // adds info div to the entry
        entry.appendChild(info);
        // pulls in the photo id from the database
        let photoId = gEntries[i].selfieId;
        // creates the element for the photo ID
        let ID = document.createElement("h5");
        // creates the text within the element
        let textnode = document.createTextNode("Photo ID: "+photoId);
        // these three lines nest the variables within the new header in the imageDiv
        ID.appendChild(textnode);
        info.appendChild(ID);
        // pulls in the photo id from the database
        let votes = gEntries[i].voteTotal;
        // creates the element for the voteTotal
        let voteTotal = document.createElement("h5");
        // creates the text within the element
        let textnode2 = document.createTextNode("Total Votes: "+votes);
        // these three lines nest the variables within the new header in the imageDiv
        voteTotal.appendChild(textnode2);
        info.appendChild(voteTotal);
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
