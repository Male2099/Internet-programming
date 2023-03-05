let toggleButton = document.getElementById("toggle-button");
let afterToggle = document.getElementById("button-after-toggle");
let nav = document.querySelector("nav");

let Menu = document.getElementById("menu");
let wrapper = document.querySelector(".wrapper");
let logo = document.querySelector(".logo");

let trigger = false;//true fs the menus is trigger or that black button appear


const observer = new ResizeObserver((entries) => {

    const wrapper = entries[0];

    if (wrapper.contentRect.width < 550) {
        if (trigger) {
            toggleButton.style.display = "none"
            return;
        }

        Menu.style.display = "none";
        logo.style.display = "none";
        toggleButton.style.display = "flex"
        document.querySelector(".bar_button-wrapper").style.width = "100%"

    } else {
        Menu.style.display = "block";
        Menu.children[0].classList.remove("toggle-menu");
        Menu.children[0].style.marginTop = "0";
        Menu.children[0].style.padding = "0";


        logo.style.display = "block"
        toggleButton.style.display = "none"
        afterToggle.style.display = "none"
        nav.style.display = "flex"
        nav.style.height = "4rem";

        document.querySelector(".bar_button-wrapper").style.width = "fit-content"
        trigger = false;
    }
    // afterToggle.style.display="none";

})

observer.observe(wrapper);

toggleButton.addEventListener("click", function () {
    Menu.style.display = "block";
    Menu.children[0].classList.add("toggle-menu");
    Menu.children[0].style.marginTop = "1rem";
    Menu.children[0].style.padding = "0 0 1rem 0";

    nav.style.display = "block";
    nav.style.height = "17rem";

    toggleButton.style.display = "none"

    afterToggle.style.display = "flex";

    trigger = true;
})

afterToggle.addEventListener("click", function () {
    Menu.style.display = "none";
    Menu.children[0].classList.remove("toggle-menu");

    document.querySelector("nav").style.display = "block";

    nav.style.height = "4rem";

    toggleButton.style.display = "flex";
    afterToggle.style.display = "none";

    trigger = false;
})