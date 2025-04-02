//menuHandler.gs
/**
 * Google Sheets LLM Integration
 * Menu handler for Google Sheets integration
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

function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('LLM Menu')
      .addItem('APIs Setup', 'saveApiKeys')
      .addSeparator()
      .addItem('Response generation', 'generateResponse')
      .addSeparator()
      .addItem('About OpenAI (=LLM)', 'showOpenAIInfo')
      .addItem('About Claude (=LLMC)', 'showClaudeInfo')
      .addItem('Claude Documentation', 'showClaudeDocumentation')
      .addToUi();
  }

function showClaudeDocumentation() {
  var htmlOutput = HtmlService
    .createHtmlOutput(
      '<h2>Claude API Documentation</h2>' +
      '<p>Detailed documentation is available in the following files:</p>' +
      '<ul>' +
      '<li><strong>LLMC_Documentation.md</strong> - Complete function documentation with examples</li>' +
      '<li><strong>LLMC_CheatSheet.md</strong> - Quick reference for common patterns</li>' +
      '</ul>' +
      '<p>These files are located in your project directory.</p>'
    )
    .setWidth(400)
    .setHeight(300);
  
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Claude Documentation');
}

function showOpenAIInfo() {
  var message = "Use the =LLM() function to access OpenAI models.\n\n" +
                "Example: =LLM(A1, \"Summarize this text\", \"gpt-4o-mini\", 0)\n\n" +
                "Parameters:\n" +
                "1. Input text (required)\n" +
                "2. Prompt/instructions (required)\n" +
                "3. Model name (optional, default: gpt-4o-mini)\n" +
                "4. Temperature (optional, default: 0)";
  
  SpreadsheetApp.getUi().alert(message);
}

function showClaudeInfo() {
  var message = "Use the =LLMC() function to access Claude models.\n\n" +
                "Basic Example: =LLMC(A1, \"You are a helpful assistant.\")\n\n" +
                "Advanced Example: =LLMC(A1, \"You are a data analyst.\", \"<instructions>Analyze this data.</instructions><data>{inputText}</data>\", \"<analysis>\", [\"</analysis>\"])\n\n" +
                "Parameters:\n" +
                "1. Input text (required): The text to be processed\n" +
                "2. System prompt (required): Instructions for the model's role and behavior\n" +
                "3. User prompt structure (optional): XML-tagged prompt structure with {inputText} placeholder\n" +
                "4. Assistant start (optional): Starting text for the response\n" +
                "5. Stop sequences (optional): Array of sequences to stop generation\n" +
                "6. Model name (optional, default: claude-3-7-sonnet-20250219)\n" +
                "7. Max tokens (optional, default: 1024)\n" +
                "8. Temperature (optional, default: 0)\n\n" +
                "See LLMC_Documentation.md for detailed usage instructions.";
  
  SpreadsheetApp.getUi().alert(message);
}
