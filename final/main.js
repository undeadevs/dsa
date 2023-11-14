import { RBT } from "./rbt.js";

const kamusRBTIDtoEN = new RBT();
kamusRBTIDtoEN.add("putar", "roll", "Roll around the floor");
kamusRBTIDtoEN.add("bakar", "burn", "My eyes are burning");
kamusRBTIDtoEN.add("ledakan", "explosion", "Behind the scenes, movies emulate explosions");
kamusRBTIDtoEN.add("jatuh", "fall", "He fell gracefully");
kamusRBTIDtoEN.add("lebar", "wide", "Your knowledge on this subject is wide");
kamusRBTIDtoEN.add("terbang", "fly", "The plane was flying through clouds");
kamusRBTIDtoEN.add("hujan", "rain", "It's gonna rain soon!");
kamusRBTIDtoEN.add("air", "water", "Can you pour that water for me?");
kamusRBTIDtoEN.add("memasak", "cook", "Her mother loves to cook chinese food");
kamusRBTIDtoEN.add("makan", "eat", "I have an eating disorder");

const kamusRBTENtoID = new RBT();
kamusRBTENtoID.add("roll", "putar", "Bumi berputar pada porosnya");
kamusRBTENtoID.add("burn", "bakar", "Pembakaran sampah mengakibatkan polusi udara");
kamusRBTENtoID.add("explosion", "ledakan", "Ledakan itu memiliki jangkauan yang luas");
kamusRBTENtoID.add("fall", "jatuh", "Pria itu jatuh dari lantai 3");
kamusRBTENtoID.add("wide", "lebar", "Ruangan ini sangat lebar");
kamusRBTENtoID.add("fly", "terbang", "Penerbangan tidak sesuai rencana");
kamusRBTENtoID.add("rain", "hujan", "Hujan deras di daerah Kilo 15");
kamusRBTENtoID.add("water", "air", "Air mata itu berharga");
kamusRBTENtoID.add("cook", "memasak", "Siapa yang membiarkan dia memasak?");
kamusRBTENtoID.add("eat", "makan", "Makanlah sebelum kenyang dan kenyanglah sebelum makan");

const overlayEl = document.querySelector(".overlay");
const langSelectEl = document.getElementById("lang");
const searchInputEl = document.getElementById("search");
const searchBtnEl = document.getElementById("search-btn");
const resWordEl = document.getElementById("res-word");
const resExamplesEl = document.getElementById("res-examples");
const gImgEl = document.getElementById("g-img");

searchBtnEl.addEventListener("click", () => {
    const langValue = langSelectEl.value;
    const searchText = (searchInputEl.value || "").toLowerCase();
    const foundNode = langValue === "id_en" ? kamusRBTIDtoEN.find(searchText) : kamusRBTENtoID.find(searchText);

    resWordEl.innerHTML = "";
    resExamplesEl.innerHTML = "";
    overlayEl.style.backgroundImage = null;
    document.body.style.animation = "none";
    gImgEl.src = "";
    gImgEl.hidden = true;
    
    if (!foundNode) {
        if (langValue === "id_en") {
            resWordEl.textContent = "Tidak ditemukan.";
            return;
        }
        resWordEl.textContent = "Not found.";
        return;
    }
    resWordEl.textContent = foundNode.getValue();
    for(const example of foundNode.getExamples().split("\n")){
        const resExampleLi = document.createElement("li");
        resExampleLi.textContent = example;
        resExamplesEl.appendChild(resExampleLi);
    }

    const foundGimmick = foundNode.gimmick();
    if (foundGimmick.startsWith("fullscreen-gif|")) {
        overlayEl.style.backgroundImage = `url("./assets/${foundGimmick.substring(foundGimmick.indexOf("|") + 1)}")`
    } else if (foundGimmick.startsWith("animate|")) {
        setTimeout(() => {
            document.body.style.animation = foundGimmick.substring(foundGimmick.indexOf("|") + 1);
        }, 1);
    } else if (foundGimmick.startsWith("picture|")) {
        gImgEl.src = "./assets/" + foundGimmick.substring(foundGimmick.indexOf("|") + 1);
        gImgEl.hidden = false;
    } else if (foundGimmick.startsWith("redirect|")) {
        window.open(foundGimmick.substring(foundGimmick.indexOf("|") + 1), "_blank");
    }
});
