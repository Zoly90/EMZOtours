package ro.emzo.turismapp.holiday.model;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by E5570_2 on 2018-01-13.
 */
public enum Transportation {

    BUS("transportation.bus"), AIRPLANE("transportation.airplane"), PERSONAL("transportation.personal");

    private String transportationKey;

    private Transportation(String statusKey) {
        this.transportationKey = statusKey;
    }

    @JsonValue
    public String getTransportationKey() {
        return transportationKey;
    }

    public String getValue() {
        return this.transportationKey;
    }

    /**
     * Returns an unmodifiable list containing the literals that are known by
     * this enumeration.
     *
     * @return A List containing the actual literals defined by this
     *         enumeration, this list can not be modified.
     */
    public static List<String> literals() {
        return Transportation.literals;
    }

    private static List<String> literals = new ArrayList<String>(3);

    static {
        synchronized (Transportation.literals) {
            Transportation.literals.add(BUS.transportationKey);
            Transportation.literals.add(AIRPLANE.transportationKey);
            Transportation.literals.add(PERSONAL.transportationKey);
            Transportation.literals = Collections.unmodifiableList(literals);
        }
    }

    /**
     * Retrieves an instance of Title from <code>its titleKey</code>.
     *
     * @param text
     * @return
     */
    public static Transportation fromString(String text) {
        for (Transportation key : Transportation.values()) {
            if (key.transportationKey.equals((text))) {
                return key;
            }
        }
        return null;
    }
}
