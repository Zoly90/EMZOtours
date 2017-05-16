package ro.emzo.turismapp.core.model;

import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "reviews")
public class Reviews extends BaseModel{
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "rating")
	private Long rating;
	
	@Column(name = "text")
	private String text;
	
	@Column(name = "date_of_review")
	private Date dateOfReview;
	
	@Column(name = "date_of_travel")
	private Date dateOfTravel;
	
	@Column(name = "name_of_reviewer")
	private String nameOfReviewer;
	
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinColumn
	@JsonBackReference
	private HolidayDetail holidayDetailReviews;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Long getRating() {
		return rating;
	}

	public void setRating(Long rating) {
		this.rating = rating;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Date getDateOfReview() {
		return dateOfReview;
	}

	public void setDateOfReview(Date dateOfReview) {
		this.dateOfReview = dateOfReview;
	}

	public Date getDateOfTravel() {
		return dateOfTravel;
	}

	public void setDateOfTravel(Date dateOfTravel) {
		this.dateOfTravel = dateOfTravel;
	}

	public String getNameOfReviewer() {
		return nameOfReviewer;
	}

	public void setNameOfReviewer(String nameOfReviewer) {
		this.nameOfReviewer = nameOfReviewer;
	}

	public HolidayDetail getHolidayDetailReviews() {
		return holidayDetailReviews;
	}

	public void setHolidayDetailReviews(HolidayDetail holidayDetailReviews) {
		this.holidayDetailReviews = holidayDetailReviews;
	}
}
