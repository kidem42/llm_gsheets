// responseGenerator.gs
/**
 * Google Sheets LLM Integration
 * Response generation functionality for Google Sheets
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
 * 2. Anthropic Claude API
 *    - Copyright (c) Anthropic
 *    - Licensed under Anthropic's Terms of Service
 *    - https://www.anthropic.com/terms
 * 
 * 3. This project
 *    - Copyright (c) 2025 Pavel Kravets
 *    - Licensed under the Apache License, Version 2.0
 *    - See LICENSE file for details
 */

/**
 * Generates a response using the LLMC function with parameters from specific cells
 * and writes the result to a target cell.
 */
function generateResponse() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Read values from the specified cells
  var inputText = sheet.getRange("I3").getValue() || "";
  var systemPrompt = sheet.getRange("K3").getValue() || "";
  
  // For optional parameters, set userPromptStructure to empty string
  var userPromptStructure = "";
  
  var assistantStartCell = sheet.getRange("M3").getValue();
  var assistantStart = assistantStartCell ? assistantStartCell : "";
  
  var stopSequencesCell = sheet.getRange("N3").getValue();
  var stopSequences = parseStopSequences(stopSequencesCell);
  
  var modelCell = sheet.getRange("O3").getValue();
  var model = modelCell ? modelCell : 'claude-3-7-sonnet-20250219';
  
  var max_tokensCell = sheet.getRange("P3").getValue();
  var max_tokens = 1024; // Default value
  
  if (max_tokensCell !== null && max_tokensCell !== "") {
    // If value is already a number, use it directly
    if (typeof max_tokensCell === 'number') {
      max_tokens = max_tokensCell;
    } else {
      // If value is a string, try to convert it to a number
      // Replace comma with dot for proper decimal handling
      var tokensStr = String(max_tokensCell).replace(',', '.');
      var parsedTokens = parseInt(tokensStr);
      
      // Check if the result is a valid number
      if (!isNaN(parsedTokens)) {
        max_tokens = parsedTokens;
      } else {
        Logger.log("Warning: Could not parse max_tokens value: " + max_tokensCell);
      }
    }
  }
  
  var temperatureCell = sheet.getRange("Q3").getValue();
  var temperature = 0; // Default value
  
  if (temperatureCell !== null && temperatureCell !== "") {
    // If value is already a number, use it directly
    if (typeof temperatureCell === 'number') {
      temperature = temperatureCell;
    } else {
      // If value is a string, try to convert it to a number
      // Replace comma with dot for proper decimal handling
      var tempStr = String(temperatureCell).replace(',', '.');
      var parsedTemp = parseFloat(tempStr);
      
      // Check if the result is a valid number
      if (!isNaN(parsedTemp)) {
        temperature = parsedTemp;
      } else {
        Logger.log("Warning: Could not parse temperature value: " + temperatureCell);
      }
    }
  }
  
  // Log the parameters for debugging
  Logger.log("LLMC Parameters:");
  Logger.log("inputText: " + inputText);
  Logger.log("systemPrompt: " + systemPrompt);
  Logger.log("userPromptStructure: " + userPromptStructure);
  Logger.log("assistantStart: " + assistantStart);
  Logger.log("stopSequences: " + JSON.stringify(stopSequences));
  Logger.log("model: " + model);
  Logger.log("max_tokens: " + max_tokens);
  Logger.log("temperature: " + temperature);
  
  try {
    // Check if required parameters are provided
    if (!inputText) {
      throw new Error("Input text (cell I3) is required");
    }
    
    if (!systemPrompt) {
      throw new Error("System prompt (cell K3) is required");
    }
    
    // Call the LLMC function with the parameters
    var result = LLMC(
      inputText,
      systemPrompt,
      userPromptStructure,
      assistantStart,
      stopSequences,
      model,
      max_tokens,
      temperature
    );
    
    // Write the result to cell I23
    sheet.getRange("I23").setValue(result);
    
    // Show a success message
    SpreadsheetApp.getUi().alert("Response generated successfully!");
  } catch (error) {
    // Show an error message if something goes wrong
    SpreadsheetApp.getUi().alert("Error generating response: " + error.message);
    Logger.log("Error in generateResponse: " + error.toString());
  }
}

/**
 * Helper function to parse stop sequences from a cell value.
 * @param {any} value - The value from the cell containing stop sequences
 * @return {Array} An array of stop sequences
 */
function parseStopSequences(value) {
  var stopSequences = [];
  
  if (value) {
    try {
      // Try to parse as JSON first
      if (typeof value === 'string' && (value.startsWith('[') && value.endsWith(']'))) {
        stopSequences = JSON.parse(value);
      } else {
        // If not valid JSON, try to split by comma
        stopSequences = value.toString().split(',').map(item => item.trim());
      }
    } catch (e) {
      Logger.log("Error parsing stop sequences: " + e.toString());
      // If parsing fails, return an empty array
      stopSequences = [];
    }
  }
  
  return stopSequences;
}
