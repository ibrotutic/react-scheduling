package com.booking309.bookingapp309.notifications;

import java.util.HashMap;
import java.util.Map;

public class NotificationTypesMap {
    public static final Map<NotificationType, String> myMap;

    static {
        Map<NotificationType, String> aMap = new HashMap<>();
        aMap.put(NotificationType.CREATE_APPOINTMENT, "CREATE_APPOINTMENT");
        aMap.put(NotificationType.ADD_EMPLOYEE, "ADD_EMPLOYEE");
        aMap.put(NotificationType.CANCEL_APPOINTMENT, "CANCEL_APPOINTMENT");
        aMap.put(NotificationType.REMOVE_EMPLOYEE, "REMOVE_EMPLOYEE");
        myMap = aMap;
    }
}