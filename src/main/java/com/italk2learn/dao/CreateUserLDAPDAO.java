package com.italk2learn.dao;

import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.BasicAttribute;
import javax.naming.directory.BasicAttributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;

import com.italk2learn.vo.UserDetailsVO;

public class CreateUserLDAPDAO {
	
	public void setNewUser(UserDetailsVO us) throws NamingException{
		
		   Hashtable<String, String> env = new Hashtable<String, String>();
           env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
           env.put(Context.PROVIDER_URL, "ldap://localhost:10389");
           env.put(Context.SECURITY_AUTHENTICATION, "simple");
           env.put(Context.SECURITY_PRINCIPAL,"uid=admin,o=system"); // specify the username
           env.put(Context.SECURITY_CREDENTIALS,"Anathema80");// specify the password
           // TODO code application logic here  

           // entry's DN 
		   String entryDN = "uid=+"+ us.getUser()+",ou=users,o=italk2learn";  
		
		   // entry's attributes  
		
		   Attribute cn = new BasicAttribute("cn", us.getName());  
		   Attribute sn = new BasicAttribute("sn", us.getName());  
		   //Attribute mail = new BasicAttribute("mail", "newuser@foo.com");  
		   //Attribute phone = new BasicAttribute("telephoneNumber", "+1 222 3334444");
		   Attribute up = new BasicAttribute("userPassword", us.getPassword());
//		   matchAttrs.put(new BasicAttribute("userPassword", diggest("MD5",t.getPassword())));                
//           		getConnection().createSubcontext("uid="+t.getCommonId()+","+userContext,matchAttrs);
		   Attribute oc = new BasicAttribute("objectClass");  
		   oc.add("top");  
		   oc.add("person");  
		   oc.add("organizationalPerson");  
		   oc.add("inetOrgPerson");  
		   DirContext ctx = null;  
		
		   try {  
		       // get a handle to an Initial DirContext  
		       ctx = new InitialDirContext(env);  
		
		       // build the entry  
		       BasicAttributes entry = new BasicAttributes();  
		       entry.put(cn);  
		       entry.put(sn);
		       entry.put(up);
		       //entry.put(mail);  
		       //entry.put(phone);  
		
		       entry.put(oc);  
		
		       // Add the entry  
		
		       ctx.createSubcontext(entryDN, entry);  
		       //System.out.println( "AddUser: added entry " + entryDN + ".");  
		
		   } catch (NamingException e) {  
		       System.err.println("AddUser: error adding entry." + e);  
		   }
	}
	
//	private String digest(String algorithm,String password) throws NoSuchAlgorithmException {
//        String r = null;
//        byte [] b = null;
//        MessageDigest md = MessageDigest.getInstance(algorithm);
//        BASE64Encoder encoder;
//
//        md.update(password.getBytes());
//        b = md.digest();
//
//        encoder = new BASE64Encoder();
//
//        System.out.println(encoder.encode(b));
//
//        r = encoder.encode(b);
//
//        return r;
//    }
	
}
