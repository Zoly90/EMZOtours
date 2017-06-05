package ro.emzo.turismapp.holiday.model;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.*;

import ro.emzo.turismapp.core.model.BaseModel;

@Entity
@Table(name = "holiday_types")
public class HolidayTypes extends BaseModel{
	
	@Column(name = "type")
	private String type;
	
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	@JoinColumn(name = "holiday_types_id")
//	private Collection<HolidaySummary> holidaySummary = new ArrayList<>();

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

//	public Collection<HolidaySummary> getHolidaySummary() {
//		return holidaySummary;
//	}
//
//	public void setHolidaySummary(Collection<HolidaySummary> holidaySummary) {
//		this.holidaySummary = holidaySummary;
//	}

}
