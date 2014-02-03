package com.italk2learn.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.italk2learn.bo.inter.IExerciseSequenceBO;
import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseSequenceResponseVO;
import com.italk2learn.vo.ExerciseVO;
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
	
	private int idView=0;

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
	 * Initial method to get first exercise of sequence
	 */
	@RequestMapping(value = "/",method = RequestMethod.GET)
	public String initSequence(Model model) {
		logger.info("JLF --- ExerciseSequence Main Controller");
		user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		request= new ExerciseSequenceRequestVO();
		request.setHeaderVO(new HeaderVO());
		request.getHeaderVO().setLoginUser(user.getUsername());
		try {
			request.setIdExercise(getLoginUserService().getIdExersiceUser(request.getHeaderVO()));
			request.setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
			response=((ExerciseSequenceResponseVO) getExerciseSequenceService().getFirstExercise(request));
		} catch (Exception e){
			logger.error(e.toString());
		}
		ExerciseVO ex=new ExerciseVO();
		ex.setIdExercise(0);
		model.addAttribute("messageInfo", ex);
		model.addAttribute(response);
		return  response.getExercise().getView()+"/"+ response.getExercise().getExercise();
	}

	
	/**
	 * Get next exercise of a given sequence
	 */
	@RequestMapping(value = "/nextexercise", method = RequestMethod.GET)
    public ModelAndView getNextExercise(@Valid @ModelAttribute("messageInfo") ExerciseVO messageForm){
		logger.info("JLF --- getNextExercise()");
		ModelAndView modelAndView = new ModelAndView();
		ExerciseSequenceRequestVO request= new ExerciseSequenceRequestVO();
		try{
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(user.getUsername());
			request.setIdExercise(getLoginUserService().getIdExersiceUser(request.getHeaderVO()));
			request.setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
			ExerciseVO response=getExerciseSequenceService().getNextExercise(request).getExercise();
			request.setIdExercise(response.getIdExercise());
			getExerciseSequenceService().insertActualExercise(request);
			modelAndView.setViewName(response.getView()+"/"+ response.getExercise());
			modelAndView.addObject("messageInfo", response);
			return modelAndView;
		}
		catch (Exception e){
			return new ModelAndView();
		}
	}
	
	/**
	 * Get back exercise of a given sequence
	 */
	@RequestMapping(value = "/backexercise", method = RequestMethod.GET)
    public ModelAndView getBackExercise(@Valid @ModelAttribute("messageInfo") ExerciseVO messageForm){
		logger.info("JLF --- getBackExercise()");
		ModelAndView modelAndView = new ModelAndView();
		ExerciseSequenceRequestVO request= new ExerciseSequenceRequestVO();
		try{
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(user.getUsername());
			request.setIdExercise(getLoginUserService().getIdExersiceUser(request.getHeaderVO()));
			request.setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
			//Obtenemos el ejercio actual de user
			ExerciseVO response=getExerciseSequenceService().getBackExercise(request).getExercise();
			request.setIdExercise(response.getIdExercise());
			//Seteamos user con el nuevo ejercicio obtenido
			getExerciseSequenceService().insertActualExercise(request);
			modelAndView.setViewName(response.getView()+"/"+ response.getExercise());
			modelAndView.addObject("messageInfo", response);
			return modelAndView;
		}
		catch (Exception e){
			return new ModelAndView();
		}
	}
	
	
	/**
	 * Old method used to get the whole sequence
	 */
	@RequestMapping(value = "/nextsequence", method = RequestMethod.POST)
    public ModelAndView getNextSequence(@Valid @ModelAttribute("messageInfo") ExerciseVO messageForm){
		logger.info("JLF --- getNextSequence()");
		ModelAndView modelAndView = new ModelAndView();
		try{
			if ((messageForm.getIdExercise()!=idView) && (messageForm.getIdExercise()<=response.getResponse().size()-1)){
				logger.info(response.getResponse().get(messageForm.getIdExercise()).getExercise());
				modelAndView.setViewName("views/"+response.getResponse().get(messageForm.getIdExercise()).getExercise());
				idView=response.getResponse().get(idView).getIdExercise();
				exerciseCounter=response.getResponse().get(idView).getIdExercise();
				modelAndView.addObject("idView", idView);
				return modelAndView;
			}
			if (exerciseCounter<=response.getResponse().size()-1){
				logger.info(response.getResponse().get(exerciseCounter).getExercise());
				modelAndView.setViewName("views/"+response.getResponse().get(exerciseCounter).getExercise());
				idView=response.getResponse().get(exerciseCounter).getIdExercise();
				modelAndView.addObject("idView", idView);
				exerciseCounter++;
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
