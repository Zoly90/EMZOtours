package ro.emzo.turismapp.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by E5570_2 on 2018-01-15.
 */
@Entity
@Table(name = "cities")
public class City extends BaseModel {

    @Column(name = "city")
    private String city;

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
