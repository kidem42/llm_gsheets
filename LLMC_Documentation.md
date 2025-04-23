# Claude API Integration Documentation

This document explains how to use the updated `LLMC()` function for Google Sheets integration with Claude AI.

## Function Signature

```javascript
LLMC(
  inputText,
  systemPrompt,
  userPromptStructure = "",
  assistantStart = "",
  stopSequences = [],
  model = 'claude-3-7-sonnet-20250219',
  max_tokens = 1024,
  temperature = 0
)
```

## Parameters

- **inputText** (required): The text to be processed by Claude
- **systemPrompt** (required): System instructions for the model (similar to a role or persona)
- **userPromptStructure** (optional): Structured prompt with XML tags. Use `{inputText}` as a placeholder for your input text. Note: This parameter is not used in the Response Generator feature.
- **assistantStart** (optional): Starting text for the assistant's response
- **stopSequences** (optional): Array of sequences that will stop generation
- **model** (optional): Claude model to use (default: 'claude-3-7-sonnet-20250219')
- **max_tokens** (optional): Maximum tokens to generate (default: 1024)
- **temperature** (optional): Controls randomness (0-1, default: 0)

## Basic Usage

```
=LLMC("Summarize the benefits of exercise", "You are a health expert providing concise information.")
```

## Advanced Usage with Structured Prompting

```
=LLMC(
  "Regular exercise improves cardiovascular health, builds muscle strength, enhances mental well-being, and helps maintain a healthy weight.",
  "You are a health expert who creates structured, concise summaries.",
  "<instructions>Create a bulleted list of health benefits from the following text.</instructions><data>{inputText}</data>",
  "<benefits>",
  ["</benefits>"]
)
```

## XML Tags for Structured Prompting

Claude works well with structured prompts using XML-style tags. Common tags include:

- `<instructions>`: Specific directions for the task
- `<data>`: The content to be processed
- `<example>`: Example format or output
- `<context>`: Background information
- `<format>`: Output format specifications

## Tips for Effective Prompting

1. **Be specific in system prompts**: Define the role, expertise level, and communication style
2. **Use structured tags**: Separate different parts of your prompt for clarity
3. **Provide examples**: When possible, show the desired output format
4. **Control output format**: Use assistant start text and stop sequences for consistent formatting
5. **Adjust temperature**: Lower (0-0.3) for factual tasks, higher (0.4-0.8) for creative tasks

## Example: Legal Document Analysis

```
=LLMC(
  "Tenant agrees to pay $1,500 monthly for the duration of this 12-month lease agreement, beginning January 1, 2025. Late payments incur a $50 fee if received after the 5th of each month.",
  "You are a legal analyst specializing in real estate law, known for highly accurate and detailed summaries.",
  "<instructions>Extract the key terms from this lease clause and organize them in a structured format.</instructions><data>{inputText}</data><example>Payment: $X monthly\nTerm: X months\nStart date: Date\nLate fee: $X after X days</example>",
  "<analysis>",
  ["</analysis>"]
)
```

## Example: Data Analysis

```
=LLMC(
  "Q1: 120 units, $45,000 | Q2: 150 units, $56,250 | Q3: 135 units, $50,625 | Q4: 180 units, $67,500",
  "You are a data analyst who provides clear insights and calculations.",
  "<instructions>Calculate the total annual sales and average quarterly sales from this data. Format as JSON.</instructions><data>{inputText}</data>",
  "```json\n{",
  ["\n}```"]
)
