
package com.italk2learn.ws;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="studentId" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="prevStudentScore" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="prevLessonId" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="timestamp" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="whizzLessonSuggestion" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "studentId",
    "prevStudentScore",
    "prevLessonId",
    "timestamp",
    "whizzLessonSuggestion"
})
@XmlRootElement(name = "nextLesson")
public class NextLesson_Type {

    protected int studentId;
    protected int prevStudentScore;
    @XmlElement(required = true)
    protected String prevLessonId;
    @XmlElement(required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar timestamp;
    @XmlElement(required = true)
    protected String whizzLessonSuggestion;

    /**
     * Gets the value of the studentId property.
     * 
     */
    public int getStudentId() {
        return studentId;
    }

    /**
     * Sets the value of the studentId property.
     * 
     */
    public void setStudentId(int value) {
        this.studentId = value;
    }

    /**
     * Gets the value of the prevStudentScore property.
     * 
     */
    public int getPrevStudentScore() {
        return prevStudentScore;
    }

    /**
     * Sets the value of the prevStudentScore property.
     * 
     */
    public void setPrevStudentScore(int value) {
        this.prevStudentScore = value;
    }

    /**
     * Gets the value of the prevLessonId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPrevLessonId() {
        return prevLessonId;
    }

    /**
     * Sets the value of the prevLessonId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPrevLessonId(String value) {
        this.prevLessonId = value;
    }

    /**
     * Gets the value of the timestamp property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getTimestamp() {
        return timestamp;
    }

    /**
     * Sets the value of the timestamp property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setTimestamp(XMLGregorianCalendar value) {
        this.timestamp = value;
    }

    /**
     * Gets the value of the whizzLessonSuggestion property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWhizzLessonSuggestion() {
        return whizzLessonSuggestion;
    }

    /**
     * Sets the value of the whizzLessonSuggestion property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWhizzLessonSuggestion(String value) {
        this.whizzLessonSuggestion = value;
    }

}
