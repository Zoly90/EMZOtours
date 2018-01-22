package ro.emzo.turismapp.holiday.model;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by E5570_2 on 2018-01-13.
 */
public enum FoodBoard {

    BREAKFAST("boardType.breakfast"), HALF_BOARD("boardType.halfBoard"), FULL_BOARD("boardType.fullBoard");

    private String foodBoardKey;

    private FoodBoard(String statusKey) {
        this.foodBoardKey = statusKey;
    }

    @JsonValue
    public String getFoodBoardKey() {
        return foodBoardKey;
    }

    public String getValue() {
        return this.foodBoardKey;
    }

    /**
     * Returns an unmodifiable list containing the literals that are known by
     * this enumeration.
     *
     * @return A List containing the actual literals defined by this
     *         enumeration, this list can not be modified.
     */
    public static List<String> literals() {
        return FoodBoard.literals;
    }

    private static List<String> literals = new ArrayList<String>(3);

    static {
        synchronized (FoodBoard.literals) {
            FoodBoard.literals.add(BREAKFAST.foodBoardKey);
            FoodBoard.literals.add(HALF_BOARD.foodBoardKey);
            FoodBoard.literals.add(FULL_BOARD.foodBoardKey);
            FoodBoard.literals = Collections.unmodifiableList(literals);
        }
    }

    /**
     * Retrieves an instance of Title from <code>its titleKey</code>.
     *
     * @param text
     * @return
     */
    public static FoodBoard fromString(String text) {
        for (FoodBoard key : FoodBoard.values()) {
            if (key.foodBoardKey.equals((text))) {
                return key;
            }
        }
        return null;
    }
}
