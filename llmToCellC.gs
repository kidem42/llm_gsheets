// llmToCellC.gs
/**
 * Google Sheets LLM Integration
 * Claude API integration for Google Sheets
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

// Global variables for Claude integration
/**
 * Custom function to send a request to the Claude API with advanced prompting features.
 * @param {string} inputText The text to send to the API.
 * @param {string} systemPrompt The system instructions for the model.
 * @param {string=} userPromptStructure Optional structured prompt with XML tags. Use {inputText} placeholder for input.
 * @param {string=} assistantStart Optional starting text for assistant's response.
 * @param {string[]=} stopSequences Optional array of sequences that will stop generation.
 * @param {string=} model The model to use (default: 'claude-3-7-sonnet-20250219').
 * @param {number=} max_tokens The maximum number of tokens to generate (default: 1024).
 * @param {number=} temperature The temperature to use, lower is more precise, higher is more creative (default: 0).
 * @returns {string} The response from the Claude API.
 * @customfunction
 */
function LLMC(inputText, systemPrompt, userPromptStructure = "", assistantStart = "", stopSequences = [], model = 'claude-3-7-sonnet-20250219', max_tokens = 1024, temperature = 0) {
  const apiKey = getApiKey('claude');
  if (!apiKey) {
    throw new Error('Claude API key not set. Please visit the "LLM Menu > APIs Setup" menu to set your API key.');
  }
  
  // Validate and set default values for all parameters
  inputText = inputText || "";
  systemPrompt = systemPrompt || "";
  userPromptStructure = userPromptStructure || "";
  assistantStart = assistantStart || "";
  stopSequences = Array.isArray(stopSequences) ? stopSequences : [];
  model = model || 'claude-3-7-sonnet-20250219';
  max_tokens = Number(max_tokens) || 1024;
  temperature = Number(temperature) >= 0 ? Number(temperature) : 0;

  // Prepare messages array
  const messages = [];
  
  // Add user message
  if (userPromptStructure) {
    // If structured prompt is provided, replace {inputText} placeholder
    messages.push({
      "role": "user",
      "content": userPromptStructure.replace("{inputText}", inputText)
    });
  } else {
    // Otherwise use simple text input
    messages.push({
      "role": "user",
      "content": inputText
    });
  }
  
  // Add assistant message if provided
  if (assistantStart) {
    messages.push({
      "role": "assistant",
      "content": assistantStart
    });
  }

  // Prepare API request payload
  const payload = {
    "model": model,
    "max_tokens": max_tokens,
    "temperature": temperature,
    "system": systemPrompt,
    "messages": messages
  };
  
  // Add stop sequences if provided
  if (stopSequences && stopSequences.length > 0) {
    payload.stop_sequences = stopSequences;
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    method: "POST",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch("https://api.anthropic.com/v1/messages", options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    if (responseCode !== 200) {
      Logger.log('Error response from Claude API: ' + responseText);
      throw new Error(`Claude API returned error ${responseCode}: ${responseText}`);
    }
    
    const json = JSON.parse(responseText);
    
    if (!json.content || !json.content[0] || !json.content[0].text) {
      throw new Error('Invalid response format from Claude API');
    }
    
    return json.content[0].text;
  } catch (error) {
    Logger.log('Error in Claude API call: ' + error.toString());
    throw error;
  }
}
