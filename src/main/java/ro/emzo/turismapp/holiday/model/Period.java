package ro.emzo.turismapp.holiday.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import ro.emzo.turismapp.core.model.BaseModel;

@Entity
@Table(name = "periods")
public class Period extends BaseModel{
	
	@Column(name = "from")
	private String from;
	
	@Column(name = "until")
	private String until;
	
	@Column(name = "price")
	private String price;
	
	@Column(name = "room_type")
	private String roomType;
	
	@Column(name = "view_type")
	private String viewType;
	
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn
	@JsonBackReference
	private OfferInformation offerInformation;

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getUntil() {
		return until;
	}

	public void setUntil(String until) {
		this.until = until;
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

	public OfferInformation getOfferInformation() {
		return offerInformation;
	}

	public void setOfferInformation(OfferInformation offerInformation) {
		this.offerInformation = offerInformation;
	}
}
