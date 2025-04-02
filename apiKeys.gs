// apiKeys.gs 
/**
 * Google Sheets LLM Integration
 * API key management for Google Sheets integration
 * 
 * Copyright (c) 2025 Pavel Kravets
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Dependencies and Licenses:
 * 1. Google Apps Script
 *    - Copyright (c) Google LLC
 *    - Licensed under the Apache License 2.0
 *    - https://developers.google.com/apps-script/terms
 * 
 * 2. This project
 *    - Copyright (c) 2025 Pavel Kravets
 *    - Licensed under the Apache License, Version 2.0
 *    - See LICENSE file for details
 */

function saveApiKeys() {
    var html = HtmlService.createHtmlOutputFromFile('KeyMenu')
        .setWidth(400)
        .setHeight(200)
        .setTitle('API Keys Setup');
    SpreadsheetApp.getUi().showModalDialog(html, 'API Keys Setup');
  }
function saveApiKey(apiKey, service) {
    try {
      switch(service) {
        case 'openai':
          PropertiesService.getScriptProperties().setProperty('OPENAI_API_KEY', apiKey);
          break;
        case 'claude':
          PropertiesService.getScriptProperties().setProperty('CLAUDE_API_KEY', apiKey);
          break;
        // Another services can be added
      }
      return true;
    } catch (error) {
      Logger.log('Error saving API key: ' + error.toString());
      return false;
    }
  }
  
  // Request for keys
  function getApiKey(service) {
    try {
      switch(service) {
        case 'openai':
          return PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
        case 'claude':
          return PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');
        default:
          return null;
      }
    } catch (error) {
      Logger.log('Error getting API key: ' + error.toString());
      return null;
    }
  }
  function showSuccessMessage() {
    SpreadsheetApp.getUi().alert('API keys have been updated successfully!');
  }
