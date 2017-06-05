package ro.emzo.turismapp.holiday.model;

import javax.persistence.*;

import ro.emzo.turismapp.core.model.BaseModel;

@Entity
@Table(name = "image_set")
public class ImageSet extends BaseModel{

	@Column(name = "image")
	private String image;
	
	@Column(name = "description")
	private String description;

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
}
