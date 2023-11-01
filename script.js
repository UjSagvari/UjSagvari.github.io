get = id => document.getElementById(id);
//get newspaper papers
function getPapers(src, number, target, filetype) {
    var load = "";
    for (let i = 1; i <= number; i += 1) {
        load += `<img src="${src}${i}.${filetype}" alt="oldal ${i}" class="oldal"><br>`;
    }
    get(target).innerHTML += load;
}
function getPapers2Page(src, number, target, filetype) {
    if (current_src == src) {
        return
    }
    var load = "";
    load += `<img src="${src}1.${filetype}" alt="oldal 1" class="oldal" style="margin-top: 60px;"><br>`;
    for (let i = 2; i < number; i += 1) {
        is_odd = (i + 1) % 2 != 0
        if (is_odd) {
            load += "<div class='teljesOldal'>"
        }
        load += `<img src="${src}${i}.${filetype}" alt="oldal ${i}" class="felOldal">`;
        if (!is_odd) {
            load += "</div>"
        }        
    }
    load += `</div><img src="${src}${number}.${filetype}" alt="impresszum" class="oldal">`;

    get(target).innerHTML = load;
}

paperView = get("paperView")
kiadasok = get("kiadasok")
informacio = get("informacio")
current_src = ""

function getKiadas(srcElem) {
    console.log(srcElem);
    var src = srcElem.attributes.src.value;
    var num = srcElem.attributes.num.value;
    console.log(src)
    getPapers2Page(src, num, "paperView", "png");
    current_src = src
    kiadasok.style.display = "none"
    paperView.style.display = "block"
}

var mediaquery = window.matchMedia("(orientation: landscape)")
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
if (mediaquery.matches) {
    paperView.style.width = `${1.0*vw*0.5*(1024/722)}px`;
}
//end generation

//Buttons
//mainpage button "újságvári"
function mainPage() {
    document.body.style.animation = "hide 0s forwards"
    document.body.style.animation = "show_down 1.5s forwards"
    kiadasok.style.display = "unset"
    paperView.style.display = "none"
    informacio.style.display = "none"
    window.scrollTo(0, 0)
}
//other buttons?
// information button
function information() {
    document.body.style.animation = "hide 0s forwards"
    document.body.style.animation = "show_down 1.5s forwards"
    kiadasok.style.display = "none"
    informacio.style.display = "unset"
}

var menu_button = get("misc");
var toggle = 1;
menu_button.addEventListener("click", event => {
    console.log(event);
    if (toggle) {
        zoom.style.opacity = "0";
    } else {
        zoom.style.opacity = "0.7";
    }
    toggle += 1;
    toggle %= 2;
})

//Navbar hide and show

menu = get("menu")
var offset = this.scrollY;
window.onscroll = event => {  
    // called when the window is scrolled.  
    var new_offset = this.scrollY
    
    console.log(offset, new_offset)
    if (new_offset < 100) {
        menu.style.animation = "show 1s forwards"
        return
    }
    if (offset < new_offset) {
        menu.style.animation = "hide 1s forwards"
    } else {
        if (Math.abs(offset - new_offset) > 150) {
            menu.style.animation = "show 1s forwards"
        }
    }
    offset = new_offset
} 
// end Navbar hide and show

// dark-mode light-mode switch
const lightswitch = document.getElementById("toggle")

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark")
        localStorage.setItem('theme', 'dark'); // save theme to local storage
    } else {
        document.documentElement.setAttribute("data-theme", "light")
        localStorage.setItem('theme', 'light'); // save theme to local storage
    }
}

lightswitch.addEventListener("change", switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
// end darkmode switch

