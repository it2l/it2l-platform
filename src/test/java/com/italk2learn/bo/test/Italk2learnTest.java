package com.italk2learn.bo.test;

import org.apache.log4j.Logger;
import org.gienah.testing.junit.Configuration;
import org.gienah.testing.junit.Dependency;
import org.gienah.testing.junit.SpringRunner;
import org.gienah.testing.junit.Transactional;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.italk2learn.bo.inter.IExerciseSequenceBO;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseSequenceResponseVO;
import com.italk2learn.vo.HeaderVO;

@RunWith(value = SpringRunner.class)
@Configuration(locations = { "spring/web-application-config.xml" })
public class Italk2learnTest {
	
	private static final Logger LOGGER = Logger
	.getLogger(Italk2learnTest.class);
	
	@Dependency
	private IExerciseSequenceBO exerciseSequenceService;

	@Test
	@Transactional
	public void testGetInitialParameters() throws Exception{
		LOGGER.info("TESTING testGetInitialParameters");
		ExerciseSequenceRequestVO request= new ExerciseSequenceRequestVO();
		request.setIdUser(1);
		//request.setHeaderVO(CheckConstants.HEADER_ES);
		boolean testOk = false;
		request.setHeaderVO(new HeaderVO());
		request.getHeaderVO().setLoginUser("jkeats");
		try {
			final ExerciseSequenceResponseVO response = this.exerciseSequenceService.getExerciseSequence(request);
			if (response.getResponse().size() > 0) {
				testOk = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
		}
		Assert.assertTrue(testOk);
		//Assert.assertTrue(true);
	}

	public IExerciseSequenceBO getExerciseSequenceService() {
		return exerciseSequenceService;
	}

	public void setExerciseSequenceService(
			IExerciseSequenceBO exerciseSequenceService) {
		this.exerciseSequenceService = exerciseSequenceService;
	}

}
