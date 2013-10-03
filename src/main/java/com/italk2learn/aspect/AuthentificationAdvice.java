package com.italk2learn.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;

import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.ErrorVO;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.RequestVO;
import com.italk2learn.vo.ResponseVO;

/**
 * Aspect to manage authentication at business level.  
 * 
 * @author José Luis Fernández
 * @version 1.0
 */
@Aspect
@Order(2)
public class AuthentificationAdvice {

	
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthentificationAdvice.class);


	private ILoginUserService loginUserService;

	@Around("within(com.italk2learn.bo.*BO)")
	@Order(2)
	public final Object loginInterceptor(ProceedingJoinPoint pjp)
	throws InstantiationException, IllegalAccessException {
		LOGGER.info("ErrorManagementAdvice errorManager...");

		final MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
		ResponseVO responseVO = (ResponseVO) methodSignature.getReturnType().newInstance();

		HeaderVO headerVO = null;
		Object obj = null;

		try {
			final Object[] args = pjp.getArgs();
			final RequestVO request = (RequestVO) args[0];
			headerVO = request.getHeaderVO();

			//Validating that user exist and it fills headerVO with idUser and loginUser
			if (getLoginUserService().getLoginUserInfo(headerVO)== true){
				responseVO = (ResponseVO) pjp.proceed();
			}
			responseVO.setErrorVO(new ErrorVO());
			responseVO.setHeaderVO(headerVO);

		} catch (ITalk2LearnException pbe) {
			LOGGER.error("ITalk2LearnException ", pbe);
			responseVO.setErrorVO(new ErrorVO());
		} catch (Exception e) {
			LOGGER.error("Exception ", e);
			responseVO.setErrorVO(new ErrorVO());
		} catch (Throwable e) {
			LOGGER.error("Throwable ", e);
			responseVO.setErrorVO(new ErrorVO());
		}
		return responseVO;
	}

	public ILoginUserService getLoginUserService() {
		return loginUserService;
	}

	public void setLoginUserService(ILoginUserService loginUserService) {
		this.loginUserService = loginUserService;
	}

}
