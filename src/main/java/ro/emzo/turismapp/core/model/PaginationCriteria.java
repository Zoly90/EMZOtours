package ro.emzo.turismapp.core.model;

/**
 * Created by E5570_2 on 2017-12-10.
 */
public class PaginationCriteria {

    private int offset;

    private int itemsPerPage;

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getItemsPerPage() {
        return itemsPerPage;
    }

    public void setItemsPerPage(int itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
    }
}
