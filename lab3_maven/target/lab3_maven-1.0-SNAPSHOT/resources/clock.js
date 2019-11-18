function clock() {
    var d = new Date();
    var month_num = d.getMonth();
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();

    var month=["января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"];

    if (day <= 9) day = "0" + day;
    if (hours <= 9) hours = "0" + hours;
    if (minutes <= 9) minutes = "0" + minutes;
    if (seconds <= 9) seconds = "0" + seconds;

    document.getElementById("dateTime").innerHTML =
        "Сегодня - " + day + " " + month[month_num] + " " + d.getFullYear() +
        " г.<br>Текущее время - " + hours + ":" + minutes + ":" + seconds;
    setTimeout("clock()", 1000);
}

clock();