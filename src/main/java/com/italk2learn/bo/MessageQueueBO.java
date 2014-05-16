package com.italk2learn.bo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.italk2learn.bo.inter.IMessageQueueBO;
import com.italk2learn.exception.ITalk2LearnException;

@Service("messageQueueBO")
@Transactional(rollbackFor = { ITalk2LearnException.class, ITalk2LearnException.class })
public class MessageQueueBO implements IMessageQueueBO{
	
	private final JmsTemplate jms;
	 
    @Autowired public MessageQueueBO(@Qualifier("eventTopicTemplate") JmsTemplate eventTopicTemplate) {
        jms = eventTopicTemplate;
    }
 
    public void doProcessing(String msg) {
        jms.convertAndSend("We did something with your message: " + msg);
    }

}
