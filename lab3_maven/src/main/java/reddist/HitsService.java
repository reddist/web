package reddist;

import java.util.List;

public class HitsService {

    private HitsDAO hitsDAO = new HitsDAO();

    public void saveHit(FormBean hitGotFromPage) throws IncorrectCoordinateException{
        HitsEntity hit = new HitsEntity();
        HitResult result = new HitResult(hitGotFromPage.getX(), hitGotFromPage.getY(), hitGotFromPage.getR());
        if(result.isValid()) {
            hit.setX(Double.parseDouble(hitGotFromPage.getX()));
            hit.setY(Double.parseDouble(hitGotFromPage.getY()));
            hit.setR(Double.parseDouble(hitGotFromPage.getR()));
            hit.setSessionId(hitGotFromPage.getSessionId());
            hit.setResult(result.getResult());
            hitsDAO.saveHit(hit);
        } else {
            throw new IncorrectCoordinateException();
        }
    }

    public List<HitsEntity> getHitsBySessionId(String sessionId) {
        return hitsDAO.getHitsBySessionId(sessionId);
    }

    public void deleteHitsBySessionId(String sessionId){
        hitsDAO.deleteHitsBySessionId(sessionId);
    }
}
