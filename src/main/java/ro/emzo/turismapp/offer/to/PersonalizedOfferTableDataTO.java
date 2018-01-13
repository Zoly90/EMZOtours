package ro.emzo.turismapp.offer.to;

import ro.emzo.turismapp.offer.model.Status;

import java.util.Date;

/**
 * Created by E5570_2 on 2017-12-15.
 */
public class PersonalizedOfferTableDataTO {

    private Long id;

    private String clientName;

    private String destination;

    private Date firstDay;

    private Date lastDay;

    private Long handlerId;

    private String handlerName;

    private Status handlingStatus;

    public PersonalizedOfferTableDataTO() {
    }

    public PersonalizedOfferTableDataTO(Long id, String clientName, String destination, Date firstDay, Date lastDay,
                Long handlerId, String handlerName, Status handlingStatus) {
        this.id = id;
        this.clientName = clientName;
        this.destination = destination;
        this.firstDay = firstDay;
        this.lastDay = lastDay;
        this.handlerId = handlerId;
        this.handlerName = handlerName;
        this.handlingStatus = handlingStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Date getFirstDay() {
        return firstDay;
    }

    public void setFirstDay(Date firstDay) {
        this.firstDay = firstDay;
    }

    public Date getLastDay() {
        return lastDay;
    }

    public void setLastDay(Date lastDay) {
        this.lastDay = lastDay;
    }

    public Long getHandlerId() {
        return handlerId;
    }

    public void setHandlerId(Long handlerId) {
        this.handlerId = handlerId;
    }

    public String getHandlerName() {
        return handlerName;
    }

    public void setHandlerName(String handlerName) {
        this.handlerName = handlerName;
    }

    public Status getHandlingStatus() {
        return handlingStatus;
    }

    public void setHandlingStatus(Status handlingStatus) {
        this.handlingStatus = handlingStatus;
    }
}
