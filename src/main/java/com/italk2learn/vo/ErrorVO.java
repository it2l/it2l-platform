package com.italk2learn.vo;

import java.util.Date;

/**
 * Class Value Object with application errors
 * 
 * @author Jose Luis Fernandez
 * @version 1.0
 */
public class ErrorVO extends BaseVO {
	public ErrorVO() {
		super();
	}
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Fecha en la que ocurrió el error.
	 */
	private Date errorTimeStamp;
	
	/**
	 * Código de error.
	 */
	private String errorCode;
	
	/**
	 * Descripción del error.
	 */
	private String errorDesc;
	
	public Date getErrorTimeStamp() {
		return errorTimeStamp;
	}
	public void setErrorTimeStamp(Date errorTimeStamp) {
		this.errorTimeStamp = errorTimeStamp;
	}
	public String getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
	public String getErrorDesc() {
		return errorDesc;
	}
	public void setErrorDesc(String errorDesc) {
		this.errorDesc = errorDesc;
	}
	



}
