// apiKeys.gs 
/**
 * Google Sheets LLM Integration
 * API key management for Google Sheets integration
 * 
 * Copyright (C) 2025
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 * Dependencies and Licenses:
 * 1. Google Apps Script
 *    - Copyright (c) Google LLC
 *    - Licensed under the Apache License 2.0
 *    - https://developers.google.com/apps-script/terms
 * 
 * 2. This project
 *    - Licensed under GNU General Public License v3.0
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
