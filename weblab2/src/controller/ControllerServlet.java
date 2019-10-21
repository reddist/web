package controller;

import com.sun.xml.internal.ws.policy.privateutil.PolicyUtils;
import model.HitResult;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if("true".equals(req.getParameter("getHits")) || "true".equals(req.getParameter("refresh"))) {
            RequestDispatcher dispatcher = req.getRequestDispatcher("WEB-INF/area-check");
            dispatcher.forward(req, resp);
            return;
        }
        RequestDispatcher dispatcher = req.getRequestDispatcher("index.jsp");
        dispatcher.forward( req, resp );
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String x = req.getParameter("x");
        String y = req.getParameter("y");
        String r = req.getParameter("r");
        if(x != null && y != null && r != null) {
            RequestDispatcher dispatcher = req.getRequestDispatcher("WEB-INF/area-check");
            dispatcher.forward(req, resp);
        } else {
            RequestDispatcher dispatcher = req.getRequestDispatcher("WEB-INF/table.jsp");
            dispatcher.forward(req, resp);
        }
    }
}
