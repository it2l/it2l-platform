package com.italk2learn.util;


import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.italk2learn.bo.inter.ISpeechRecognitionBO;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.SpeechRecognitionRequestVO;
 
public class SessionCounterListener implements HttpSessionListener {
 
	  private static int totalActiveSessions;
	  
	  private static final Logger logger = LoggerFactory
				.getLogger(SessionCounterListener.class);
	  
	  private LdapUserDetailsImpl user;
	 
	  public static int getTotalActiveSession(){
		return totalActiveSessions;
	  }
 
	  @Override
	  public void sessionCreated(HttpSessionEvent arg0) {
		  try {
			  	totalActiveSessions++;
				logger.info("sessionCreated - add one session into counter: "+totalActiveSessions);
				System.out.println("sessionCreated - add one session into counter");
		  } catch (Exception e){
				logger.error(e.toString());
		  }
	   }
 
	  @Override
	  public void sessionDestroyed(HttpSessionEvent arg0) {
		  try {
				totalActiveSessions--;
				if (SecurityContextHolder.getContext().getAuthentication()!=null)
					user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
				//logger.info("sessionDestroyed - deduct one session from counter: "+totalActiveSessions+"\n User: "+user.getUsername());
				System.out.println("sessionDestroyed - deduct one session from counter");
				closeASRListener(arg0);
		  } catch (Exception e){
				logger.error(e.toString());
		  }
	  }
	  
	  private void closeASRListener(HttpSessionEvent sessionEvent){
		  
		  HttpSession session = sessionEvent.getSession();
		  ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(session.getServletContext());
		  ISpeechRecognitionBO closeListener = (ISpeechRecognitionBO) ctx.getBean("speechRecognitionBO");
		  SpeechRecognitionRequestVO request= new SpeechRecognitionRequestVO();
		  request.setHeaderVO(new HeaderVO());
		  try {
			  	if (user!=null) {
			  		request.getHeaderVO().setLoginUser(user.getUsername());
			  		closeListener.closeASREngine(request);
			  	}
		  } catch (Exception e){
				logger.error(e.toString());
		  }
	  }
}