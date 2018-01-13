package ro.emzo.turismapp.offer.model;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by E5570_2 on 2017-07-29.
 */
public enum Status {

    OPEN("status.open"), WIP("status.wip"), DONE("status.done");

    private String statusKey;

    private Status(String statusKey) {
        this.statusKey = statusKey;
    }

    @JsonValue
    public String getStatusKey() {
        return statusKey;
    }

    public String getValue() {
        return this.statusKey;
    }

    /**
     * Returns an unmodifiable list containing the literals that are known by
     * this enumeration.
     *
     * @return A List containing the actual literals defined by this
     *         enumeration, this list can not be modified.
     */
    public static List<String> literals() {
        return Status.literals;
    }

    private static List<String> literals = new ArrayList<String>(3);

    static {
        synchronized (Status.literals) {
            Status.literals.add(OPEN.statusKey);
            Status.literals.add(WIP.statusKey);
            Status.literals.add(DONE.statusKey);
            Status.literals = Collections.unmodifiableList(literals);
        }
    }

    /**
     * Retrieves an instance of Title from <code>its titleKey</code>.
     *
     * @param text
     * @return
     */
    public static Status fromString(String text) {
        for (Status key : Status.values()) {
            if (key.statusKey.equals((text))) {
                return key;
            }
        }
        return null;
    }
}
