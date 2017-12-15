package ro.emzo.turismapp.user.model;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by E5570_2 on 2017-12-03.
 */
public enum Title {

    MR("title.mr"), MRS("title.mrs"), MS("title.ms");

    private String titleKey;

    private Title(String titleKey) {
        this.titleKey = titleKey;
    }

    @JsonValue
    public String getTitleKey() {
        return titleKey;
    }

    public String getValue() {
        return this.titleKey;
    }

    /**
     * Returns an unmodifiable list containing the literals that are known by
     * this enumeration.
     *
     * @return A List containing the actual literals defined by this
     *         enumeration, this list can not be modified.
     */
    public static List<String> literals() {
        return Title.literals;
    }

    private static List<String> literals = new ArrayList<String>(3);

    static {
        synchronized (Title.literals) {
            Title.literals.add(MR.titleKey);
            Title.literals.add(MRS.titleKey);
            Title.literals.add(MS.titleKey);
            Title.literals = Collections.unmodifiableList(literals);
        }
    }

    /**
     * Retrieves an instance of Title from <code>its titleKey</code>.
     *
     * @param text
     * @return
     */
    public static Title fromString(String text) {
        for (Title key : Title.values()) {
            if (key.titleKey.equals((text))) {
                return key;
            }
        }
        return null;
    }
}
