package ro.emzo.turismapp.holiday.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import ro.emzo.turismapp.core.model.BaseModel;
import ro.emzo.turismapp.user.model.UserInfo;

import java.util.Date;

@Entity
@Table(name = "periods")
public class Periods extends BaseModel{
	
	@Column(name = "period_starting_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date startingDate;
	
	@Column(name = "period_ending_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date endingDate;
	
	@Column(name = "price")
	private String price;
	
	@Column(name = "room_type")
	private String roomType;

	@Column(name = "room_luxury_level")
	private String roomLuxuryLevel;
	
	@Column(name = "view_type")
	private String viewType;

	@Column(name = "nr_rooms_left")
	private String nrOfRoomsLeft;
	
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn
	@JsonBackReference
	private Holiday holiday;

	public Date getStartingDate() {
		return startingDate;
	}

	public void setStartingDate(Date startingDate) {
		this.startingDate = startingDate;
	}

	public Date getEndingDate() {
		return endingDate;
	}

	public void setEndingDate(Date endingDate) {
		this.endingDate = endingDate;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public String getViewType() {
		return viewType;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	public String getRoomLuxuryLevel() {
		return roomLuxuryLevel;
	}

	public void setRoomLuxuryLevel(String roomLuxuryLevel) {
		this.roomLuxuryLevel = roomLuxuryLevel;
	}

	public String getNrOfRoomsLeft() {
		return nrOfRoomsLeft;
	}

	public void setNrOfRoomsLeft(String nrOfRoomsLeft) {
		this.nrOfRoomsLeft = nrOfRoomsLeft;
	}

	public Holiday getHoliday() {
		return holiday;
	}

	public void setHoliday(Holiday holiday) {
		this.holiday = holiday;
	}
}
