package com.bezkoder.springjwt.respone_state;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GeneralResponseStatus implements Serializable {

  @Serial
  private static final long serialVersionUID = 1216664062736095390L;

  private String code;

  private String message;

  public GeneralResponseStatus(ResponseStatusEnum responseStatusEnum) {
    this.code = responseStatusEnum.getCode();
    this.message = responseStatusEnum.getMessage();
  }
}