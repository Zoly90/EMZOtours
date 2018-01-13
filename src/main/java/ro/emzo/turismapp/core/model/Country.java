package ro.emzo.turismapp.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by E5570_2 on 2018-01-07.
 */
@Entity
@Table(name = "contries")
public class Country extends BaseModel {

    @Column(name = "country")
    private String country;

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
