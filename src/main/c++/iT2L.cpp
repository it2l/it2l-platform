//==========================================================================
//  Copyright 2004-2011 by SAIL LABS Technology AG. All rights reserved.
//  For details see the file SAIL_COPYRIGHT in the root of the source tree.
//==========================================================================

// $Id: sample.cpp,v 1.109 2011-11-24 12:55:33 gerhard Exp $

/* CPPDOC_BEGIN_EXCLUDE */

#include <jni.h>
#include <iostream>
#include <string>

#ifdef WIN32
#include <process.h>
#include <windows.h>
#include <sys/stat.h>
#define strcasecmp stricmp
#endif

#include "ASREngine.h"
#include <time.h>


using namespace std;
using namespace ASR;

//==========================================================================
// class MyListener
//
// Handles status messages and results from the engine
//==========================================================================
class MyListener : public ASREngineListener
{
public:
	virtual ~MyListener() {};
	void setFileName(string path, bool createXMLAtSource=false) { m_Path = path; m_createXMLAtSource=createXMLAtSource; }

	// the three required listening methods of ASREngineListener:

	virtual void status(STATUS status);

	virtual void asrResult(RESULTTYPE type,
								  vector<ASREngineResult>& utterance,
								  string speaker);

	virtual void xmlResult(const string& xml);

	string myResult;

	string getResult() {return myResult;}

private:

	string	m_Path;
	bool		m_createXMLAtSource;	// create resulting XML where the input-file is

	string getXmlFileName() const
	{
		char fname[255];
		char dirname[255];
		char fileWithPath[600];
		char drivename[5];

		ASREngine::splitpath
			(m_Path.c_str(), drivename, dirname, fname, NULL);

		fileWithPath[0]='\0';

		// depending on this flag, the xml file will be in current directory,
		// or in the directory where the input file resides
		if(m_createXMLAtSource)
			sprintf(fileWithPath, "%s%s", drivename, dirname);

		// same name as audio file, extension .xml
		strcat(fileWithPath, fname);
		strcat(fileWithPath, ".xml");
		return string(fileWithPath);
	}

	//void optionalBackup(const string& filename) const;
};


// Handle status messages from engine
void MyListener::status(STATUS status)
{
	switch(status)
	{
		case STATUS_ERROR:
			cerr << endl << "Error" << endl;
			break;

		case STATUS_JOBDONE:
			break;
	}
}


// Handle intermediate results from engine
void MyListener::asrResult(
		RESULTTYPE type,
		vector<ASREngineResult>& utterance, string speaker)
{
	switch(type)
	{
		case ASR_RESULT:
			cout << "--- SEGMENT RESULT ---";
			break;

		case TRANSLATION_RESULT:
			cout << "--- TRANSLATION ---";
			break;

		default:
			return;
	}

	if (!speaker.empty())
		cout << " speaker: " << speaker;
	cout << endl;

	for (vector<ASREngineResult>::iterator itr = utterance.begin();
		  itr != utterance.end();
		  itr++)
	{
		cout << itr->word << "[" << itr->offset << "] ";
	}

	cout << endl;
}


// Handle final XML result from engine
void MyListener::xmlResult(const string& xml)
{
	string filename = getXmlFileName();
	cout << endl << "Writing XML result to: " << filename << endl;
	//ofstream os;
	//os.open(filename.c_str(), ios_base::out);
	//os << xml;
	//os.close();
	myResult=xml;
	// optionally save a backup copy of input file and xml file
	//optionalBackup(filename);
}

// optionally save a backup copy of input file and xml file


//==========================================================================
//  Utility methods
//==========================================================================

//Ask engine for installed language models and modes
void listInventory(ASREngine& asr)
{
	vector<string> languages = asr.enumLanguages();
	vector<string>::iterator lang = languages.begin();

	cout << endl;
	while(lang != languages.end())
	{
		cout << "Language: " << *lang << endl;

		vector<string> domains = asr.enumDomains(*lang);
		vector<string>::iterator domain = domains.begin();

		while(domain != domains.end())
		{
			cout << "  Domain: " << *domain << endl;

			vector<string> subdomains = asr.enumSubdomains(*lang, *domain);
			vector<string>::iterator subdomain = subdomains.begin();

			while(subdomain != subdomains.end())
			{
				cout << "    Subdomain: " << *subdomain << endl;

				vector<string> modes = asr.enumModes(*lang, *domain, *subdomain);
				vector<string>::iterator mode = modes.begin();

				while(mode != modes.end())
				{
					cout << "      Mode: " << *mode << endl;
					mode++;
				}

				subdomain++;
			}

			domain++;
		}

		lang++;
	}
	cout << endl;
}


// Show usage message
void showUsage(char * progname)
{

	cerr << endl;
	cerr << "Usage:" << endl;
	cerr << "  " << progname
		<< " [-h servername] [-n instanceNum] " << endl
		<< "    [-r sampling rate]" << endl
		<< "    [-nbest num]   produce num alternative hypotheses" << endl
		<< "    [-l]           calculate word latencies" << endl
		<< "    [-realTime]    send audio no faster than real time" << endl
		<< "    [-t sec]       index only sec seconds of file" << endl
		<< "    [-offset offset] start offset in centi-seconds for word time tags" << endl
		<< "    [-channel channel] channel for meta-information" << endl
		<< "    [-source source] source for meta-information" << endl
		<< "    [-program program] program for meta-information" << endl
		<< "    [-epiid episodeid] episode-id for meta-information" << endl
		<< "    [-m meta-file] file containing meta-information (tag:value or tag=value pairs)" << endl
		<< "    [-s] create the resulting XML file where the input file resides (otherwise in the working directory)" << endl
		<< "    [-M mode] accurate or fast" << endl
		<< "    language domain subdomain [audiofile1 audiofile2 ...]" << endl
		<< "    language domain subdomain [textfile1 textfile2 ...]" << endl
		<< endl << endl;
	cerr << "  " << progname
		  << " stop [all]" << endl << endl;
	cerr << "  " << progname
		  << " query" << endl;
	cerr << "  (run this to see installed languages and domains)" << endl << endl;
	// keywords
	cerr << "  " << progname
		  << " keywords" << endl;
	cerr << "  (run this to see the currently defined keywords)" << endl << endl;
	cerr << "  " << progname
		  << " defkeyword keyword" << endl;
	cerr << "  (run this to define the keyword \"keyword\")" << endl << endl;
	cerr << "  " << progname
		  << " defkeywordfile filename" << endl;
	cerr << "  (run this to define the keywords contained in file \"filename\" (encoded in UTF-8))" << endl << endl;
	cerr << "  " << progname
		  << " resetkeywords" << endl;
	cerr << "  (run this to reset all currently defined keywords)" << endl << endl;
	// sid-models
	cerr << "  " << progname
		  << " loadsidmodels sid_par_filename" << endl;
	cerr << "  (run this to enable the sid-models as specified in sid_par_filename)" << endl << endl;
	cerr << "  " << progname
		  << " resetsidmodels" << endl;
	cerr << "  (run this to reset the currently defined sid-models" << endl << endl;
	// re-connect in case of engine-busy
	cerr << "  " << progname
		  << " [-c connection_attempts] [-C connection_interval (in s)]" << endl;
	cerr << "  (specify these to keep trying to connect in case the engine is busy)" << endl << endl;
	cerr << "  " << progname;

	cerr << "NOTE:" << endl;
	cerr << "This program expects that audio input files are in one of the following formats:" << endl
		  << " RAW audio (signed 16 bit PCM mono, must use parameter \"-r\" to specify sampling rate in Hertz)" << endl
		  << " WAV audio (signed 16 bit PCM mono, must use extension \".wav\")" << endl
		  << " MP3 audio (must use extension \".mp3\")" << endl << endl;
	cerr << "RAW is always chosen when parameter -r is used (e.g. -r 16000)" <<endl<<endl;
	cerr << "Sampling rate 16kHz or more for broadcast-news, 8kHz or more for telephony models" <<endl<<endl;
	cerr << "Text files are expected to be encoded in UTF-8" <<endl<<endl;
	cerr << "Examples:" << endl;
	cerr << "  " << progname << " en_us broadcast-news base cnn_20091231_120000.wav report.txt" << endl;
}
extern "C" {
JNIEXPORT jstring JNICALL Java_Italk2learn_hello(JNIEnv * env, jobject obj, jbyteArray sample) {
	printf("Hello World C++! 06/12/2013\n");
#ifdef __cplusplus
	printf("__cplusplus is defined\n");
#else
	printf("__cplusplus is NOT defined\n");
#endif
	string servername = "localhost";
	int instanceNum = 1;

	ASREngine asr(servername, instanceNum);


	MyListener listener;
	asr.addListener(&listener);


	//vector<string> vs=asr.enumLanguages();
	printf("Listener declared");
	// start engine
	string language ("en_ux");
	string domain   ("broadcast-news");
	string subdomain("base");
	string mode     ("accurate");

	//	asr.initializeWithRetry(language, domain, subdomain, mode, samplingRate, reconnectInterval, reconnectAttempts);
	asr.initialize(language, domain, subdomain, mode, 44100);

	printf("ASR Initialized");

	jbyte *inBytes = env->GetByteArrayElements(sample, 0);
   
    jsize length = env->GetArrayLength( sample);
	
	printf("from Java: length =%d, bytes 0..3: %d %d %d %d\n",length,inBytes[0],inBytes[1],inBytes[2],inBytes[3]);
    asr.sendData((unsigned char*)inBytes,length);
   
	printf("Sending data to the engine");
    asr.endOfData(); 
   
    asr.waitForJobDone();
     
    env->ReleaseByteArrayElements(sample, inBytes, 0); // release resources

    string result=listener.getResult();
	printf("getResult");
	//string result="dddvs[0]";
	return env->NewStringUTF(result.c_str());
}

/*JNIEXPORT void JNICALL Java_Italk2learn_hello(JNIEnv * env, jobject obj) {
	printf("Hello World C++3!\n");
#ifdef __cplusplus
	printf("__cplusplus is defined2\n");
#else
	printf("__cplusplus is NOT defined\n");
#endif
}*/
}
//==========================================================================
//  Main entry point
//==========================================================================
int main(int argc, char* argv[])
{
	try
	{
		// get progname before shifting arguments
		char *progname = argv[0];
		// strip path of progname
		char *slash     = strrchr(progname,'/');
		char *backslash = strrchr(progname,'\\');
		if (slash != 0 || backslash != 0)  progname = max(slash,backslash)+1;

		string servername = "localhost";
		int instanceNum = 1;          // default engine instance
		int samplingRate = 0;
		int nBestNum = -1;            // invalid value i.e. unspecified
		bool calculateLatency=false;
		int timeLimit = 0;
		bool dumpAudio = false;
		bool realTime = false;        // simulate input from file in real-time
		string startOffset = "0";
		unsigned int reconnectAttempts=0;
		unsigned int reconnectInterval=0;
		string channel="testchannel";
		string source="testsource";
		string program="testprogram";
		string epiid="testepiid";
		string metaFile;
		string engineMode;
		bool createXMLWhereSourceResides=false;

		while (argc > 2  &&  argv[1][0] == '-')
		{
			if(strcmp(argv[1],"-h")==0)
			{
				servername = argv[2];
			}
			else if(strcmp(argv[1],"-n")==0)
			{
				instanceNum = atoi(argv[2]);
				if (instanceNum == 0)
				{
					cerr << "Invalid instance number: " << argv[2] << std::endl;
					return 2;
				}
			}
			else if(strcmp(argv[1],"-nbest")==0)
			{
				nBestNum = atoi(argv[2]);
				if (nBestNum < 0 || nBestNum > 255)
				{
					cerr << "nbest should be between 0 and 255" << std::endl;
					return 2;
				}
			}
			else if(strcmp(argv[1],"-r")==0)
			{
				samplingRate = atoi(argv[2]);
				if (samplingRate == 0)
				{
					cerr << "Invalid sampling rate: " << argv[2] << std::endl;
					return 2;
				}
			}
			else if(strcmp(argv[1],"-realTime")==0)
			{
				realTime=true;
				// all other args expect to pop 2 values, here it is only one, so adjust for this
				argc ++;
				argv --;
			}
			else if(strcmp(argv[1],"-l")==0)
			{
				calculateLatency=true;
				// all other args expect to pop 2 values, here it is only one, so adjust for this
				argc ++;
				argv --;
			}
			else if(strcmp(argv[1],"-dump")==0)
			{
				dumpAudio=true;
				// all other args expect to pop 2 values, here it is only one, so adjust for this
				argc ++;
				argv --;
			}
			else if(strcmp(argv[1],"-t")==0)
			{
				timeLimit = atoi(argv[2]);
				if (timeLimit == 0)
				{
					cerr << "Invalid time limit: " << argv[2] << std::endl;
					return 3;
				}
			}
			else if(strcmp(argv[1],"-offset")==0)
			{
				startOffset = argv[2];
			}
			else if(strcmp(argv[1],"-c")==0) // max re-connection attempts
			{
				reconnectAttempts = atoi(argv[2]);
				//cerr << "setting reconnectAttempts to " << reconnectAttempts << std::endl;
			}
			else if(strcmp(argv[1],"-C")==0) // re-connection interval in s
			{
				reconnectInterval = atoi(argv[2]);
				//cerr << "setting reconnectInterval to " << reconnectInterval << std::endl;
			}
			else if(strcmp(argv[1],"-channel")==0) // params for <meta> element
			{
				channel = argv[2];
			}
			else if(strcmp(argv[1],"-source")==0)
			{
				source = argv[2];
			}
			else if(strcmp(argv[1],"-program")==0)
			{
				program = argv[2];
			}
			else if(strcmp(argv[1],"-epiid")==0)
			{
				epiid = argv[2];
			}
			else if(strcmp(argv[1],"-m")==0)
			{
				metaFile = argv[2];
			}
			else if(strcmp(argv[1],"-M")==0)
			{
				engineMode = argv[2];
			}
			else if(strcmp(argv[1],"-s")==0)
			{
				createXMLWhereSourceResides=true;
				// all other args expect to pop 2 values, here it is only one, so adjust for this
				argc ++;
				argv --;
			}
			else
			{
				cerr << "Invalid option: " << argv[1] << std::endl;
				return 2;
			}

			argc -= 2;
			argv += 2;
		}

		if(argc < 2)
		{
			showUsage(progname);
			return 0;
		}

		// create engine API object connecting to a local MM Indexer instance:
		//ASREngine asr(instanceNum);
		//ASREngine asr;
		//ASREngine asr("localhost", instanceNum);

		// create engine API object connecting to a remote MM Indexer instance
		ASREngine asr(servername, instanceNum);
		//ASREngine asr("remoteIndexer");
		//ASREngine asr("192.168.1.2");

		// one argument "stop" means stop engine and unload language model
		if(argc == 2  &&  strcmp(argv[1],"stop")==0)
		{
			// shutdown engine processes
			cout << "Unloading language model" << endl;
			asr.shutdown(false);
			return 0;
		}

		//
		if(argc == 2  &&  strcmp(argv[1], "keywords")==0)
		{
			vector<string> keywords=asr.queryKeywords();
			vector<string>::iterator keywd = keywords.begin();
			size_t numKeywd=1;
			cout << "There are currently " << keywords.size() << " keywords defined" << endl;
			while(keywd != keywords.end())
			{
				cout << "Keyword" << numKeywd++ << ": " << *keywd << endl;
				keywd++;
			}
			return 0;
		}

		// two arguments "defkeyword keyword" means: define the keyword "keyword"
		if(argc == 3  &&  strcmp(argv[1], "defkeyword")==0)
		{
			cout << "defining keyword " << argv[2] << endl;
			bool defineOK=asr.defineKeyword(argv[2]);
			if(defineOK)
				cout << "Definition of keyword \"" << argv[2] << "\" successful" << endl;
			else
				cout << "Definition of keyword \"" << argv[2] << "\" failed" << endl;
			return 0;
		}

		if(argc == 3 &&  strcmp(argv[1], "defkeywordfile")==0)
		{
			cout << "defining keywords from file " << argv[2] << endl;
			ifstream keywordsFile(argv[2]);
			if(!keywordsFile.good())
			{
				cerr << "Could not open keyword file: " << argv[3] << endl;
				return -1;
			}
			//keywordsFile.getline(line,1000); // read first line
			vector<string> keyWords;
			vector<bool> keyWdStatus;
			while(!keywordsFile.eof() && keywordsFile.good())
			{
				string keyWd;
				keywordsFile >> keyWd;
				if(keyWd.size()==0) continue;
				cout << "adding keyword " << keyWd << endl;
				keyWords.push_back(keyWd);
			}
			keywordsFile.close();
			keyWdStatus.reserve(keyWords.size());
			bool allDefinesOK=asr.defineMultiKeywords(keyWords, keyWdStatus);
			if(allDefinesOK)
			{
				cout << "All keywords defined" << endl;
			}
			else
			{
				cout << "Some keywords could not be defined:" << endl;
				for(size_t i=0; i < keyWords.size(); i++)
				{
					string status=(keyWdStatus[i]) ? "defined" : "NOT defined";
					cout << "keyword: " << keyWords[i] << " status: " << status << endl;
				}
			}

			return 0;
		}

		if(argc == 2  &&  strcmp(argv[1], "resetkeywords")==0)
		{
			cout << "resetting keywords" << endl;
			bool resetOK=asr.resetKeywords();
			if(resetOK)
				cout << "Reset of keywords successful" << endl;
			else
				cout << "Reset of keywords failed" << endl;
			return 0;
		}

		/*
		// two arguments "defned nedclass nedword" means: define the ned "nedword" into the class "nedclass"
		if(argc == 4  &&  strcmp(argv[1], "defned")==0)
		{
			cout << "defining ned " << argv[3] << " for class " << argv[3] << endl;
			bool defineOK=asr.defineNED(argv[2], argv[3]);
			if(defineOK)
				cout << "Definition of ned \"" << argv[3] << "\" successful" << endl;
			else
				cout << "Definition of ned \"" << argv[3] << "\" failed" << endl;
			return 0;
		}
		*/

		if(argc == 3  &&  strcmp(argv[1], "loadsidmodels")==0)
		{
			cout << "loading sid models from file " << argv[2] << endl;
			bool loadSidOK=asr.loadSidModels(argv[2]);
			if(loadSidOK)
				cout << "Successfully loaded new sid models" << endl;
			else
				cout << "Error loading new sid models" << endl;
			return 0;
		}

		if(argc == 2  &&  strcmp(argv[1], "resetsidmodels")==0)
		{
			cout << "resetting sid-models " << endl;
			bool loadSidOK=asr.resetSidModels();
			if(loadSidOK)
				cout << "Reset of sid models successful" << endl;
			else
				cout << "Reset of sid models failed" << endl;
			return 0;
		}

		// one argument "query" means enumerate installed language features
		if(argc == 2  &&  strcmp(argv[1],"query")==0)
		{
			listInventory(asr);
			return 0;
		}

		// two arguments "stop all" means: unload language model and stop master
		if(argc == 3  &&  strcmp(argv[1],"stop")==0
		              &&  strcmp(argv[2],"all")==0)
		{
			// shutdown all engine processes including master
			cout << "Stopping the master" << endl;
			asr.shutdown(true);
			return 0;
		}

		// otherwise we need 3 arguments or more:
		// language, domain, subdomain, optional audio files
		if(argc < 4)
		{
			showUsage(progname);
			return 0;
		}

		// enable dumping of audio to cwd\ASR_audiodump_TIMESTAMP.raw
		if (dumpAudio)
			asr.dumpAudio(true);

		// create and register engine listener
		MyListener listener;
		asr.addListener(&listener);

		// start engine
		string language (argv[1]);
		string domain   (argv[2]);
		string subdomain(argv[3]);
		string mode     ("accurate");

		if(!engineMode.empty())
		{
			if((engineMode!="accurate") && (engineMode!="fast"))
				cerr << "Mode " << engineMode << " not supported -> keeping existing one (to change use \"accurate\" or \"fast\")" << endl;
			else
				mode=engineMode;
		}

		cout << endl << "Initializing and loading model "
			  << language <<"/" << domain <<"/"<< subdomain
			  << " (" << mode << " mode) ..." << endl;
		asr.initializeWithRetry(language, domain, subdomain, mode, samplingRate, reconnectInterval, reconnectAttempts);
		//asr.initialize(language, domain, subdomain, mode, samplingRate);
		cout << "Engine ready to accept audio" << endl;

		{
			time_t seconds;
			seconds = time (NULL);
			char buf[64];
			sprintf (buf, "%ld", seconds);

			// cout << "ABSOLUTETIME: " << buf << endl;

			asr.setMetaData("absolutetime", buf);
			asr.setMetaData("Sail::StartOffset",startOffset);
		}

		if (nBestNum != -1)
		{
			asr.setNBest(nBestNum);
			cout << "set nBest to " << nBestNum << endl;
		}

		for (int i=4; i<argc; i++)
		{
			// select the next audio file from the command line
			// set filename for result and where XML-result is to be written
			listener.setFileName(argv[i], createXMLWhereSourceResides);

			// the following sets mediaDir, mediaName and mediaExt meta tags
			// and maybe also channel, program, date, time (depending on filename format)
			asr.setMediaTags(argv[i]);

			// set meta data (for validation against xsd)
			asr.setMetaData("channel", channel);
			asr.setMetaData("program", program);
			asr.setMetaData("source", source);
			asr.setMetaData("epiid", epiid);

			// above settings might be overwritten
			if(!metaFile.empty())
				asr.setMetaDataFromFile(metaFile);

			if (calculateLatency)
				asr.setCalculateLatency(true);

			if (samplingRate)
			{
				cout << endl << "Sending RAW file #" << i-3 << ": "
					  << argv[i] <<" at "<< samplingRate << " Hz" << endl << endl;
				asr.sendMsRaw(argv[i], samplingRate, realTime, timeLimit);
			}
			else
			{
				try
				{
					if(strcasecmp((const char *)&argv[i][strlen(argv[i])-4],".wav") == 0)
					{
						cout << endl << "Sending audio file #" << i-3 << ": " << argv[i] << endl << endl;
						asr.setMetaData("xmltype", "transcript"); // output <words>
						asr.sendMsWav(argv[i], realTime, timeLimit);
					}
					else if(strcasecmp((const char *)&argv[i][strlen(argv[i])-4],".mp3") == 0)
					{
						cout << endl << "Sending audio file #" << i-3 << ": " << argv[i] << endl << endl;
						asr.setMetaData("xmltype", "transcript"); // output <words>
						asr.sendMP3(argv[i], realTime, timeLimit);
					}
					else if(strcasecmp((const char *)&argv[i][strlen(argv[i])-4],".txt") == 0)
					{
						cout << endl << "Sending text file #" << i-3 << ": " << argv[i] << endl << endl;
						asr.setMetaData("xmltype", "text"); // output <paragraphs>
						asr.sendTextFile(argv[i]);
					}
					else
					{
						cerr << "Unknown filetype for file: " << argv[i];
						continue;
					}
				}
				catch (MsWavException e)
				{
					cerr << "ERROR IN WAV INPUT FILE: " << e.getMsg() << endl;
					cout << endl << "Job failed" << endl;
					continue;
				}
				catch (Mp3Exception e)
				{
					cerr << "ERROR IN MP3 INPUT FILE: " << e.getMsg() << endl;
					cout << endl << "Job failed" << endl;
					continue;
				}
				catch (TextException e)
				{
					cerr << "ERROR IN TEXT INPUT FILE: " << e.getMsg() << endl;
					cout << endl << "Job failed" << endl;
					continue;
				}
			}

			// wait for engine to finish (or to fail)
			STATUS status = asr.waitForJobDone();
			switch (status)
			{
				case STATUS_JOBDONE:
					cout << endl << "Job finished" << endl;
					if (calculateLatency)
						asr.printLatencies();
					break;

				case STATUS_ERROR:
					cout << endl << "Job failed" << endl;
					// if more files to process, restart engine
					if (i < argc-1)
					{
						cout << endl << "Loading model "
					  		<< language <<"/" << domain <<"/"<< subdomain
					  		<< " ..." << endl;
						asr.initializeWithRetry(language, domain, subdomain, mode, samplingRate, reconnectAttempts, reconnectInterval);
						//asr.initialize(language, domain, subdomain, mode, samplingRate);
					}
					break;
			}
		}
		cout << endl << "Leaving engine running" << endl;

	}
	catch(ASREngineException& e)
	{
		switch(e.getCode())
		{
			case ASREngineException::BUSY:
				cout << endl << "ENGINE IS BUSY!" << endl << endl;
				return 1;
			default:
				cout << endl << "ERROR: " << e.getMsg() << endl << "Please look in engine log for details" << endl << endl;
				return -1;
		}
	}

	return 0;
}

/* CPPDOC_END_EXCLUDE */
