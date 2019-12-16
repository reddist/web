setLoadingGif = function () {
    //refresh.style.display = "none";
    //deleteImg.style.display = "none";
    //lastRadius = currentRadius;
    //resultTableSpan.innerHTML = '<img src="resources/loading.gif" style="width: 160px; margin: 20px calc(50% - 80px); border-radius: 10px;" alt="Loading...">';
};

//------------------ On changing radius (down) --------------------- (correct)
let radius = document.getElementsByName("form:radius");
let hiddenRadius = document.getElementById("hiddenForm:rCanvas");
function updateCurrentRadius(){
    for(let i = 0; i < radius.length; i++) {
        if(radius[i].checked === true){
            currentRadius = Number(radius[i].value);
            radius[i].click();
        }
    }
    if(lastRadius !== currentRadius && lastRadius !== 0){
        for(let i = 0; i < radius.length; i++) {
            if(Number(radius[i].value) === lastRadius){
                currentRadius = lastRadius;
                radius[i].click();
            }
        }
    }
    if(lastRadius === 0){
        lastRadius = currentRadius;
    }
}

window.addEventListener("load", {
    handleEvent(event) {
        updateCurrentRadius();
        drawWithRadius(currentRadius);
    }
});

// ------------------------------ Refresh and Delete (down) ----------------------------------- (correct)
let refresh = document.getElementById("refresh");
let deleteImg = document.getElementById("delete");
let updateTableButton = document.getElementById("updateForm:update-table");
let resetTableButton = document.getElementById("resetForm:reset-table");

refresh.onclick = function () {
    updateTableButton.click();
    console.log("updated");
};

deleteImg.onclick = function () {
    resetTableButton.click();
    console.log("deleted");
};

/*resetTableButton.addEventListener("click", {
   handleEvent(evt) {
       setLoadingGif();
   }
});

updateTableButton.addEventListener("click",{
    handleEvent(event) {
        setLoadingGif();
    }
});*/

//------------------- Posting on button -----------------------------
let submit = document.getElementById("form:shoot");
let resultTableSpan = document.getElementById("result-table-span");

/*document.getElementById("form").addEventListener("keydown", {
    handleEvent(event) {
        if (event.key === "Enter") {
            submit.click();
        }
    }
});*/

/*submit.addEventListener("click",{
    handleEvent(event) {
        setLoadingGif();
    }
});*/

//------------------------------ Shoot on click (down) -----------------------------

let canvasCoordinates = canvas.getBoundingClientRect();
let xOnHover = document.getElementById("x-onHover-canvas");
let yOnHover = document.getElementById("y-onHover-canvas");
let xCanvas = document.getElementById("hiddenForm:xCanvas");
let yCanvas = document.getElementById("hiddenForm:yCanvas");
canvas.onmousemove = function(event){
    canvasCoordinates = canvas.getBoundingClientRect();
    let hitX = event.clientX - canvasCoordinates.left;
    let hitY = event.clientY - canvasCoordinates.top;
    let doubleX = (hitX - 150) / 20.0;
    let doubleY = (150 - hitY) / 20.0;
    xOnHover.innerHTML = String(doubleX.toPrecision(3));
    yOnHover.innerHTML = String(doubleY.toPrecision(3));
};

canvas.onmouseleave = function(){
    xOnHover.innerHTML = "";
    yOnHover.innerHTML = "";
};

let shootOnCanvas = document.getElementById("hiddenForm:shootCanvas");

shootOnCanvas.addEventListener("click", () => {
    console.log("shoot on canvas was clicked");
    //setLoadingGif();
});

canvas.onclick = function (event) {
    console.log("clicked");
    canvasCoordinates = canvas.getBoundingClientRect();
    let hitX = event.clientX - canvasCoordinates.left;
    let hitY = event.clientY - canvasCoordinates.top;
    let doubleX = (hitX - 150) / 20.0;
    let doubleY = (150 - hitY) / 20.0;
    xCanvas.value = String(doubleX.toPrecision(4));
    yCanvas.value = String(doubleY.toPrecision(4));
    shootOnCanvas.click();
};

//------------------------------- Y validation (down) -------------------------------

let input_y = document.getElementById("form:y-text");

let pattern = /^((-?[0-2])|([0-5]))(\.[0-9]+)?$/;

function validate(text_input){
    if(!pattern.test(text_input.value)){
        text_input.style.background = 'rgba(230, 10, 10, 0.25)';
    } else {
        text_input.style.background = 'rgb(255, 255, 255)';
    }
    submit.disabled = !pattern.test(input_y.value);
}

input_y.oninput = function (){
    validate(input_y);
};