package ro.emzo.turismapp.core.model;

/**
 * Created by E5570_2 on 2018-01-06.
 */
public class FilterCriteria {

    private String field;

    private String value;

    private String operation;

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }
}
