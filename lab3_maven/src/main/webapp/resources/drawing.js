let canvas = document.getElementById("plane");
//let jsonData = document.getElementById("updateJsonForm:jsonData").value;
//let lastHits;
let currentRadius = 0;
let lastRadius = 0;

function drawWithRadius(radius) {
    if (canvas.getContext) {
        let context = canvas.getContext('2d');

        // clearing canvas
        context.clearRect(0, 0, 300, 300);

        // background
        //context.fillStyle = 'rgb(255, 255, 255)';
        //context.fillRect(0, 0, 300, 300);

        // X-Axis
        {
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(20, 150);
            context.lineTo(278, 150);
            context.moveTo(280, 150);
            context.lineTo(270, 155);
            context.stroke();
            context.moveTo(20, 150);

            context.lineTo(278, 150);
            context.moveTo(280, 150);
            context.lineTo(270, 145);
            context.stroke();

            var axisXLines = [
                { x : 50, y : 153},
                { x : 70, y : 153},
                { x : 90, y : 153},
                { x : 110, y : 153},
                { x : 130, y : 153},

                { x : 170, y : 153},
                { x : 190, y : 153},
                { x : 210, y : 153},
                { x : 230, y : 153},
                { x : 250, y : 153}
            ];
            var x, y;
            context.lineWidth = 2;
            for(let i = 0; i < 10; i++){
                x = axisXLines[i].x;
                y = axisXLines[i].y;
                context.moveTo(x, y);
                context.lineTo(x, y - 6);
            }
            context.stroke();
            context.closePath();
        }

        // Y-Axis
        {
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(150, 280);
            context.lineTo(150, 22);
            context.moveTo(150, 20);
            context.lineTo(155, 30);
            context.stroke();

            context.moveTo(150, 280);
            context.lineTo(150, 22);
            context.moveTo(150, 20);
            context.lineTo(145, 30);
            context.stroke();

            var axisYLines = [
                { x : 147, y : 50},
                { x : 147, y : 70},
                { x : 147, y : 90},
                { x : 147, y : 110},
                { x : 147, y : 130},

                { x : 147, y : 170},
                { x : 147, y : 190},
                { x : 147, y : 210},
                { x : 147, y : 230},
                { x : 147, y : 250}
            ];
            context.lineWidth = 2;
            for(let j = 0; j < 10; j++){
                x = axisYLines[j].x;
                y = axisYLines[j].y;
                context.moveTo(x, y);
                context.lineTo(x + 6, y);
            }
            context.stroke();
            context.closePath();
        }

        // Rectangle
        context.fillStyle = 'rgba(0, 0, 200, 0.35)';
        context.fillRect(150 - 20 * radius, 150 - 20 * radius, 20 * radius, 20 * radius);

        // Triangle
        context.beginPath();
        context.moveTo(150, 150);
        context.lineTo(150 + 20 * radius, 150);
        context.lineTo(150, 150 + 20 * radius);
        context.lineTo(150, 150);
        context.fill();
        context.closePath();

        // Arc
        context.beginPath();
        context.arc(150, 150, 10 * radius, Math.PI * 0.5, Math.PI);
        context.moveTo(150, 150);
        context.lineTo(150 - 10 * radius, 150);
        context.lineTo(150, 150 + 10 * radius);
        context.lineTo(150, 150);
        //context.stroke();
        context.fill();
        context.closePath();

        //Text
        context.beginPath();
        context.font = '12px sans-serif';
        context.fillStyle = 'rgb(0, 0, 0)';


        // X-Text from left to right
        for(let i = 0; i < 5; i++){
            x = axisXLines[i].x;
            y = axisXLines[i].y;
            context.fillText(String(i - 5), x - 9.5, y + 13);
        }
        for(let i = 5; i < 10; i++){
            x = axisXLines[i].x;
            y = axisXLines[i].y;
            context.fillText(String(i - 4), x - 7, y - 8);
        }


        // Y-Text from up to down
        for(let j = 0; j < 5; j++){
            x = axisYLines[j].x;
            y = axisYLines[j].y;
            context.fillText(String(5 - j), x + 7, y - 2);
        }
        for(let j = 5; j < 10; j++){
            x = axisYLines[j].x;
            y = axisYLines[j].y;
            context.fillText(String(4 - j), x - 10.5, y + 12.5);
        }


        // X and Y and 0
        context.font = '13px sans-serif';
        context.fillText("X", 278, 165);
        context.fillText("Y", 150, 20);
        context.font = '10px sans-serif';
        context.fillText("0", 141, 161);
        context.closePath();

        // Permitted zone
        context.fillStyle = 'rgba(200, 0, 0, 0.1)';
        context.fillRect(0, 0, 70, 300);
        context.fillRect(230, 0, 70, 300);
        context.fillRect(70, 0, 160, 50);
        context.fillRect(70, 210, 160, 90);

        // Last hits from application context
        getHits();
    }
}

drawWithRadius(0);

function drawFromJSF(){
    //updateCurrentRadius();
    drawWithRadius(currentRadius);
}

function resultOfHit(x, y){
    let r = currentRadius;
    let checkResult = false;
    if(x >= 0 && y <= 0) {
        checkResult = y >= (x - r);
    }
    if(x <= 0 && y <= 0) {
        checkResult = checkResult || ((x*x + y*y) <= (r*r / 4.0));
    }
    if(x <= 0 && y >= 0) {
        checkResult = checkResult || (y <= r) && ( x >= -r);
    }
    checkResult &= !(x > 0 && y > 0);
    checkResult &= ((x <= 4.0) && (x >= -4.0)) && ((y < 5.0) && (y > -3.0));
    return checkResult;
}

function getHits() {
    //updateJsonData();
    //jsonData = document.getElementById("updateJsonForm:jsonData").value;
    //console.log(jsonData);
    //drawHits(JSON.parse(jsonData));
    /*$.get('index', {getHits : "true"},
        function(data) {
            console.log(data);
            drawHits(JSON.parse(data));
    });*/

    let rows = $('.result-table tbody tr');
    let rowString, x, y, r, color;
    let context = canvas.getContext('2d');
    rows.each(function (row) {
        rowString = "";
        $(this).find('td').each(function () {
            rowString += $(this).html().toString().replace(/\s+/g,'')+" ";
        });
        rowString=rowString.replace('<br>','');
        if(!(rowString.replace(/\s+/g,'')==="")){
            x = rowString.toString().split(' ')[0];
            y = rowString.toString().split(' ')[1];
            r = rowString.toString().split(' ')[2];
            if(resultOfHit(x, y)) {
                color = "#0aff0a";
            } else {
                color = "#ff0a0a";
            }
        }
        context.beginPath();
        context.arc(150 + x / 5.0 * 100,
            150 - y / 5.0 * 100,
            1.5, 0, 2 * Math.PI);

        context.fillStyle = color;
        context.fill();
        context.closePath();
    });
}

/*function drawHits(hits) {
    lastHits = hits;
    if (canvas.getContext) {
        let context = canvas.getContext('2d');
        let hit, hitX, hitY, hitColor;
        for(let i = 0; i < hits.size; i++) {
            hit = hits["hit" + i];
            hitX = hit.x;
            hitY = hit.y;
            hitColor = hit.color;
            context.beginPath();
            context.arc(150 + hitX / 5.0 * 100,
                150 - hitY / 5.0 * 100,
                1.5, 0, 2 * Math.PI);

            context.fillStyle = hitColor;
            context.fill();
            context.closePath();
        }
    }
}*/


