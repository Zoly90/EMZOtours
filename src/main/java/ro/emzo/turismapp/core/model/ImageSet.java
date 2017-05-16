package ro.emzo.turismapp.core.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "image_set")
public class ImageSet extends BaseModel{

	@Column(name = "image")
	private String image;
	
	@Column(name = "description")
	private String description;
	
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn
	@JsonBackReference
	private HolidayDetail holidayDetailImageSet;

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public HolidayDetail getHolidayDetailImageSet() {
		return holidayDetailImageSet;
	}

	public void setHolidayDetailImageSet(HolidayDetail holidayDetailImageSet) {
		this.holidayDetailImageSet = holidayDetailImageSet;
	}
}
