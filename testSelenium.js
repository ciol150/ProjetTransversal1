"use strict"; 
var webdriver = require("selenium-webdriver")


async function testConnection(){
    var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.edge())
        .build(); 

    //Connection
    await driver.get('http://localhost:4200/');
    await driver.findElement(webdriver.By.name("Pseudo")).sendKeys("lolo", webdriver.Key.RETURN);
    await driver.findElement(webdriver.By.name("Mot de Passe")).sendKeys("1234", webdriver.Key.RETURN);
    await driver.findElement(webdriver.By.name("seConnecter")).click();

    //chercher et prendre un livre
    await driver.findElement(webdriver.By.name("boutonMenuChercher")).click();
    await driver.findElement(webdriver.By.name("searchBook")).sendKeys("montagne", webdriver.Key.RETURN);
    await driver.findElement(webdriver.By.name("boutonChercher")).click();
    await driver.findElement(webdriver.By.name("boutonsPrendre")).click();

    //rendre un livre
    await driver.findElement(webdriver.By.name("boutonMenuListe")).click();
    await driver.findElement(webdriver.By.name("1")).click();
}


testConnection();