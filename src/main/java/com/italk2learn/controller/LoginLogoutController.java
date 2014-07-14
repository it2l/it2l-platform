/**
 * 
 */
package com.italk2learn.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * Handles and retrieves the login or denied page depending on the URI template
 */
@Controller
@RequestMapping("/login")
public class LoginLogoutController {
        

	/**
	 * Handles and retrieves the login page
	 * 
	 * @return the name of the page
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView getLoginPage(@RequestParam(value="error", required=false) boolean error, 
			ModelMap model) {

		// Add an error message to the model if login is unsuccessful
		// The 'error' parameter is set to true based on the when the authentication has failed. 
		// We declared this under the authentication-failure-url attribute inside the spring-security.xml
		/* See below:
		 <form-login 
				login-page="/krams/auth/login" 
				authentication-failure-url="/krams/auth/login?error=true" 
				default-target-url="/krams/main/common"/>
		 */
		ModelAndView mod=new ModelAndView();
		mod.setViewName("login");
		String err="You have entered invalid credentials or your user is already logged in the platform!";
		if (error == true) {
			// Assign an error message
			model.put("err", "You have entered invalid credentials or your user is already logged in the platform!");
			model.addAttribute(err);
		} else {
			model.put("err", "");
		}
		
		// This will resolve to /WEB-INF/jsp/loginpage.jsp
		return mod;
	}
	
	/**
	 * Handles and retrieves the denied JSP page. This is shown whenever a regular user
	 * tries to access an admin only page.
	 * 
	 * @return the name of the JSP page
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
 	public String getDeniedPage() {
		
		// This will resolve to /WEB-INF/jsp/deniedpage.jsp
		return "logoutSuccess";
	}
}