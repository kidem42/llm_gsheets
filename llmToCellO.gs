// llmToCellO.gs
/**
 * Google Sheets LLM Integration
 * OpenAI API integration for Google Sheets
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

/**
 * Fetches the stored OpenAI API key from script storage.
 * @returns {string} The configured OpenAI API key, or empty string if not configured.
 */

/**
 * Sheet function for OpenAI API integration.
 * @param {string} inputText Content to process with the AI model.
 * @param {string} prompt Instructions for the AI model.
 * @param {string=} model AI model identifier (defaults to 'gpt-4o-mini').
 * @param {string=} temperature Creativity setting - lower values for precision, higher for creativity (defaults to 0).
 * @returns {string} AI-generated response text.
 * @customfunction
 */
function LLM(inputText, prompt, model = 'gpt-4o-mini', temperature = 0) {
    // Log function inputs for debugging
    Logger.log(`LLM function called with: inputText length=${inputText.length}, prompt="${prompt}", model=${model}, temperature=${temperature}`);
    
    const apiKey = getApiKey('openai');  // Using shared API constants
    Logger.log(`API Key retrieved: ${apiKey ? 'Success' : 'Failed'}`);
    if (!apiKey) {
      throw new Error('OpenAI API key not set. Please visit the "LLM > Settings" menu to set your API key.');
    }
  
    const systemContent = "You are a helpful assistant.";
  
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      method: "POST",
      payload: JSON.stringify({
        "model": model,
        "messages": [
          {
            "role": "system",
            "content": `${prompt}` // Instruction prompt
          },
          {
            "role": "user",
            "content": `${inputText}` // User content for processing
          }
        ],
        "temperature": temperature
      })
    };
  
    // Log request details before sending
    Logger.log(`Sending request to OpenAI API with model: ${model}`);
    
    try {
      const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", options);
      const responseCode = response.getResponseCode();
      Logger.log(`API Response received. Status code: ${responseCode}`);
      
      const json = JSON.parse(response.getContentText());
      Logger.log(`Response parsed successfully. Token usage: ${JSON.stringify(json.usage || 'Not available')}`);
      
      return json.choices[0].message.content;
    } catch (error) {
      // Log any errors that occur
      Logger.log(`Error in API request: ${error.toString()}`);
      throw error;
    }
  }
