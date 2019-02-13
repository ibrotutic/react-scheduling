package com.booking309.bookingapp309.objects;

public class Response {
    private final int respCode;

    public Response(int respCode) {
        this.respCode = respCode;
    }

    public int getRespCode() {
        return respCode;
    }
}
