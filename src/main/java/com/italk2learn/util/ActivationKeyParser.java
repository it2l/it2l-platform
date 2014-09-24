package com.italk2learn.util;

import java.io.*;
import java.util.*;

public class ActivationKeyParser {
    private Scanner scanner;

    public static void main(String...args) {
	  File file = parseArguments(args);
	  if (file != null) {
		ActivationKeyParser akp = new ActivationKeyParser();
		akp.initScanner(file);
		akp.run();
	  } 
    }

    private void run() {
	  if (scanner == null) 
		return;

	  scanner.nextLine();
	  scanner.nextLine();
	  String thirdLine = scanner.nextLine();
	  StringTokenizer st = new StringTokenizer(thirdLine);
	  ArrayList<String> wordList = new ArrayList<String>();
	  while (st.hasMoreTokens()) {
		wordList.add(st.nextToken());
	  }
	  if (wordList.size() > 14) {
		System.out.println("ERROR: Invalid file.");
		return;
	  }
	  String[] word = new String[wordList.size()];
	  for (int i = 0; i < wordList.size(); i++) {
		word[i] = wordList.get(i);
	  }
	  if (!"valid".equals(word[0]) ||
		!"until".equals(word[1]) ||
		!"for".equals(word[5]) ||
		!"machine".equals(word[6]) ||
		!"for".equals(word[11]) ||
		!"numlines".equals(word[13])) {
		System.out.println("ERROR: Invalid file.");
		return;
	  }
	  int day   = Integer.parseInt(word[2]);
	  int month = parseMonth(word[3]);
	  int year  = Integer.parseInt(word[4]);
	  GregorianCalendar expiryDate = new GregorianCalendar(year, month, day);
	  GregorianCalendar now = new GregorianCalendar();
	  if (now.compareTo(expiryDate) >= 0) {
		System.out.println("This key is expired!!");
		return;
	  }
	  now.add(Calendar.DAY_OF_MONTH, 30);
	  if (now.compareTo(expiryDate) >= 0) {
		System.out.println("This key will expire soon!.");
		return;
	  }
	  System.out.println("This key is fine.");
    }

    private void initScanner(File file) {
	  if (scanner == null) {
		try {
		    scanner = new Scanner(file);
		} catch (IOException e) {
		    e.printStackTrace();
		    scanner = null;
		}
	  } else {
		System.out.println("Warning: Cannot init scanner twice.");
	  }
    }

    private int parseMonth(String month) {
	  if ("Jan".equals(month) )
		return Calendar.JANUARY;
	  else if ("Feb".equals(month)) 
		return Calendar.FEBRUARY;
	  else if ("Mar".equals(month)) 
		return Calendar.MARCH;
	  else if ("Apr".equals(month)) 
		return Calendar.APRIL;
	  else if ("May".equals(month)) 
		return Calendar.MAY;
	  else if ("Jun".equals(month)) 
		return Calendar.JUNE;
	  else if ("Jul".equals(month)) 
		return Calendar.JULY;
	  else if ("Ago".equals(month)) 
		return Calendar.AUGUST;
	  else if ("Sep".equals(month)) 
		return Calendar.SEPTEMBER;
	  else if ("Oct".equals(month)) 
		return Calendar.OCTOBER;
	  else if ("Nov".equals(month)) 
		return Calendar.NOVEMBER;
	  else if ("Dec".equals(month)) 
		return Calendar.DECEMBER;
	  else 
		throw new IllegalArgumentException("Invalid Month: " + month+ ".");
    }

    private static File parseArguments(String...args) {
	  if (args.length < 1) {
		System.out.println("Please provide a file name.");
		return null;
	  } 
	  String filename = args[0];
	  File file = new File(filename);
	  if (!file.exists()) {
		System.out.println("File '" + filename + "' does not exist.");
		return null;		
	  } else if (!file.canRead()) {
		System.out.println("File '" + filename + "' cannot be read.");
		return null;
	  }
	  return file;
    }

}