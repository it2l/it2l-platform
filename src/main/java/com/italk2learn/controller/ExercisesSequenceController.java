package com.italk2learn.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.italk2learn.bo.inter.IExerciseSequenceBO;
import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseSequenceResponseVO;
import com.italk2learn.vo.HeaderVO;

/**
 * Handles requests for the application exercise sequence.
 */
@Controller
@RequestMapping("/sequence")
public class ExercisesSequenceController {
	
	
	private LdapUserDetailsImpl user;
	
	private ExerciseSequenceRequestVO request;
	
	private int exerciseCounter=0;

	private static final Logger logger = LoggerFactory
			.getLogger(ExercisesSequenceController.class);

	private static ExerciseSequenceResponseVO response= new ExerciseSequenceResponseVO();
	
	
	/*Services*/
	private IExerciseSequenceBO exerciseSequenceService;
	private ILoginUserService loginUserService;

    @Autowired
    public ExercisesSequenceController(IExerciseSequenceBO exerciseSequence, ILoginUserService loginUserService) {
    	this.exerciseSequenceService = exerciseSequence;
    	this.loginUserService=loginUserService;
    }
	
	/**
	 * 
	 */
	@RequestMapping(value = "/",method = RequestMethod.GET)
	public String initSequence(Model model) {
		logger.info("JLF --- ExerciseSequence Main Controller");
		user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		request= new ExerciseSequenceRequestVO();
		request.setHeaderVO(new HeaderVO());
		request.getHeaderVO().setLoginUser(user.getUsername());
		try {
			request.setIdUser(getLoginUserService().getIdUserInfoUserInfo(request.getHeaderVO()));
			response=((ExerciseSequenceResponseVO) getExerciseSequenceService().getExerciseSequence(request));
		} catch (Exception e){
			logger.error(e.toString());
		}
		model.addAttribute(response);
		return "views/sequence";
	}

	
	@RequestMapping(value = "/nextsequence", method = RequestMethod.GET)
    public ModelAndView getNextSequence(){
		logger.info("JLF --- getNextSequence()");
		ModelAndView modelAndView = new ModelAndView();
		try{
			if (exerciseCounter<=response.getResponse().size()-1){
				logger.info(response.getResponse().get(exerciseCounter).getExercise());
				modelAndView.setViewName("views/"+response.getResponse().get(exerciseCounter).getExercise());
				exerciseCounter++;
//				if (response.getResponse().get(exerciseCounter).getExercise().equalsIgnoreCase("FractionsTutor")) {
//					modelAndView.addObject("FlashVars", "question_file=1416.brd&BehaviorRecorderMode=AuthorTimeTutoring&remoteSocketURL=localhost&remoteSocketPort=1502&Logging=None&log_service_url=http://pslc-qa.andrew.cmu.edu/log/serverXXX&dataset_name=CTAT_Example_Dataset&dataset_level_name1=Unit1&dataset_level_type1=unit&dataset_level_name2=Section1&dataset_level_type2=section&problem_name=CTAT_Example_Problem&user_guid=CTAT_Example_User&session_id=CTAT_Example_Session2&source_id=PACT_CTAT_FLASH&DeliverUsingOLI=false");
//					return modelAndView;
//				}
				return modelAndView;
			// JLF: Entry at this point when is necessary to start the sequence
			} else {
				exerciseCounter=0;
				modelAndView.setViewName("intro");
				return modelAndView;
			}
		}
		catch (Exception e){
			return new ModelAndView();
		}
    }

	public IExerciseSequenceBO getExerciseSequenceService() {
		return exerciseSequenceService;
	}

	public void setExerciseSequenceService(IExerciseSequenceBO exerciseSequenceService) {
		this.exerciseSequenceService = exerciseSequenceService;
	}


	public static ExerciseSequenceResponseVO getResponse() {
		return response;
	}


	public static void setResponse(ExerciseSequenceResponseVO response) {
		ExercisesSequenceController.response = response;
	}


	public ILoginUserService getLoginUserService() {
		return loginUserService;
	}


	public void setLoginUserService(ILoginUserService loginUserService) {
		this.loginUserService = loginUserService;
	}

}
