const searchButton =document.getElementById("search-button");
const search = document.getElementById("search");
const dataList = document.getElementById("data-list");
const dataStatus = document.getElementById("status");
const starts = document.getElementById("starts");
const ends = document.getElementById("ends");
const dataLength = document.getElementById("length");

searchButton.disabled=true;

function enableButton(){
    if(search.value!=""){
        searchButton.disabled=false;
        searchButton.style.backgroundColor= "#F77F28" ;

    }
    else{
        searchButton.disabled=true;
        searchButton.style.backgroundColor= "lightgray" ;

    }
}

function searchData(){
    var url = "https://api.datamuse.com/words?ml=";

    if(search.value!=""){
        url=url+search.value;
    }

    if(starts.value!="" && ends.value==""){
        url=url+"&sp="+starts.value+"*";
        
    }

    if(starts.value=="" && ends.value!=""){
        url=url+"&sp="+"*"+ends.value;
        
    }

    if(starts.value!="" && ends.value!=""){
        url="https://api.datamuse.com/words?sp="+starts.value+"??"+ends.value;
        
    }



    fetch(url)
       .then(response=>response.json())
       .then(data=>displayData(data));
}

function displayData(data){
    removeElements();

    const words = data;
    if(words.length>0){
        for(i=0; i<words.length; i++){
            if(dataLength.value==""){
                const listItem = document.createElement("li");
                const listItemClass = document.createAttribute("class");
                listItemClass.value="list-item";
                listItem.setAttributeNode(listItemClass);
                listItem.innerHTML=words[i].word;
                dataList.appendChild(listItem);      
            }
            else{
                if(words[i].word.length==dataLength.value){
                    const listItem = document.createElement("li");
                    const listItemClass = document.createAttribute("class");
                    listItemClass.value="list-item";
                    listItem.setAttributeNode(listItemClass);
                    listItem.innerHTML=words[i].word;
                    dataList.appendChild(listItem);  
                }
            }
        }
    }

    else{

        dataStatus.innerHTML="Sorry no data was found";

    }
}


function removeElements(){

    while (dataList.hasChildNodes()) {
        dataList.removeChild(dataList.firstChild);
      }

}


