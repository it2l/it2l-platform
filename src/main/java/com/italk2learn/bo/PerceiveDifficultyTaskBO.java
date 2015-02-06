package com.italk2learn.bo;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ptdFromAmplitudes.CreateWav;
import ptdFromAmplitudes.PtdFromAmplitudes;

import com.italk2learn.bo.inter.IPerceiveDifficultyTaskBO;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.PTDRequestVO;
import com.italk2learn.vo.PTDResponseVO;

@Service("perceiveDifficultyTaskBO")
@Transactional(rollbackFor = { ITalk2LearnException.class, ITalk2LearnException.class })
public class PerceiveDifficultyTaskBO implements IPerceiveDifficultyTaskBO  {
	
	private static final Logger logger = LoggerFactory
			.getLogger(PerceiveDifficultyTaskBO.class);
	
	/*@Autowired*/
	public PerceiveDifficultyTaskBO() {
		
	}
	

	public PTDResponseVO callPTD(PTDRequestVO request) throws ITalk2LearnException{
		logger.info("callPTD()--- ");
		PTDResponseVO res= new PTDResponseVO();
        String wavname;
        List<byte[]> exampleChunks = new ArrayList<byte[]>();
        exampleChunks.add(request.getAudioByteArray());

        int numberOfChunksToCombine = exampleChunks.size();
       
        CreateWav wavcreation = new CreateWav();
        for (int i = 0; i < numberOfChunksToCombine; i++) {
            wavcreation.addChunk(exampleChunks.get(i));   
        }
       
        // Initialize ptd classifier:
        PtdFromAmplitudes ptdAmpl = new PtdFromAmplitudes();
       
        // get perceived task difficulty (ptd):
       
        // Create wav from the last x (here numberOfChunksToCombine) chunks (x = seconds/5)
        wavname = wavcreation.createWavFileMonoOrStereo(numberOfChunksToCombine);

        // get ptd for the whole wav file (in "wavname"),
        // input has to be the output of createWavFile()
        res.setPTD(ptdAmpl.getPTD(wavname));
		return res;
	}
}
