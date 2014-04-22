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

	string liveResult;

	string getLiveResult() {return liveResult;}

	
private:

	string m_Path;
	bool m_createXMLAtSource;	// create resulting XML where the input-file is

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
	printf("Result_real_time");
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
		printf("Word: ");
		string res=itr->word;
		printf(res.c_str());
		//JLF: I need to integrate this lines here and I dont know how because I need "env" and "obj" references
		//jstring jstr = env->NewStringUTF(res.c_str());
		//jclass clazz = env->FindClass("Italk2learn");
		//jmethodID realTimeSpeech = env->GetMethodID(clazz, "realTimeSpeech", "(Ljava/lang/String;)Ljava/lang/String;");
		//jobject result = env->CallObjectMethod(obj, realTimeSpeech, jstr);
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


extern "C" {
	//JLF: Global variables
	ASREngine* asr;
	MyListener* listener;


//JLF: Method that sends data to the engine on real time	
JNIEXPORT void JNICALL Java_Italk2learn_speechrecognition(JNIEnv * env, jobject obj, jbyteArray sample) {
	printf("Print from C++!\n");
#ifdef __cplusplus
	printf("__cplusplus is defined\n");
#else
	printf("__cplusplus is NOT defined\n");
#endif

	jbyte *inBytes = env->GetByteArrayElements(sample, 0);
   
    jsize length = env->GetArrayLength( sample);
	
	printf("from Java: length =%d, bytes 0..3: %d %d %d %d\n",length,inBytes[0],inBytes[1],inBytes[2],inBytes[3]);
    asr->sendData((unsigned char*)inBytes,length);
   
 
    env->ReleaseByteArrayElements(sample, inBytes, 0); // release resources

	jstring jstr = env->NewStringUTF("This comes from c++");
	jclass clazz = env->FindClass("Italk2learn");
    jmethodID realTimeSpeech = env->GetMethodID(clazz, "realTimeSpeech", "(Ljava/lang/String;)Ljava/lang/String;");
    jobject result = env->CallObjectMethod(obj, realTimeSpeech, jstr);

}


//JLF: Method that opens a listener and initializes the engine
JNIEXPORT jboolean JNICALL Java_Italk2learn_openASRListener(JNIEnv *, jobject) {
		printf("Open ASR Listener from C++!\n");
#ifdef __cplusplus
	printf("__cplusplus is defined\n");
#else
	printf("__cplusplus is NOT defined\n");
#endif
	string servername = "localhost";
	int instanceNum = 1;
	asr = new ASREngine (servername, instanceNum);

	asr->addListener(listener);

	printf("Listener declared");
	// start engine
	string language ("en_ux");
	string domain   ("broadcast-news");
	string subdomain("base");
	string mode     ("accurate");

	asr->initialize(language, domain, subdomain, mode, 44100);

	printf("ASR Initialized");
	return true;

}

//JLF:Close the listener and retrieves the whole transcription
JNIEXPORT jstring JNICALL Java_Italk2learn_closeASRListener(JNIEnv * env, jobject) {
		printf("Sending data to the engine");
    asr->endOfData(); 
   
    asr->waitForJobDone();
     
    string result=listener->getResult();
	printf("getResult");
	return env->NewStringUTF(result.c_str());

}

}

int main(int argc, char* argv[])
{

}

/* CPPDOC_END_EXCLUDE */
