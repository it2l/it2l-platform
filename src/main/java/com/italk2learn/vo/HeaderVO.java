package com.italk2learn.vo;

/**
 * Clase Value Object whith header info.
 * 
 * @author Jose Luis Fernandez
 * @version 1.0
 */
public class HeaderVO extends BaseVO {
	public HeaderVO() {
		super();
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Identificador del idioma (ES, EN, PL...).
	 */
	private String idLanguage;

	/**
	 * ID del usuario que invoca el servicio.
	 */
	private Integer idUser;

	/**
	 * Login/expediente del usuario que invoca el servicio.
	 */
	private String loginUser;


	public String getIdLanguage() {
		return idLanguage;
	}

	public void setIdLanguage(String idLanguage) {
		this.idLanguage = idLanguage;
	}

	public Integer getIdUser() {
		return idUser;
	}

	public void setIdUser(Integer idUser) {
		this.idUser = idUser;
	}

	public String getLoginUser() {
		return loginUser;
	}

	public void setLoginUser(String loginUser) {
		this.loginUser = loginUser;
	}

}
