package ro.emzo.turismapp.core.model;

/**
 * Created by E5570_2 on 2017-12-10.
 */
public class SearchCriteria {

    /**
     * The string used to search in the database - coming from the UI search box
     */
    private String searchKeyword;

    private PaginationCriteria paginationCriteria;

    public String getSearchKeyword() {
        return searchKeyword;
    }

    public void setSearchKeyword(String searchKeyword) {
        this.searchKeyword = searchKeyword;
    }

    public PaginationCriteria getPaginationCriteria() {
        return paginationCriteria;
    }

    public void setPaginationCriteria(PaginationCriteria paginationCriteria) {
        this.paginationCriteria = paginationCriteria;
    }
}
