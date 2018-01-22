package ro.emzo.turismapp.holiday.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import ro.emzo.turismapp.core.model.BaseModel;

@Entity
@Table(name = "points_of_interest")
public class PointsOfInterest extends BaseModel{

	@Column(name = "point_of_interest")
	private String pointOfInterest;
	
	@Column(name = "distance")
	private String distance;

	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn
	@JsonBackReference
	private Holiday holiday;

	public String getPointOfInterest() {
		return pointOfInterest;
	}

	public void setPointOfInterest(String pointOfInterest) {
		this.pointOfInterest = pointOfInterest;
	}

	public String getDistance() {
		return distance;
	}

	public void setDistance(String distance) {
		this.distance = distance;
	}

	public Holiday getHoliday() {
		return holiday;
	}

	public void setHoliday(Holiday holiday) {
		this.holiday = holiday;
	}
}
