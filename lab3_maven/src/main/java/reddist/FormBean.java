package reddist;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.util.*;

@ManagedBean(name = "formBean")
@SessionScoped
public class FormBean implements Serializable {

    private String x;
    private String y;
    private String r;
    private String hiddenX;
    private String hiddenY;
    private List<String> xPoints;
    private List<String> rPoints;
    private String sessionId;
    private String hiddenMessage = "";
    private String hiddenMessageDisplay = "none";
    private List<HitsEntity> hits = new ArrayList<HitsEntity>();
    private static String GREEN_COLOR = "#0aff0a";
    private static String RED_COLOR = "#ff0a0a";
    private String hitsJson = "{\"size\":0}";

    @PostConstruct
    public void init() {
        xPoints = new ArrayList<String>();
        rPoints = new ArrayList<String>();
        xPoints.addAll(Arrays.asList("-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"));
        rPoints.addAll(Arrays.asList("1", "2", "3", "4", "5"));
    }

    public void addHit(String sessionId, String whatForm) {
        System.err.println(whatForm);
        this.sessionId = sessionId;
        HitsService service = new HitsService();
        try {
            if (x != null && y != null && !"".equals(y) && r != null && !"".equals(r)) {
                service.saveHit(this);
                hiddenMessage = "";
                hiddenMessageDisplay = "none";
            } else {
                if(r == null || "".equals(r))
                    hiddenMessage = "Не выбран радиус!";
                else
                    hiddenMessage = "Не заданы координаты!";
                hiddenMessageDisplay = "block";
            }
        } catch (IncorrectCoordinateException e) {
            hiddenMessage = e.getMessage();
            hiddenMessageDisplay = "block";
        } finally {
            hits = service.getHitsBySessionId(sessionId);
            Collections.reverse(hits);
        }
    }

    public String deleteHits(String sessionId) {
        this.sessionId = sessionId;
        HitsService service = new HitsService();
        service.deleteHitsBySessionId(sessionId);
        hits = new ArrayList<HitsEntity>();
        return "game";
    }

    public String getHitsById(String sessionId) {
        this.sessionId = sessionId;
        HitsService service = new HitsService();
        hits = service.getHitsBySessionId(sessionId);
        Collections.reverse(hits);
        return "game";
    }

    public void addHiddenHit(String sessionId, String whatForm) {
        String lastX = x;
        String lastY = y;
        x = hiddenX;
        y = hiddenY;
        addHit(sessionId, whatForm);
        x = lastX;
        y = lastY;
    }

    /*public void makeHitsJson(String sessionId){
        hitsJson = resolveHitsJson(new Double(r == null ? "0" : r), sessionId);

        <!--<h:form id="updateJsonForm" styleClass="undisplayed">
            <p:remoteCommand name="updateData" action="#{formBean.makeHitsJson(session.id)}" out="jsonData" />
            <h:inputText id="jsonData" value="#{formBean.hitsJson}" />
            <script type="text/javascript">
                function updateJsonData(radius) {
                    updateData();
                }
                updateJsonData();
            </script>
        </h:form>-->

    }

    private String resolveHitsJson(Double radius, String sessionId){
        StringBuilder hitsJson = new StringBuilder("{");
        // получаем выстрелы
        getHitsById(sessionId);
        ArrayList<HitsEntity> validHits = new ArrayList<HitsEntity>(hits);
        // добавляем размер массива в начало json
        hitsJson.append("\"size\" : ").append(validHits.size());
        if(validHits.size() > 0) {
            hitsJson.append(",\n");
        }
        // формируем json
        double x, y;
        int hitsCount = 0;
        String hitColor = RED_COLOR;
        for(HitsEntity hit : validHits){
            x = hit.getX();
            y = hit.getY();
            HitResult hitResult = new HitResult(Double.toString(x), Double.toString(y), Double.toString(radius));
            if(hitResult.getResult().equals("Вы попали")) hitColor = GREEN_COLOR;
            hitsJson.append("\"hit").append(hitsCount++).append("\" : {");
            hitsJson.append("\"x\" : ").append(x).append(",");
            hitsJson.append("\"y\" : ").append(y).append(",");
            hitsJson.append("\"color\" : ").append("\"").append(hitColor).append("\"").append("}");
            if(hitsCount != validHits.size())
                hitsJson.append(",");
            hitsJson.append("\n");
        }
        hitsJson.append("}");
        System.out.println("hitsJson data updated. (r = " + radius + ")" + hitsJson.toString());
        return hitsJson.toString();
    }*/

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getR() {
        return r;
    }

    public void setR(String r) {
        this.r = r;
    }

    public String getHiddenX() {
        return hiddenX;
    }

    public void setHiddenX(String hiddenX) {
        this.hiddenX = hiddenX;
    }

    public String getHiddenY() {
        return hiddenY;
    }

    public void setHiddenY(String hiddenY) {
        this.hiddenY = hiddenY;
    }

    public List<String> getxPoints() {
        return xPoints;
    }

    public List<String> getrPoints() {
        return rPoints;
    }

    public String getSessionId() {
        return sessionId;
    }

    public String getHiddenMessage() {
        return hiddenMessage;
    }

    public String getHitsJson() {
        return hitsJson;
    }

    public void setHitsJson(String hitsJson) {
        this.hitsJson = hitsJson;
    }

    public String getHiddenMessageDisplay() {
        return hiddenMessageDisplay;
    }
    public List<HitsEntity> getHits() {
        return hits;
    }
}
