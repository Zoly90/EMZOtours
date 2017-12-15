package ro.emzo.turismapp.user.service;

import com.fasterxml.jackson.annotation.JsonValue;
import ro.emzo.turismapp.user.model.Title;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by E5570_2 on 2017-06-30.
 */

public enum Role {

    CLIENT("role.client"), EMPLOYEE("role.employee"), ADMIN("role.admin");

    private String roleKey;

    private Role(String roleKey) {
        this.roleKey = roleKey;
    }

    @JsonValue
    public String getRoleKey() {
        return roleKey;
    }

    public String getValue() {
        return this.roleKey;
    }

    /**
     * Returns an unmodifiable list containing the literals that are known by
     * this enumeration.
     *
     * @return A List containing the actual literals defined by this
     *         enumeration, this list can not be modified.
     */
    public static List<String> literals() {
        return Role.literals;
    }

    private static List<String> literals = new ArrayList<String>(3);

    static {
        synchronized (Role.literals) {
            Role.literals.add(CLIENT.roleKey);
            Role.literals.add(EMPLOYEE.roleKey);
            Role.literals.add(ADMIN.roleKey);
            Role.literals = Collections.unmodifiableList(literals);
        }
    }

    /**
     * Retrieves an instance of Title from <code>its titleKey</code>.
     *
     * @param text
     * @return
     */
    public static Role fromString(String text) {
        for (Role key : Role.values()) {
            if (key.roleKey.equals((text))) {
                return key;
            }
        }
        return null;
    }
}
