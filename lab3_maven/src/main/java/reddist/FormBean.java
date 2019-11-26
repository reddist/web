package reddist;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.util.*;

@ManagedBean(name = "formBean")
@SessionScoped
public class FormBean {

    private String x;
    private String y;
    private String r;
    private List<String> xPoints;
    private List<String> rPoints;
    private String sessionId;
    private String hiddenMessage = "";
    private String hiddenMessageDisplay = "none";
    private List<HitsEntity> hits = new ArrayList<HitsEntity>();

    @PostConstruct
    public void init() {
        xPoints = new ArrayList<String>();
        rPoints = new ArrayList<String>();
        xPoints.addAll(Arrays.asList("-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"));
        rPoints.addAll(Arrays.asList("1", "2", "3", "4", "5"));
    }

    public void addHit(String sessionId, String whatFrom) {
        System.err.println(whatFrom);
        this.sessionId = sessionId;
        HitsService service = new HitsService();
        try {
            if (x != null && y != null && !"".equals(y) && r != null && !"".equals(r)) {
                service.saveHit(this);
                hiddenMessage = "";
                hiddenMessageDisplay = "none";
            } else {
                hiddenMessage = "Поля должны быть ненулевыми!";
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

    public void deleteHits(String sessionId) {
        this.sessionId = sessionId;
        HitsService service = new HitsService();
        service.deleteHitsBySessionId(sessionId);
        hits = new ArrayList<HitsEntity>();
    }

    public void getHitsById(String sessionId) {
        this.sessionId = sessionId;
        HitsService service = new HitsService();
        hits = service.getHitsBySessionId(sessionId);
        Collections.reverse(hits);
    }

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

    public String getHiddenMessageDisplay() {
        return hiddenMessageDisplay;
    }
    public List<HitsEntity> getHits() {
        return hits;
    }
}
