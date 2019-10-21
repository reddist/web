<%@ page import="java.util.ArrayList" %>
<%@ page import="model.HitResult" %>
<%@ page import="java.util.Collections" %>
<%@ page import="java.util.concurrent.TimeUnit" %>
<!-- Yes, web-lab-2, oh yeeeah..... -->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%! ServletContext context;
    HttpSession session;
%>
<%
    context = request.getServletContext();
    session = request.getSession();
%>
<%! private ArrayList<HitResult> reverse(ArrayList<HitResult> array) {
    ArrayList<HitResult> reversed;
    try {
        Collections.reverse(array);
        reversed = new ArrayList<HitResult>(array);
        Collections.reverse(array);
    } catch (NullPointerException e){
        return new ArrayList<HitResult>();
    }
    return reversed;
}%>
<%/*
<html>
<head>
    <title>Результат выстрела</title>
    <style>
        table {
            width: 80%;
            margin: 20px auto 0;
            background: linear-gradient(to top left, powderblue, pink);
        }
        table, td, tr {
            border: 1px solid #b9b9b9;
            padding: 2px;
        }
        td {
            text-align: center;
        }
    </style>
</head>
<body>
    <main>

    </main>
</body>
</html>
*/%>
<% try {
    TimeUnit.MILLISECONDS.sleep(1000);
} catch (InterruptedException ignored) {
}%>
<table class="result-table">
    <tr>
        <td>X</td>
        <td>Y</td>
        <td>R</td>
        <td style="width: 50%">Результат</td>
    </tr>
    <% for(HitResult result : reverse((ArrayList<HitResult>) context.getAttribute(session.getId()))){ %>
    <tr>
        <td><%= result.getStringX() %></td>
        <td><%= result.getStringY() %></td>
        <td><%= result.getStringR() %></td>
        <td><%= result.getResult() %></td>
    </tr>
    <%}%>
</table>