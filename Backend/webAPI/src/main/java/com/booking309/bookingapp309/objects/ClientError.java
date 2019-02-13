package com.booking309.bookingapp309.objects;

public class ClientError extends com.booking309.bookingapp309.objects.Response {
    private final String message;

    public ClientError(int respCode, String message) {
        super(respCode);

        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
