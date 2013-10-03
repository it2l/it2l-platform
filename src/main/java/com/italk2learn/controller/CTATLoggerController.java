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
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.vo.SpeechRecognitionResponseVO;

/**
 * Handles requests for the application speech recognition.
 */
@Controller
@RequestMapping("/ctatlogserver")
public class CTATLoggerController {
	
	private LdapUserDetailsImpl user;
	
	private static final Logger logger = LoggerFactory
			.getLogger(CTATLoggerController.class);

	private SpeechRecognitionResponseVO response= new SpeechRecognitionResponseVO();
	
	
	/*Services*/
	private ILoginUserService loginUserService;

    @Autowired
    public CTATLoggerController(ILoginUserService loginUserService) {
    	this.loginUserService=loginUserService;
    }
	
	/**
	 * Main method to get the log of CTAT exercises
	 */
	@RequestMapping(value = "/",method = RequestMethod.POST)
	public String getLog(ServletRequest req) {
		logger.info("JLF --- CTAT Exercises log");
		StringWriter outStr = new StringWriter();
        PrintWriter out = null;
        ByteArrayOutputStream baos = null;
        try {
        	ServletInputStream input=req.getInputStream();
            out = new PrintWriter(outStr);
            logger.info(req.getInputStream().toString());
            baos = readContent(req);
        } catch (Exception ex) {
        	logger.error(ex.toString());
            return "";
        }
        
        try {
//            if (logFileWriter == null)
//                throw new IllegalStateException("logFileWriter is null");
//            synchronized(this) {
//                baos.writeTo(logFileWriter);
//                logFileWriter.flush();  // or use logFileWriter.getChannel().force() ?
//            }
            out.write("status=success\n");  // mimic OLI StatusCodeLogServlet as of 2009/10/23
        } catch (Exception ex) {
        	logger.error(ex.toString());
            //fmtErrorResp(out, ex, message);
            //flushResponse(outStr, resp);  // sends response to client
            return "";
        }
        //flushResponse(outStr, resp);  // sends response to client
       
        //sendContent(baos);            // forward to DataShop after replying
		return "views/sequence";
	}
	
	/**
     * Read the entire content of the request into a buffer.
     * @param req HTTP request from client
     * @return result buffer with contents of request
     * @throws IOException
     */
    private ByteArrayOutputStream readContent(ServletRequest req)
            throws IOException{
        int reqLength = req.getContentLength();
        if (reqLength < 0)
            reqLength = 2048;  // default initial size
        ByteArrayOutputStream baos = new ByteArrayOutputStream(reqLength);
        ServletInputStream rdr = req.getInputStream();
        int c = rdr.read();
        int i, n = 0;
        for (i = 0; c >= 0; ++i) {
            if (c > 0)
                baos.write(c);
            else
                ++n;
            c = rdr.read();
        }
        //reportNulls(i, n);
        return baos;
    }
	
	public ILoginUserService getLoginUserService() {
		return loginUserService;
	}

	public void setLoginUserService(ILoginUserService loginUserService) {
		this.loginUserService = loginUserService;
	}

}
