package ro.emzo.turismapp.core.model;

import java.util.Collection;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "map")
public class Map extends BaseModel{
	
	@Column(name = "lattitude")
	private String lattitude;
	
	@Column(name = "longitude")
	private String longitude;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "map")
	@JsonBackReference
	private Collection<Localization> localization;

	public String getLattitude() {
		return lattitude;
	}

	public void setLattitude(String lattitude) {
		this.lattitude = lattitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public Collection<Localization> getLocalization() {
		return localization;
	}

	public void setLocalization(Collection<Localization> localization) {
		this.localization = localization;
	}
}
