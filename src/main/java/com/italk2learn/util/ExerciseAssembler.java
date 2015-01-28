package com.italk2learn.util;

import java.util.ArrayList;
import java.util.List;

import com.hibernate.dto.Exercises;
import com.italk2learn.vo.ExerciseVO;

public class ExerciseAssembler {
	
	public static ExerciseVO toExerciseFeedbackVOs(Exercises uExercise,String feedback) {
		final ExerciseVO exerciseVO = new ExerciseVO();
		exerciseVO.setIdExercise(uExercise.getIdExercise());
		exerciseVO.setExercise(uExercise.getExercise());
		exerciseVO.setView(uExercise.getView());
		exerciseVO.setFeedback(feedback);
		exerciseVO.setIdSequencer(uExercise.getIdSequencer());
		return exerciseVO;
	}
	
	public static ExerciseVO toExerciseVOs(Exercises uExercise) {
		final ExerciseVO exerciseVO = new ExerciseVO();
		exerciseVO.setIdExercise(uExercise.getIdExercise());
		exerciseVO.setExercise(uExercise.getExercise());
		exerciseVO.setView(uExercise.getView());
		exerciseVO.setDescription(uExercise.getDescription());
		exerciseVO.setIdSequencer(uExercise.getIdSequencer());
		return exerciseVO;
	}

	
	public static final List<ExerciseVO> toExerciseVOs(List<Exercises> uExercise)
			throws Exception {

		final List<ExerciseVO> result = new ArrayList<ExerciseVO>();
		for (Exercises entity : uExercise) {
			result.add(toExerciseVOs(entity));
		}
		return result;
	}

}
