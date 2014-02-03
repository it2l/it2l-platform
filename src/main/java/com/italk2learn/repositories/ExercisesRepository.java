package com.italk2learn.repositories;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.italk2learn.vo.ExerciseVO;

@Repository
public class ExercisesRepository {
	
	   private final Map<Integer,ExerciseVO> exercisesById;
	    
	    
	    
	    public ExercisesRepository() {
	        
	        super();
	        
	        this.exercisesById = new LinkedHashMap<Integer,ExerciseVO>();
	        
	        final ExerciseVO var1 = new ExerciseVO();
	        var1.setIdExercise(Integer.valueOf(0));
	        var1.setExercise("WhizzHTML5");
	        this.exercisesById.put(var1.getIdExercise(), var1);
	        
	        final ExerciseVO var2 = new ExerciseVO();
	        var2.setIdExercise(Integer.valueOf(1));
	        var2.setExercise("WhizzFlash");
	        this.exercisesById.put(var2.getIdExercise(), var2);
	        
	        final ExerciseVO var3 = new ExerciseVO();
	        var3.setIdExercise(Integer.valueOf(2));
	        var3.setExercise("FractionsTutor");
	        this.exercisesById.put(var3.getIdExercise(), var3);
	        
	        final ExerciseVO var4 = new ExerciseVO();
	        var4.setIdExercise(Integer.valueOf(3));
	        var4.setExercise("FractionsLab1");
	        this.exercisesById.put(var4.getIdExercise(), var4);
	        
	        final ExerciseVO var5 = new ExerciseVO();
	        var5.setIdExercise(Integer.valueOf(4));
	        var5.setExercise("WhizzFlash2");
	        this.exercisesById.put(var5.getIdExercise(), var5);
	        
	        final ExerciseVO var6 = new ExerciseVO();
	        var6.setIdExercise(Integer.valueOf(5));
	        var6.setExercise("WhizzFlash3");
	        this.exercisesById.put(var6.getIdExercise(), var6);
	        
	        final ExerciseVO var7 = new ExerciseVO();
	        var7.setIdExercise(Integer.valueOf(6));
	        var7.setExercise("WhizzFlash4");
	        this.exercisesById.put(var7.getIdExercise(), var7);
	        
	        final ExerciseVO var8 = new ExerciseVO();
	        var8.setIdExercise(Integer.valueOf(7));
	        var8.setExercise("WhizzFlash5");
	        this.exercisesById.put(var8.getIdExercise(), var8);
	        
	        final ExerciseVO var9 = new ExerciseVO();
	        var9.setIdExercise(Integer.valueOf(8));
	        var9.setExercise("WhizzFlash6");
	        this.exercisesById.put(var9.getIdExercise(), var9);
	        
	        final ExerciseVO var10 = new ExerciseVO();
	        var10.setIdExercise(Integer.valueOf(9));
	        var10.setExercise("FractionsLab2");
	        this.exercisesById.put(var10.getIdExercise(), var10);
	        
	        final ExerciseVO var11 = new ExerciseVO();
	        var11.setIdExercise(Integer.valueOf(10));
	        var11.setExercise("FractionsLab3");
	        this.exercisesById.put(var11.getIdExercise(), var11);
	        
	        final ExerciseVO var12 = new ExerciseVO();
	        var12.setIdExercise(Integer.valueOf(11));
	        var12.setExercise("FractionsLab4");
	        this.exercisesById.put(var12.getIdExercise(), var12);
	        
	    }
	    
	    
	    
	    public List<ExerciseVO> findAll() {
	        return new ArrayList<ExerciseVO>(this.exercisesById.values());
	    }
	    
	    public ExerciseVO findById(final Integer id) {
	        return this.exercisesById.get(id);
	    }
	    
	    
	    

}
