package com.italk2learn.bo.test;

import org.apache.log4j.Logger;
import org.gienah.testing.junit.Configuration;
import org.gienah.testing.junit.SpringRunner;
import org.gienah.testing.junit.Transactional;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(value = SpringRunner.class)
@Configuration(locations = { "spring/web-application-config.xml" })
public class SendMailTest {
	private static final Logger LOGGER = Logger
			.getLogger(SendMailTest.class);
			
			@Test
			@Transactional
			public void MailTest() throws Exception{
				LOGGER.info("TESTING MailTest");
				try {
				      LOGGER.debug("Here is DEBUG");
				      LOGGER.info("Here is some INFO blah");
				      LOGGER.warn("Here is some WARN");
				      LOGGER.error("This is a test of error");
				      LOGGER.debug("italk2learn Test");
				} catch (Exception e) {
					e.printStackTrace();
					LOGGER.error(e);
				}
				Assert.assertTrue(true);
			}
			
}
