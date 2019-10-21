package model;

public class HitResult {
    private String stringX;
    private String stringY;
    private String stringR;
    private String result;
    private double x;
    private double y;
    private double r;

    public HitResult(String stringX, String stringY, String stringR) {
        this.stringX = stringX;
        this.stringY = stringY;
        this.stringR = stringR;
        checkArea();
    }

    private void checkArea() {
        if(!checkParams())
            return;

        boolean checkResult = true;

        if(x >= 0 && y <= 0) {
            checkResult = y >= (x - r);
        }

        if(x <= 0 && y <= 0) {
            checkResult = checkResult && ((x*x + y*y) <= r*r);
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
        } catch (NumberFormatException e) {
            result = "Некорректное значение x";
            return false;
        }
        try {
            y = Double.parseDouble(stringY);
        } catch (NumberFormatException e) {
            result = "Некорректное значение y";
            return false;
        }
        try {
            r = Double.parseDouble(stringR);
        } catch (NumberFormatException e) {
            result = "Некорректное значение r";
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
}
