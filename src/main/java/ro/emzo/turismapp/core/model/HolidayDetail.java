package ro.emzo.turismapp.core.model;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "holiday_detail")
public class HolidayDetail extends BaseModel {
	
	/*@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private HotelInformation hotelInformation;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private AccommodationAddress accommodationAddress;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private Descriptions descriptions;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private Localization localization;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn
	private OfferInformation offerInformation;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_detail_image_set_id")
	private Collection<ImageSet> imageSet = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_detail_rooms_id")
	private Collection<Rooms> rooms = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_detail_facilities_id")
	private Collection<Facilities> facilities = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "holiday_detail_reviews_id")
	private Collection<Reviews> reviews = new ArrayList<>();

	public HotelInformation getHotelInformation() {
		return hotelInformation;
	}

	public void setHotelInformation(HotelInformation hotelInformation) {
		this.hotelInformation = hotelInformation;
	}

	public AccommodationAddress getAccommodationAddress() {
		return accommodationAddress;
	}

	public void setAccommodationAddress(AccommodationAddress accommodationAddress) {
		this.accommodationAddress = accommodationAddress;
	}

	public Descriptions getDescriptions() {
		return descriptions;
	}

	public void setDescriptions(Descriptions descriptions) {
		this.descriptions = descriptions;
	}

	public Localization getLocalization() {
		return localization;
	}

	public void setLocalization(Localization localization) {
		this.localization = localization;
	}

	public OfferInformation getOfferInformation() {
		return offerInformation;
	}

	public void setOfferInformation(OfferInformation offerInformation) {
		this.offerInformation = offerInformation;
	}

	public Collection<ImageSet> getImageSet() {
		return imageSet;
	}

	public void setImageSet(Collection<ImageSet> imageSet) {
		this.imageSet = imageSet;
	}

	public Collection<Rooms> getRooms() {
		return rooms;
	}

	public void setRooms(Collection<Rooms> rooms) {
		this.rooms = rooms;
	}

	public Collection<Facilities> getFacilities() {
		return facilities;
	}

	public void setFacilities(Collection<Facilities> facilities) {
		this.facilities = facilities;
	}

	public Collection<Reviews> getReviews() {
		return reviews;
	}

	public void setReviews(Collection<Reviews> reviews) {
		this.reviews = reviews;
	}*/
}
