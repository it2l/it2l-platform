package com.italk2learn.bo.test;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class SeleniumLoginFrontendTest {

    private WebDriver browser;

    @Before
    public void setup() {
        browser = new FirefoxDriver();
    }

    @Test
    public void startTest() {
        browser.get("http://localhost:8080/italk2learn/login");

        //browser.findElement(By.id("login")).click();

        // Will throw exception if elements not found
        browser.findElement(By.id("j_username")).sendKeys("tludmetal");
        browser.findElement(By.id("j_password")).sendKeys("12345");

        browser.findElement(By.id("loginButton")).click();
        browser.findElement(By.id("account")).click();

        assertEquals("Done", browser.findElement(By.id("done")).getAttribute("value"));
    }

    @After
    public void tearDown() {
        browser.close();
    }
}