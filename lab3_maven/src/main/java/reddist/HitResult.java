package reddist;

public class HitResult {
    private String stringX;
    private String stringY;
    private String stringR;
    private String result;
    private double x;
    private double y;
    private double r;
    private boolean valid = true;

    public HitResult(String stringX, String stringY, String stringR) {
        this.stringX = stringX;
        this.stringY = stringY;
        this.stringR = stringR;
        checkArea();
    }

    private void checkArea() {
        if(!checkParams()) return;

        boolean checkResult = true;

        if(x >= 0 && y <= 0) {
            checkResult = y >= (x - r);
        }

        if(x <= 0 && y <= 0) {
            checkResult = checkResult && ((x*x + y*y) <= (r*r / 4.0D));
        }

        if(x <= 0 && y >= 0) {
            checkResult = checkResult && (y <= r) && ( x >= -r);
        }

        checkResult &= !(x > 0 && y > 0);

        if(checkResult){
            result = "Вы попали";
        } else {
            result = "Вы не попали";
        }
    }

    private boolean checkParams(){
        try {
            x = Double.parseDouble(stringX);
            if(x >= 5.0 || x <= -3.0) {
                result = "Некорректное значение x";
                return false;
            }
        } catch (NumberFormatException e) {
            result = "Некорректное значение x";
            valid = false;
            return false;
        }
        try {
            y = Double.parseDouble(stringY);
            if(y >= 5.0 || y <= -3.0) {
                result = "Некорректное значение y";
                return false;
            }
        } catch (NumberFormatException e) {
            result = "Некорректное значение y";
            valid = false;
            return false;
        }
        try {
            r = Double.parseDouble(stringR);
            if(r > 5.0 || r < 1.0) {
                result = "Некорректное значение r";
                return false;
            }
        } catch (NumberFormatException e) {
            result = "Некорректное значение r";
            valid = false;
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "HitResult{" +
                "stringX='" + stringX + '\'' +
                ", stringY='" + stringY + '\'' +
                ", stringR='" + stringR + '\'' +
                ", result='" + result + '\'' +
                '}';
    }

    public String getStringX() {
        return stringX;
    }

    public String getStringY() {
        return stringY;
    }

    public String getStringR() {
        return stringR;
    }

    public String getResult() {
        return result;
    }

    public boolean isValid() {
        return valid;
    }
}
