package com.italk2learn.controller;

import javax.xml.datatype.XMLGregorianCalendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.italk2learn.ws.NextLesson;

@Controller
public class ExerciseSequenceAIController {

	@Autowired
	private NextLesson sequenceClient;

	private static final Logger log = LoggerFactory
			.getLogger(ExerciseSequenceAIController.class);

	@RequestMapping(value = "/nextExerciseAISequence")
	public String getOrder(ModelMap model) {

		int studentId=0;
		int prevStudentScore=0;
		String prevLessonId="";
		XMLGregorianCalendar timestamp=null;
		String whizzLessonSuggestion="";
		try {
			sequenceClient.nextLesson(studentId, prevStudentScore, prevLessonId, timestamp, whizzLessonSuggestion);
		} catch (Exception e) {
			log.error(e.toString());
		}
		return "order";

	}
}