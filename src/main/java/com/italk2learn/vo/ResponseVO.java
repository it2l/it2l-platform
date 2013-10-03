package com.italk2learn.vo;



/**
 * Clase Value Object response to client side
 * 
 * @author Jose Luis Fernandez
 * @version 1.0
 */
public class ResponseVO extends BaseVO {
	public ResponseVO() {
		super();
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected HeaderVO headerVO;
	protected ErrorVO errorVO;

	public HeaderVO getHeaderVO() {
		return headerVO;
	}

	public void setHeaderVO(HeaderVO headerVO) {
		this.headerVO = headerVO;
	}

	public ErrorVO getErrorVO() {
		return errorVO;
	}

	public void setErrorVO(ErrorVO errorVO) {
		this.errorVO = errorVO;
	}

}
