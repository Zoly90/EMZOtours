package ro.emzo.turismapp.holiday.model;

import javax.persistence.*;

import ro.emzo.turismapp.core.model.BaseModel;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

@Entity
@Table(name = "holiday_types")
public class HolidayTypes extends BaseModel{
	
	@Column(name = "type")
	private String type;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
