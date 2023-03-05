let toggleButton=document.getElementById("toggle-button");
let moveButton=document.getElementById("move-button");
let cancel=document.getElementById("cancel");
let navBar=document.getElementById("move-bar");
toggleButton.addEventListener("click", function(){
    let wrapperWidth=document.querySelector(".wrapper").clientWidth;
    moveButton.style.marginLeft=wrapperWidth-410+"px";
    toggleButton.children[0].style.backgroundColor="#83a9e2"
    toggleButton.children[1].style.backgroundColor="#83a9e2"
    toggleButton.children[2].style.backgroundColor="#83a9e2"
    navBar.style.marginLeft="0";
})

cancel.addEventListener("click", function(){
    moveButton.style.marginLeft="2rem";    
    toggleButton.children[0].style.backgroundColor="#005ce6"
    toggleButton.children[1].style.backgroundColor="#005ce6"
    toggleButton.children[2].style.backgroundColor="#005ce6"
    navBar.style.marginLeft="-20rem";
})


