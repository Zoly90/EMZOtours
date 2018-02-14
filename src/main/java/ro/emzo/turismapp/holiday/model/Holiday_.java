package ro.emzo.turismapp.holiday.model;

import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * Created by E5570_2 on 2018-02-14.
 */
@StaticMetamodel(Holiday.class)
public class Holiday_ {

    public static volatile SingularAttribute<Holiday, Long> id;
    public static volatile SetAttribute<Holiday, HolidayTypes> holidayTypes;

}
