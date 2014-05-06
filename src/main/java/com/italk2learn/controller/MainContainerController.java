/**
 * 
 */
package com.italk2learn.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles and retrieves the login or denied page depending on the URI template
 */
@Controller
@RequestMapping("/exercise")
public class MainContainerController {
       
	private LdapUserDetailsImpl user;
	
	private static final Logger logger = LoggerFactory
			.getLogger(MainContainerController.class);

	/**
	 * Handles and retrieves the login page
	 * 
	 * @return the name of the page
	 */
	@RequestMapping(value = "",method = RequestMethod.GET)
	public String initMainContainer(Model model) {

		logger.info("JLF --- Main Container Init");
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			return "exercise";
		} catch (Exception e){
			logger.error(e.toString());
			return "redirect:/login";
		}
	}
	
}
