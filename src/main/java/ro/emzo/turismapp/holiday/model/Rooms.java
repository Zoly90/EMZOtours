package ro.emzo.turismapp.holiday.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import ro.emzo.turismapp.core.model.BaseModel;

@Entity
@Table(name = "rooms")
public class Rooms extends BaseModel{
	
	@Column(name = "room_type")
	private String roomType;
	
	@Column(name = "person_capacity")
	private String personCapacity;
	
	@Column(name = "room_facilities")
	private String roomFacilities;
	
	@Column(name = "image")
	private String image;

	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn
	@JsonBackReference
	private Holiday holiday;

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public String getPersonCapacity() {
		return personCapacity;
	}

	public void setPersonCapacity(String personCapacity) {
		this.personCapacity = personCapacity;
	}

	public String getRoomFacilities() {
		return roomFacilities;
	}

	public void setRoomFacilities(String roomFacilities) {
		this.roomFacilities = roomFacilities;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Holiday getHoliday() {
		return holiday;
	}

	public void setHoliday(Holiday holiday) {
		this.holiday = holiday;
	}
}
