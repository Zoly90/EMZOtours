package ro.emzo.turismapp.core.model;

import java.util.List;

/**
 * Created by E5570_2 on 2018-01-12.
 */
public class PagedList<T> {

    private Integer offset;

    private Integer itemsPerPage;

    private Long itemsTotal;

    private List<T> data;

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getItemsPerPage() {
        return itemsPerPage;
    }

    public void setItemsPerPage(Integer itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
    }

    public Long getItemsTotal() {
        return itemsTotal;
    }

    public void setItemsTotal(Long itemsTotal) {
        this.itemsTotal = itemsTotal;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}
