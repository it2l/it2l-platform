all: iT2L

iT2L.so: iT2L.cpp
	g++ -o iT2L.so -shared -lstdc++ -I /usr/lib/jvm/java-7-oracle/include -I /usr/lib/jvm/java-7-oracle/include/linux -I ./include iT2L.cpp

iT2L: iT2L.so
	g++ -oiT2L iT2L.so -L ./lib -lASREngineAPI -lACE-5.5.6

