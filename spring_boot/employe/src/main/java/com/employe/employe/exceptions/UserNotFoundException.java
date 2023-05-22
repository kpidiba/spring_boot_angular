package com.employe.employe.exceptions;

public class UserNotFoundException  extends RuntimeException{
    public UserNotFoundException(String s){
        super(s);
    }
}
