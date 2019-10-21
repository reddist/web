package controller;

import model.HitResult;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class AreaCheckServlet extends HttpServlet {

    private static String makeJson(ArrayList<HitResult> hits){
        StringBuilder hitsJson = new StringBuilder("{");
        int i = 0;
        ArrayList<HitResult> validHits = new ArrayList<>();
        for(HitResult hit : hits) {
            try {
                Double.parseDouble(hit.getStringX());
                Double.parseDouble(hit.getStringY());
            } catch (NumberFormatException e) {
                continue;
            }
            validHits.add(hit);
        }
        hitsJson.append("\"size\" : ").append(validHits.size());
        if(validHits.size() > 0)
            hitsJson.append(",\n");
        double x, y;
        for(HitResult hit : validHits){
            x = Double.parseDouble(hit.getStringX());
            y = Double.parseDouble(hit.getStringY());
            hitsJson.append("\"hit").append(i++).append("\" : {");
            hitsJson.append("\"x\" : ").append(x).append(",");
            hitsJson.append("\"y\" : ").append(y).append("}");
            if(i != validHits.size())
                hitsJson.append(",");
            hitsJson.append("\n");
        }
        hitsJson.append("}");
        return hitsJson.toString();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        ServletContext context = req.getServletContext();
        ArrayList<HitResult> hits = (ArrayList<HitResult>) context.getAttribute(session.getId());
        if ("true".equals(req.getParameter("getHits"))) {
            PrintWriter out = resp.getWriter();
            out.println(makeJson(hits));
            return;
        }
        if ("true".equals(req.getParameter("refresh"))) {
            context.setAttribute(session.getId(), new ArrayList<HitResult>());
            RequestDispatcher dispatcher = req.getRequestDispatcher("table.jsp");
            dispatcher.forward(req, resp);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HitResult hitResult = new HitResult(req.getParameter("x"), req.getParameter("y"), req.getParameter("r"));
        HttpSession session = req.getSession();
        ServletContext context = req.getServletContext();
        ArrayList<HitResult> list = (ArrayList<HitResult>) context.getAttribute(session.getId());
        if(list == null)
            list = new ArrayList<HitResult>();
        list.add(hitResult);
        context.setAttribute(session.getId(), list);

        RequestDispatcher dispatcher = req.getRequestDispatcher("table.jsp");
        dispatcher.forward(req, resp);
    }
}
