package com.italk2learn.util;
import java.io.File;
import java.io.FileInputStream;


public class EventsAverageTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		File f=new File("C:\\recordings\\events.txt");
		long l=f.length();
		System.out.println("the file is " + l + " bytes long");
		String currentTask=null;
		String currentStudent=null;
		int count = 0;
		double sumTime=0;
		double averageTime=0;
		double previousTime=0;
		double currentSeconds=0;
		
		try {
			FileInputStream finp=new FileInputStream(f);
			StringBuilder builder = new StringBuilder();
			int ch;
			while((ch = finp.read()) != -1){
			    builder.append((char)ch);
			}
			String events=builder.toString();
			String lines[] = events.split("\\r?\\n");
			for (int i=0; i<lines.length;i++) {
				String elems[]=lines[i].split(",");
				String student=elems[0];
				String task=elems[1];
				String event=elems[2];
				String time=event.split(";")[0].substring(1);
				double ti= Double.parseDouble(time);
				int j=0;
				
				if (previousTime == 0) currentSeconds = 0;
				else currentSeconds = ti-previousTime;
				previousTime = ti;
				
				
				
				sumTime +=  currentSeconds;
				count +=1;
				System.out.println("task: "+task+" time: "+ti+" count: "+count+" sum: "+sumTime+" seconds: "+currentSeconds+"\n");
				if (currentStudent == null) currentStudent = student;
				if (currentTask == null) currentTask = task;
				
				if ((!currentStudent.equals(student)) || (!currentTask.equals(task))){
				//if ( !currentTask.equals(task)){
						
					averageTime = sumTime/count;
					System.out.println("Student: "+currentStudent+": task: "+currentTask+" average: "+averageTime);
					
					currentStudent = student;
					currentTask = task;
					sumTime = 0;
					count = 0;
					previousTime = 0;
					currentSeconds=0;
				}
			}
        
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
