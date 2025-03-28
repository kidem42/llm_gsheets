// llmToCellC.gs
/**
 * Google Sheets LLM Integration
 * Claude API integration for Google Sheets
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
