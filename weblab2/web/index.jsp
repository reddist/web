<%@ page import="model.HitResult" %>
<%@ page import="java.util.ArrayList" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%! private void addTableForSession(HttpServletRequest req){
    HttpSession session = req.getSession();
    if(session.isNew()){
        ServletContext context = req.getServletContext();
        ArrayList<HitResult> list = new ArrayList<HitResult>();
        context.setAttribute(session.getId(), list);
    }
}%>

<% addTableForSession(request); %>

<html lang="ru">
  <head>
      <meta charset="UTF-8">
      <title>Лабораторная №2 по web-программрованию Васькин Алексей P3200</title>
      <link rel="stylesheet" href="main-page.css">
      <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
  </head>
  <body>
    <header>
        <p style="padding-top: 10px; margin: 0 0;">
            <strong>ФИО:</strong> Васькин Алексей Андреевич&emsp;
            <strong>Группа:</strong> P3200&emsp;
            <strong>Вариант:</strong> 200022
        </p>
    </header>
    <main>
        <div class="main-col">
            <div id="canvas-and-form-col" class="clearfix">
                <div id="canvas-div">
                    <canvas id="plane" width="300" height="300"></canvas>
                </div>
                <div id="form-div">
                    <form name="f1" method="post" action=""<%//${pageContext.request.contextPath}/index"%> id="form">
                        <fieldset>
                            <legend>X</legend>
                            <label for="x-text" class="special-y">
                                <input name="x" type="text" maxlength="6" placeholder="Введите координату X" required id="x-text" pattern="(-?[0-2]([,.][0-9]+)?)|([34]([,.][0-9]+)?)">
                                (-3.0 .. 5.0)&emsp;
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Y</legend>
                            <label for="y-text" class="special-y">
                                <input name="y" type="text" maxlength="6" placeholder="Введите координату Y" required id="y-text" pattern="(-?[0-2]([,.][0-9]+)?)|([34]([,.][0-9]+)?)">
                                (-3.0 .. 5.0)&emsp;
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>R</legend>
                            <label for="r-selector">
                                <select size="3" name="r" id="r-selector" style="width: 30%;">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option selected value="5">5</option>
                                </select>
                            </label>
                        </fieldset>
                        <br />
                        <input type="button" name="shoot" value="Выстрел!" id="shoot" width="80" style="border-radius: 10px; margin: 0 calc(50% - 40px);">
                        <!--<input type="hidden" name="offset" id="timezone">-->
                    </form>
                </div>
            </div>
            <div id="result-div">
                <span id="result-table-span"><jsp:include page="/WEB-INF/table.jsp" /></span>
                <img src="resources/reset.png" width="23" class="refresh" id="refresh" alt="reset">
            </div>
        </div>

        <script src="drawing.js"></script>
    </main>
    <footer class="clearfix">
        <div style="float: left; margin: 10px 0 0 10px;"><span id="dateTime">Время</span></div>
        <div style="float: right; text-align: right; margin: 10px 5px 0 0;">
            <p style="margin: 0 0;">Aleksey Vaskin
            <br>erddist@gmail.com
            <br><a href="https://vk.com/reddist">vk.com/reddist</a>
            <br><a href="https://github.com/reddist/web/tree/master/weblab1">Github</a>
            </p>
        </div>
        <script type="text/javascript">
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

                var date_time = "Сегодня - " + day + " " + month[month_num] + " " + d.getFullYear() +
                    " г.<br>Текущее время - "+ hours + ":" + minutes + ":" + seconds;
                document.getElementById("dateTime").innerHTML = date_time;
                setTimeout("clock()", 1000);
            }
            clock();
        </script>
    </footer>
  </body>
</html>
