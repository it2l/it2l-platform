package com.italk2learn.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletInputStream;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.italk2learn.bo.inter.ICTATExerciseBO;
import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.vo.CTATRequestVO;
import com.italk2learn.vo.HeaderVO;

/**
 * Handles requests for the application speech recognition.
 */
@Controller
@RequestMapping("/ctatlogserver")
public class CTATLoggerController {
	
	private LdapUserDetailsImpl user;
	
	private static final Logger logger = LoggerFactory
			.getLogger(CTATLoggerController.class);

	private boolean assesment=false;
	private boolean result=false;
	
	/*Services*/
	private ICTATExerciseBO exerciseCTATService;
	private ILoginUserService loginUserService;

    @Autowired
    public CTATLoggerController(ILoginUserService loginUserService, ICTATExerciseBO exerciseCTATService ) {
    	this.exerciseCTATService=exerciseCTATService;
    	this.loginUserService=loginUserService;
    }
	
	/**
	 * Main method to get the log of CTAT exercises
	 */
	@RequestMapping(value = "/",method = RequestMethod.POST,  headers = "Accept=application/xml, application/json")
	public void setLogCTAT(@RequestBody String body, HttpServletRequest req) {
		logger.info("JLF --- CTAT setLogCTAT log");
		user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		CTATRequestVO request=new CTATRequestVO();
        try {
        	if (body!=null){
        		assesment=body.contains("TUTOR_ACTION+RESULT");
        		if (assesment==true)
        			result=body.contains("Correct");
        	}
        	request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(user.getUsername());
			request.setIdExercise(getLoginUserService().getIdExersiceUser(request.getHeaderVO()));
			request.setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
            request.setLog(body);
            getExerciseCTATService().storageLog(request);
        } catch (Exception ex) {
        	logger.error(ex.toString());
        }
	}
	
	/**
	 * JLF: Get user connected
	 */
	@RequestMapping(value = "/getResult",method = RequestMethod.GET)
	@ResponseBody
	public boolean getResult(Model model) {
		logger.info("JLF --- CTATLoggerController.getResult");
		user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return assesment;
	}
	
	public ILoginUserService getLoginUserService() {
		return loginUserService;
	}

	public void setLoginUserService(ILoginUserService loginUserService) {
		this.loginUserService = loginUserService;
	}

	public ICTATExerciseBO getExerciseCTATService() {
		return exerciseCTATService;
	}

	public void setExerciseCTATService(ICTATExerciseBO exerciseCTATService) {
		this.exerciseCTATService = exerciseCTATService;
	}

}
