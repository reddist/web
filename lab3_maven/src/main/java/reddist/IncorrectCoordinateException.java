package reddist;

public class IncorrectCoordinateException extends Exception {
    @Override
    public String getMessage() {
        return "Некорректно заданные координаты, не удаётся преобразовать их в double!";
    }
}
