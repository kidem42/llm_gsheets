# Google Sheets LLM Integration

Simple integration of OpenAI and Claude AI models with Google Sheets through custom functions.

## Installation

1. Open your Google Sheet
2. Go to Extensions > Apps Script
3. Copy and paste the following files into your Apps Script project:
   - `llmToCellO.gs` (OpenAI integration)
   - `llmToCellC.gs` (Claude integration)
   - `apiKeys.gs` (API key management)
   - `menuHandler.gs` (UI menu creation)
   - `KeyMenu.html` (API key setup interface)
4. Save the project
5. Refresh your Google Sheet

## API Key Setup

1. After installation, you'll see a new "LLM Menu" in your Google Sheets menu bar
2. Click on "LLM Menu > APIs Setup"
3. Enter your API keys:
   - OpenAI API key (get from [OpenAI Platform](https://platform.openai.com/api-keys))
   - Claude API key (get from [Anthropic Console](https://console.anthropic.com/))
4. Click "Save"

## Using the Functions

### OpenAI Function (LLM)

Basic usage:
```
=LLM(A1, "Summarize this text")
```

Full syntax:
```
=LLM(inputText, prompt, model, temperature)
```

Parameters:
- `inputText`: Content to process (required)
- `prompt`: Instructions for the AI model (required)
- `model`: AI model to use (optional, default: "gpt-4o-mini")
- `temperature`: Creativity setting 0-1 (optional, default: 0)

### Claude Function (LLMC)

Basic usage:
```
=LLMC(A1, "You are a helpful assistant.")
```

Full syntax:
```
=LLMC(inputText, systemPrompt, userPromptStructure, assistantStart, stopSequences, model, max_tokens, temperature)
```

Parameters:
- `inputText`: Content to process (required)
- `systemPrompt`: Instructions for the model's role (required)
- `userPromptStructure`: XML-tagged prompt with {inputText} placeholder (optional)
- `assistantStart`: Starting text for the response (optional)
- `stopSequences`: Array of sequences to stop generation (optional)
- `model`: Claude model to use (optional, default: "claude-3-7-sonnet-20250219")
- `max_tokens`: Maximum tokens to generate (optional, default: 1024)
- `temperature`: Creativity setting 0-1 (optional, default: 0)

### Alternative: Using Response Generator

For users who prefer a more structured approach, you can use the built-in Response Generator interface:

1. Click on "LLM Menu > Response generation"
2. Fill in the following cells in your sheet:
   - I3: Input text to process
   - K3: System prompt/instructions
   - L3: (Optional) User prompt structure with XML tags
   - M3: (Optional) Assistant's response start text
   - N3: (Optional) Stop sequences (comma-separated or JSON array)
   - O3: (Optional) Model name (default: claude-3-7-sonnet-20250219)
   - P3: (Optional) Max tokens (default: 1024)
   - Q3: (Optional) Temperature (default: 0)

3. The generated response will appear in cell I23

This method is particularly useful when:
- You need to process multiple inputs in sequence
- You want to keep a record of your prompts and responses
- You prefer a visual interface over formula syntax
Alternative: Using Response Generator
For users who prefer a more structured approach, you can use the built-in Response Generator interface:

1. Click on "LLM Menu > Response generation"
2. Fill in the following cells in your sheet:

   I3: Input text to process
   K3: System prompt/instructions
   L3: (Optional) User prompt structure with XML tags
   M3: (Optional) Assistant's response start text
   N3: (Optional) Stop sequences (comma-separated or JSON array)
   O3: (Optional) Model name (default: claude-3-7-sonnet-20250219)
   P3: (Optional) Max tokens (default: 1024)
   Q3: (Optional) Temperature (default: 0)


3. The generated response will appear in cell I23

This method is particularly useful when:
   You need to process multiple inputs in sequence
   You want to keep a record of your prompts and responses
   You prefer a visual interface over formula syntax
   The layout can be configured for specific user tasks as needed
This approach helps bypass the cell content limitations (below 2048 tokens) when using formulas, providing a significantly higher token threshold

## Additional Information

For more detailed documentation, see:
- LLMC_Documentation.md - Complete function documentation
- LLMC_CheatSheet.md - Quick reference guide

Access documentation through the menu: "LLM Menu > About OpenAI" or "LLM Menu > About Claude"

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

### Dependencies and Licenses

1. Google Apps Script
   - Copyright (c) Google LLC
   - Licensed under the Apache License 2.0
   - [Terms of Service](https://developers.google.com/apps-script/terms)

2. Anthropic Claude API
   - Copyright (c) Anthropic
   - Licensed under Anthropic's Terms of Service
   - [Terms of Service](https://www.anthropic.com/terms)

3. This project
   - Licensed under GNU General Public License v3.0
   - See LICENSE file for details

### What this means for you:
- You can freely use, modify, and distribute this software
- If you distribute modified versions, they must also be under the GPL v3
- You must include the original copyright notice and license
- The full license text is available at [gnu.org/licenses/gpl-3.0](https://www.gnu.org/licenses/gpl-3.0.html)
