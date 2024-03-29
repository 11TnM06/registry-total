package com.bezkoder.springjwt.respone_state;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeneralResponse<T> {

  private static final long serialVersionUID = 1L;
  private GeneralResponseStatus status;
  private T data;
}

