document.getElementById("timezone").value = new Date().getTimezoneOffset();

let checkboxes = [document.getElementById("check1"),
    document.getElementById("check2"),
    document.getElementById("check3"),
    document.getElementById("check4"),
    document.getElementById("check5")];

let axisImage = document.getElementById("coordinates");

let lastCheck = -1;
for(let i = 0; i < 5; i++) {
    if (checkboxes[i].checked === true) {
        lastCheck = i + 1;
    }
}
if(lastCheck === -1)
    lastCheck = 0;

for(let i = 0; i < 5; i++) {
    checkboxes[i].onclick = function () {
        if (!checkboxes[i].checked === false) {
            checkboxes[i].checked = true;
            lastCheck = i + 1;
            axisImage.src = "img/coordinates-" + (i + 1) + ".png";
            for (let j = 0; j < 5; j++)
                if (j !== i) checkboxes[j].checked = false;
        } else {
            checkboxes[i].checked = false;
            lastCheck = 0;
            axisImage.src = "img/coordinates-0.png";
        }
    };
}

//------------------ Checkboxes (up) ------------------------------------
//------------------ X - Axis (down) ------------------------------------

let positionsX = [ "111px", "158px", "204px", "250px",
    "297px", "342px", "389px", "435px", "482px"];

let hit = document.getElementById("hit");

let radios = [document.getElementById("x-3"),
    document.getElementById("x-2"),
    document.getElementById("x-1"),
    document.getElementById("x0"),
    document.getElementById("x1"),
    document.getElementById("x2"),
    document.getElementById("x3"),
    document.getElementById("x4"),
    document.getElementById("x5")];

for(let i = 0; i < 9; i++) {
    radios[i].onclick = function () {
        if (!radios[i].checked === false) {
            hit.style.paddingLeft = positionsX[i];
        }
    };
}

//------------------ X - Axis (up) --------------------------------------
//------------------ Y - Axis (down) ------------------------------------

let positionsY = [ "490px", "444px", "398px", "352px", "306px",
    "259px", "213px", "167px", "121px", "74px", "28px"];

let variantsY = ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3", "4", "5"];

let textY = document.getElementById("y-text");

function myHandleEvent(event = null) {
    if (variantsY.includes(textY.value)) {
        hit.style.display = "block";
        hit.style.paddingTop = positionsY[Number.parseInt(textY.value) + 5];
    } else {
        let y = Number.parseFloat(textY.value.replace(/[,]/, "."));
        hit.style.paddingTop = Number.parseInt(28 + (490 - 28) * (5 - y) / 10) + "px";
        hit.style.display = "block";
        if(textY.value.match(/^((-?[0-4]([,.][0-9]+)?)|(5(.0+)?)|(-5(.0+)?))$/) === null){
            hit.style.display = "none";
        }
    }
}

textY.addEventListener("change", {
    handleEvent(event){
        myHandleEvent(event);
    }
});

textY.addEventListener("keyup", {
    handleEvent(event){
        myHandleEvent(event);
    }
});


//------------------ Y - Axis (up) -----------------------------------------
//------------------ possible hit(down) ------------------------------------

let possibleHit = document.getElementById("possible-hit");

let radioLabels = [document.getElementById("label-x-3"),
    document.getElementById("label-x-2"),
    document.getElementById("label-x-1"),
    document.getElementById("label-x0"),
    document.getElementById("label-x1"),
    document.getElementById("label-x2"),
    document.getElementById("label-x3"),
    document.getElementById("label-x4"),
    document.getElementById("label-x5")];

for(let i = 0; i < 9; i++) {
    radioLabels[i].onmouseenter = function () {
        if(textY.value.match(/^((-?[0-4]([,.][0-9]+)?)|(5(.0+)?)|(-5(.0+)?))$/) !== null)
            possibleHit.style.display = "block";
        possibleHit.style.paddingLeft = positionsX[i];
        possibleHit.style.paddingTop = hit.style.paddingTop;
    };

    radioLabels[i].onmouseleave = function () {
        possibleHit.style.display = "none";
    };
}

//------------------ possible hit(up) ------------------------------------
//------------------ change R (down) -------------------------------------

let checkboxLabels = [document.getElementById("label-checkbox-1"),
    document.getElementById("label-checkbox-2"),
    document.getElementById("label-checkbox-3"),
    document.getElementById("label-checkbox-4"),
    document.getElementById("label-checkbox-5")];

for(let i = 0; i < 5; i++) {
    checkboxLabels[i].onmouseenter = function () {
        if (checkboxes[i].checked === false) {
            axisImage.src = "img/coordinates-" + (i + 1) + ".png";
        }
    };

    checkboxLabels[i].onmouseleave = function () {
        axisImage.src = "img/coordinates-" + lastCheck + ".png";
    };
}

//------------------- change R (up) --------------------------------------
//------------------- reload (down) --------------------------------------

window.onload = function(){
    for(let i = 0; i < 9; i++) {
        if(radios[i].checked === true){
            radios[i].click();
        }
    }
    myHandleEvent();
};

document.getElementById("form").addEventListener("keydown", {
    handleEvent(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    }
});

//------------------- reload (up) ----------------------------------------
//------------------- cookie (down) --------------------------------------

//document.cookie = "";
