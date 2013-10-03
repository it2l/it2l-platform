package com.italk2learn.util;

import java.util.ArrayList;
import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.util.PropertyPlaceholderHelper;

public class Italk2learnAuthenticationProvider implements AuthenticationProvider {

	private String t3Dir;
	
	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException {

		Hashtable<Object, Object> env = new Hashtable<Object, Object>();
		env.put(Context.INITIAL_CONTEXT_FACTORY,
				"weblogic.jndi.WLInitialContextFactory");
		env.put(Context.PROVIDER_URL, t3Dir);
		env.put(Context.SECURITY_PRINCIPAL, authentication.getName());
		env.put(Context.SECURITY_CREDENTIALS, authentication.getCredentials()
				.toString());
		Context ctx;
		
		try {
			ctx = new InitialContext(env);

			User user = new User(authentication.getName(), authentication
					.getCredentials().toString(), true, true, true, true,
					authentication.getAuthorities());
			ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			authorities.add(new GrantedAuthorityImpl("ROLE_ADMIN"));

			return new UsernamePasswordAuthenticationToken(user, authentication
					.getCredentials(), authorities);
		} catch (NamingException e) {
			throw new BadCredentialsException("Login or password incorrect");
		}
	}

	@Override
	public boolean supports(Class<? extends Object> authentication) {
		if (authentication
				.isAssignableFrom(UsernamePasswordAuthenticationToken.class)) {
			return true;
		} else {
			return false;
		}
	}
	
	public String getT3Dir()
	{
		return this.t3Dir;
	}
	
	public void setT3Dir(String t3Dir)
	{
		this.t3Dir = t3Dir;
	}
}
