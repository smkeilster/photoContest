let xhr = new XMLHttpRequest();



//get function from the database
function getSelfies() {
    xhr.open('GET', "http://selfieproject.azurewebsites.net/api/selfie", true);
    xhr.send();
    xhr.addEventListener("readystatechange", processRequest, false);
}

// returns JSON object from the database
function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let entries = JSON.parse(xhr.responseText);
        console.log(entries);
        buildLeaderboard(entries);
        buildGallery(entries);
    }
}

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
        entry.className= "entry col-md-4";
        // builds div within existing "carousel" in the html
        document.getElementById("carousel").append(entry);
        // creates image
        image = document.createElement("img");
        // pulls in the image URL from the database
        image.src = entries[i].imageThumbnailUrl;
        // adds bootstrap css to img
        image.className = "img-thumbnail imgSize";
        // adds the image to the entry div
        entry.appendChild(image);
        // pulls in the photo id from the database
        let photoId = entries[i].imageId;
        // creates the element for the cityState
        let ID = document.createElement("h5");
        // creates the text within the element
        let textnode = document.createTextNode("Photo ID: " + photoId);
        // these three lines nest the variables within the new header in the imageDiv
        ID.appendChild(textnode);
        entry.appendChild(ID);
        // pulls in the photo id from the database
        let votes = entries[i].voteTotal;
        // creates the element for the cityState
        let voteTotal = document.createElement("h5");
        // creates the text within the element
        let textnode2 = document.createTextNode("Total Votes: " + votes);
        // these three lines nest the variables within the new header in the imageDiv
        voteTotal.appendChild(textnode2);
        entry.appendChild(voteTotal);
    }
  }    
  
  
  function buildGallery(entries) {
    // variables that will be used in multiple statements
    let builtGallery = [];
    const sortedDate = entries.sort((a,b) => new Date(b.dateTaken)-new Date(a.dateTaken));
    console.log(sortedDate);
    for (var i = 0; i <entries.length; i++) {
        // creates the span using the unique anchorLink column as the id.
        entryId = entries[i].ImageId;
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
        let photoId = entries[i].imageId;
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
  }      
  
  
  window.onscroll = function (){shrinkHeader()};
  
  let header = document.getElementById("header");
  let offset =header.offsetTop;
  
  function shrinkHeader(){
  console.log(header.className);
  if (window.pageYOffset > offset){
    header.classList.replace("header","smallHeader");
  }
  else{
    header.classList.replace("smallHeader", "header");
  }
  
  };
getSelfies()