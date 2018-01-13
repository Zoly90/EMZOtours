package ro.emzo.turismapp.user.to;

/**
 * Created by E5570_2 on 2018-01-07.
 */
public class EmployeeTO {

    private Long id;

    private String employeeName;

    public EmployeeTO(Long id, String name) {
        this.id = id;
        this.employeeName = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
}
