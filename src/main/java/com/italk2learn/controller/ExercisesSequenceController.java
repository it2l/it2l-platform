package com.italk2learn.controller;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import MFSeq.DBManagment;
import MFSeq.Sequencer;

import com.italk2learn.bo.inter.IExerciseSequenceBO;
import com.italk2learn.bo.inter.IFractionsLabBO;
import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.bo.inter.IWhizzExerciseBO;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseSequenceResponseVO;
import com.italk2learn.vo.ExerciseVO;
import com.italk2learn.vo.FractionsLabRequestVO;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.WhizzExerciseVO;
import com.italk2learn.vo.WhizzRequestVO;

/**
 * Handles requests for the application exercise sequence.
 */
@Controller
@Scope("session")
@RequestMapping("/sequence")
public class ExercisesSequenceController implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	 private static String _RANDOMTEST = "testr";
	
	private LdapUserDetailsImpl user;
	
	private String username;
	
	private ExerciseSequenceRequestVO request;
	
	private static final Logger logger = LoggerFactory
			.getLogger(ExercisesSequenceController.class);

	private static ExerciseSequenceResponseVO response= new ExerciseSequenceResponseVO();
	
	
	/*Services*/
	private IExerciseSequenceBO exerciseSequenceService;
	private ILoginUserService loginUserService;
	private IWhizzExerciseBO whizzExerciseBO;
	private IFractionsLabBO fractionsLabBO;


    @Autowired
    public ExercisesSequenceController(IExerciseSequenceBO exerciseSequence, ILoginUserService loginUserService, IWhizzExerciseBO whizzExerciseBO, IFractionsLabBO fractionsLabBO) {
    	this.exerciseSequenceService = exerciseSequence;
    	this.loginUserService=loginUserService;
    	this.setWhizzExerciseBO(whizzExerciseBO);
    	this.setFractionsLabBO(fractionsLabBO);
    }
	
	/**
	 * Initial method to get first exercise of sequence
	 */
	@RequestMapping(value = "/",method = RequestMethod.GET)
	public String initSequence(Model model) {
		logger.info("JLF --- ExerciseSequence Main Controller");
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			setUsername(user.getUsername());
			request= new ExerciseSequenceRequestVO();
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(this.getUsername());
			request.setIdExercise(getLoginUserService().getIdExersiceUser(request.getHeaderVO()));
			request.setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
			response=((ExerciseSequenceResponseVO) getExerciseSequenceService().getFirstExercise(request));
		} catch (Exception e){
			logger.error(e.toString());
			return "redirect:/login";
		}
		ExerciseVO ex=new ExerciseVO();
		ex.setIdExercise(0);
		model.addAttribute("messageInfo", ex);
		model.addAttribute(response);
		return  response.getExercise().getView()+"/"+ response.getExercise().getExercise();
	}
	
	/**
	 * JLF: Get user connected
	 */
	@RequestMapping(value = "/getUser",method = RequestMethod.GET, produces="text/plain")
	@ResponseBody
	public String getUserConnected(Model model) {
		logger.info("JLF --- ExercisesSequence.getUserConnected");
		user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return user.getUsername();
	}
	
	/**
	 * JLF: Get user connected
	 */
	@RequestMapping(value = "/getCondition",method = RequestMethod.GET, produces="text/plain")
	@ResponseBody
	public Integer getCondition(Model model) {
		logger.info("JLF --- ExercisesSequence.getCondition");
		ExerciseSequenceRequestVO request= new ExerciseSequenceRequestVO();
		request.setHeaderVO(new HeaderVO());
		request.getHeaderVO().setLoginUser(user.getUsername());
		try{
			return getLoginUserService().getCondition(request.getHeaderVO());
		}
		catch (Exception e){
			logger.error(e.toString());
		}
		return null;
	}

	
	/**
	 * Get next exercise of a given sequence
	 */
	@RequestMapping(value = "/nextexercise", method = RequestMethod.GET)
    public ModelAndView getNextExercise(@Valid @ModelAttribute("messageInfo") ExerciseVO messageForm){
		logger.info("JLF --- getNextExercise()"+"User: "+this.getUsername());
		ModelAndView modelAndView = new ModelAndView();
		ExerciseSequenceRequestVO request= new ExerciseSequenceRequestVO();
		try{
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(user.getUsername());
			request.setIdExercise(getLoginUserService().getIdExersiceUser(request.getHeaderVO()));
			if (user.getUsername().startsWith(_RANDOMTEST)){
				request.setIdExercise(getRandomExercise(user.getUsername()));
				ExerciseVO response=getExerciseSequenceService().getSpecificExercise(request).getExercise();
				request.setIdExercise(response.getIdExercise());
				modelAndView.setViewName(response.getView()+"/"+ response.getExercise());
				return modelAndView;
			}
			else {
				switch (getLoginUserService().getCondition(request.getHeaderVO())) {
					case 1:	return getStateMachineSequencerExercise(request);
					case 2:	return getStateMachineSequencerExercise(request);
					case 3:	return getStateMachineSequencerExercise(request);
					case 4:	return getVygotskyPolicySequencerExercise(request);
					default: return getStateMachineSequencerExercise(request);
				}
			}
		}
		catch (Exception e){
			modelAndView.setViewName("redirect:/login");
			return new ModelAndView();
		}
	}
	
	private ModelAndView getStateMachineSequencerExercise(ExerciseSequenceRequestVO request){
		
		ModelAndView modelAndView = new ModelAndView();
		try{
			request.setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
			ExerciseVO response=getExerciseSequenceService().getNextExercise(request).getExercise();
			request.setIdExercise(response.getIdExercise());
			getExerciseSequenceService().insertCurrentExercise(request);
			modelAndView.setViewName(response.getView()+"/"+ response.getExercise());
			modelAndView.addObject("messageInfo", response);
			return modelAndView;
		}
		catch (Exception e){
			modelAndView.setViewName("redirect:/login");
			return new ModelAndView();
		}
	}
	
	private ModelAndView getVygotskyPolicySequencerExercise(ExerciseSequenceRequestVO request){
		ModelAndView modelAndView = new ModelAndView();
		DBManagment manag = new DBManagment();
//		GregorianCalendar c = new GregorianCalendar();
//		c.setTime(new Date());
		Date date= new Date();
		Timestamp timestamp= new Timestamp(date.getTime());
		//JLF: Hardcoded
		int studentId = 22516;
		int prevStudentScore = 95;
		String prevLessonId = "GB0875AAx0100";
		String whizzLessonSuggestion = "GB0900CAx0200";
		//JLF: End Hardcoded
		try {
			prevLessonId = getLoginUserService().getIdExersiceSequenceUser(request.getHeaderVO()).toString();
			studentId = getLoginUserService().getIdUserInfo(request.getHeaderVO());
			String ID= Sequencer.next(studentId, prevLessonId, prevStudentScore, timestamp, whizzLessonSuggestion);
			request.setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
			request.setIdVPSExercise(ID);
			getExerciseSequenceService().insertCurrentVPSExercise(request);
			ExerciseVO response=getExerciseSequenceService().getWholeViewFromIDSequencer(request).getExercise();
			modelAndView.setViewName(response.getView()+"/"+ response.getExercise());
			return modelAndView;
		}
		catch (Exception e){
			modelAndView.setViewName("redirect:/login");
			return new ModelAndView();
		}
		
	}
	private int getRandomExercise(String user){
		if (user.startsWith("testrw")){ //Random whizz
			return randomWithRange(4,8);
		} else if (user.startsWith("testrft")){ //Random fractions tutor
			return randomWithRange(13,28);
		} else if (user.startsWith("testrflai")){ //Ramdon fractions lab with AI
			return randomWithRange(94,95);
		} else if (user.startsWith("testrfl")){ //Ramdon fractions lab
				return randomWithRange(56,60);
		} else{ //Normal ramdon
			return randomWithRange(1,95);
		}
	}
	
	int randomWithRange(int min, int max)
	{
	   int range = (max - min) + 1;     
	   return (int)(Math.random() * range) + min;
	}
	
	/**
	 * Get back exercise of a given sequence
	 */
	@RequestMapping(value = "/backexercise", method = RequestMethod.GET)
    public ModelAndView getBackExercise(@Valid @ModelAttribute("messageInfo") ExerciseVO messageForm){
		logger.info("JLF --- getBackExercise()"+"User: "+this.getUsername());
		ModelAndView modelAndView = new ModelAndView();
		ExerciseSequenceRequestVO request= new ExerciseSequenceRequestVO();
		try{
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(this.getUsername());
			request.setIdExercise(getLoginUserService().getIdExersiceUser(request.getHeaderVO()));
			request.setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
			ExerciseVO response=getExerciseSequenceService().getBackExercise(request).getExercise();
			request.setIdExercise(response.getIdExercise());
			getExerciseSequenceService().insertCurrentExercise(request);
			modelAndView.setViewName(response.getView()+"/"+ response.getExercise());
			modelAndView.addObject("messageInfo", response);
			return modelAndView;
		}
		catch (Exception e){
			modelAndView.setViewName("redirect:/login");
			return new ModelAndView();
		}
	}
	
	/**
	 * JLF: Controller to store Whizz Data
	 */
	@RequestMapping(value = "/storeWhizzData", method = RequestMethod.POST)
    public @ResponseBody void storeWhizzData(@RequestBody WhizzExerciseVO exercise, HttpServletRequest req){
		logger.info("JLF --- Whizz storeWhizzData log"+"User: "+this.getUsername());
		WhizzRequestVO request=new WhizzRequestVO();
        try {
        	user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        	request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(this.getUsername());
			request.setIdExercise(getLoginUserService().getIdExersiceUser(request.getHeaderVO()));
			request.setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
            request.setWhizz(exercise);
            getWhizzExerciseBO().storeWhizzInfo(request);
        } catch (Exception ex) {
        	logger.error(ex.toString());
        }
	}
	
	/**
	 * If session is invalidated return to the login page
	 */
	@RequestMapping(value = "/redirectLogin",method = RequestMethod.GET)
	public String redirectLogin() {
		logger.info("JLF --- redirectLogin");
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		} catch (Exception e){
			logger.error(e.toString());
			return "redirect:/login";
		}
		return null;
	}
	
	/**
	 * JLF: Controller to store a fractions lab event
	 */
	@RequestMapping(value = "/saveFLEvent", method = RequestMethod.POST)
    public @ResponseBody void saveFractionsLabEvent(@RequestBody FractionsLabRequestVO flRequest, HttpServletRequest req){
		logger.info("JLF --- saveFractionsLabEvent log"+"User: "+this.getUsername());
		FractionsLabRequestVO request=new FractionsLabRequestVO();
        try {
        	user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        	request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(this.getUsername());
			request.setIdExercise(getLoginUserService().getIdExersiceUser(request.getHeaderVO()));
			request.setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
            request.setEvent(flRequest.getEvent());
            getFractionsLabBO().saveEventFL(request);
        } catch (Exception ex) {
        	logger.error(ex.toString());
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

	public IWhizzExerciseBO getWhizzExerciseBO() {
		return whizzExerciseBO;
	}

	public void setWhizzExerciseBO(IWhizzExerciseBO whizzExerciseBO) {
		this.whizzExerciseBO = whizzExerciseBO;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public IFractionsLabBO getFractionsLabBO() {
		return fractionsLabBO;
	}

	public void setFractionsLabBO(IFractionsLabBO fractionsLabBO) {
		this.fractionsLabBO = fractionsLabBO;
	}

}
