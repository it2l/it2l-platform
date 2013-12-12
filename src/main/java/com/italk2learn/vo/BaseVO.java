package com.italk2learn.vo;

import java.io.Serializable;
import java.lang.reflect.Method;

/**
 * 
 * @author Jose Luis Fernandez
 * 
 */
public class BaseVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Overrides toString method for VO's.
	 * 
	 * @author Jose Luis Fernandez
	 * @return String
	 */
	public String toString() {
		final StringBuffer result = new StringBuffer();
		boolean comma = false;
		result.append("\n[");
		for (Method method : this.getClass().getMethods()) {
			final String methodName = method.getName();
			if ((methodName.startsWith("get") || methodName.startsWith("is")) && !methodName.startsWith("getClass")) {
				result.append(comma ? ", " : "");
				comma = true;
				result.append(methodName.startsWith("is") ? methodName.substring(2) : methodName.substring(3));
				result.append(":");
				try {
					final Object obj = method.invoke(this, null);
					result.append(obj != null ? obj : "null");
				} catch (Exception e) {
					result.append("null(E)");
				}
			}
		}
		result.append("]");
		return result.toString();
	}
}
