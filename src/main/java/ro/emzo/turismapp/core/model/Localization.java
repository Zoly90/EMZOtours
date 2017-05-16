package ro.emzo.turismapp.core.model;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "localization")
public class Localization extends BaseModel{
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private Map map;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "localization_id")
	private Collection<PointsOfInterest> pointsOfInterest = new ArrayList<>();

	public Collection<PointsOfInterest> getPointsOfInterest() {
		return pointsOfInterest;
	}

	public void setPointsOfInterest(Collection<PointsOfInterest> pointsOfInterest) {
		this.pointsOfInterest = pointsOfInterest;
	}

	public Map getMap() {
		return map;
	}

	public void setMap(Map map) {
		this.map = map;
	}
}