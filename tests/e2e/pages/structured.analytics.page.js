/**
* @file structured.analytics.page.js
*/

var path = require('path');
var helpers = require('../helpers/helpers');
var SamplePage = require('./sample.page');
var AnalyticPage = require('./analytic.page');
var EC = protractor.ExpectedConditions;

function StructuredAnalyticsPage() {

  // Define text artifact page object attributes.
  this.mainElements = {
    // Form main elements.
    titleField: $('#taxonomy-form-term #edit-name'),
    descriptionField: $('#taxonomy-form-term  #edit-description-value'),
    addQuestionSet: $('.entityconnect-add input'),
  };

  this.publishButton = $('#edit-submit');

  this.checkMandatoryFields = function () {
    this.publishButton.click();
    SamplePage.checkMessage('Title field is required.');
  };

  this.checkMainElementsPresence = function () {
    for (var key in this.mainElements) {
      expect(this.mainElements[key].isPresent()).toBe(true);
    }
  };

  this.add = function(title) {
    AnalyticPage.get();
    this.mainElements.addQuestionSet.click();
    browser.wait(EC.visibilityOf(this.mainElements.titleField), browser.params.timeoutLimit);
    this.mainElements.titleField.sendKeys(title);
    this.mainElements.descriptionField.sendKeys('Question set description');
    this.publishButton.click();
    browser.wait(EC.visibilityOf(AnalyticPage.mainElements.questionSetField), browser.params.timeoutLimit);
  };

};

module.exports = new StructuredAnalyticsPage();
