all: iT2L

iT2L.so: iT2L.cpp
	g++ -c -o iT2L.so -shared -I /usr/java/jdk1.7.0_21/include -I /usr/java/jdk1.7.0_21/include/linux -I ./include iT2L.cpp

iT2L: iT2L.so
	g++ -oiT2L iT2L.so -L ./lib -lASREngineAPI -lACE-5.5.6
