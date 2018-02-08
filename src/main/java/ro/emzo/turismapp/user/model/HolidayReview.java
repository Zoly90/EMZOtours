package ro.emzo.turismapp.user.model;

/**
 * Created by E5570_2 on 2018-02-08.
 */
public class HolidayReview {

    private Integer rating;

    private String title;

    private String text;

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
