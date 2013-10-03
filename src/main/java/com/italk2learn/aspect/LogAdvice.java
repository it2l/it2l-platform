package com.italk2learn.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;

/**
 * Aspect to generate input/output logs of services and daos
 * BO's.
 * 
 * @author Jose Luis Fernandez
 * @version 1.0
 */
@Aspect
@Order(1)
public class LogAdvice {
	/**
	 * Log4j.
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(LogAdvice.class);
	

	/**
	 * 
	 * @param pjp
	 *            ProceedingJoinPoint
	 * @return Object
	 * @throws Throwable
	 *             e
	 */
	@Around("(within(com.italk2learn.dao.*DAO)"
			+ "||within(com.italk2learn.bo.*Service)"
			+ "||within(com.italk2learn.*..bo.*Service)"
			+ "||within(com.italk2learn.dao.*DAO*))"
			+ "||within(com.italk2learn.common.ws.*.*Client)")
			/***/
			// +
			// "&&!within(com.ferrovial.phoenix.configuration.bo.ConfigurationBO)"
			// +
			// "&&!within(com.ferrovial.phoenix.configuration.bo.ConfigurationService)"
			/***/
			//+ "&&!within(com.ferrovial.phoenix.common.bo.ErrorManagerBO)")
	@Order(1)
	public final Object logMethodInvocation(ProceedingJoinPoint pjp) throws Throwable {

		final Signature sig = pjp.getSignature();
		LOGGER.debug("Executing......" + sig.getDeclaringType().getName() + " - " + sig.getName());
		for (Object arg : pjp.getArgs()) {
			if (arg != null) {
				LOGGER.debug(arg != null ? "\t-->" + arg.getClass().getName() + " - "
						+ arg.toString() : "null");
			}
		}
		Object obj = null;
		try {
			obj = pjp.proceed();
			return obj;
		} finally {
			LOGGER.debug("Finishing......... " + sig.getDeclaringType().getName() + " - "
					+ sig.getName());
			LOGGER.debug(obj != null ? "\t-->" + obj.getClass().getName() + " - " + obj.toString()
					: "null");
		}
	}
}
