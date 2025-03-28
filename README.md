# Google Sheets LLM Integration

Simple integration of OpenAI and Claude AI models with Google Sheets through custom functions.

## Installation

1. Open your Google Sheet
2. Go to Extensions > Apps Script
3. Copy and paste the following files into your Apps Script project:
   - `llmToCellO.js` (OpenAI integration)
   - `llmToCellC.js` (Claude integration)
   - `apiKeys.js` (API key management)
   - `menuHandler.js` (UI menu creation)
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

## Additional Information

For more detailed documentation, see:
- LLMC_Documentation.md - Complete function documentation
- LLMC_CheatSheet.md - Quick reference guide

Access documentation through the menu: "LLM Menu > About OpenAI" or "LLM Menu > About Claude"

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

What this means for you:
- You can freely use, modify, and distribute this software
- If you distribute modified versions, they must also be under the GPL v3
- You must include the original copyright notice and license
- The full license text is available at [gnu.org/licenses/gpl-3.0](https://www.gnu.org/licenses/gpl-3.0.html)
