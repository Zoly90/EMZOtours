package ro.emzo.turismapp.commons.exceptions;

/**
 * Created by E5570_2 on 2017-07-04.
 */
public class TurismAppException extends Exception {

    private String errorCode;

    private Object[] info;

    public TurismAppException() {}

    public TurismAppException(String errorCode, Object... info) {
        this(null, errorCode, info);
    }

    public TurismAppException(Throwable cause, String errorCode, Object... info) {
        super(cause);
        this.errorCode = errorCode;
        this.info = info;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public Object[] getInfo() {
        return info;
    }

    public void setInfo(Object[] info) {
        this.info = info;
    }
}
