package ro.emzo.turismapp.core.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
	private Localization localization;

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

	public Localization getLocalization() {
		return localization;
	}

	public void setLocalization(Localization localization) {
		this.localization = localization;
	}
	
	
}
