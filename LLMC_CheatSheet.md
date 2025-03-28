# Claude API Cheat Sheet for Google Sheets

## Basic Function Call

```
=LLMC(inputText, systemPrompt)
```

Example:
```
=LLMC("Summarize this paragraph.", "You are a helpful assistant.")
```

## Full Function Signature

```
=LLMC(
  inputText,
  systemPrompt,
  userPromptStructure,
  assistantStart,
  stopSequences,
  model,
  max_tokens,
  temperature
)
```

## System Instructions Best Practices

1. **Be specific about the role**:
   ```
   "You are a financial analyst with expertise in cryptocurrency markets."
   ```

2. **Define the tone and style**:
   ```
   "You are a science educator who explains complex concepts in simple terms suitable for high school students."
   ```

3. **Specify output format preferences**:
   ```
   "You are a data analyst who presents information in concise bullet points with supporting statistics."
   ```

4. **Include domain expertise**:
   ```
   "You are a legal expert specializing in intellectual property law with 20 years of experience."
   ```

## Structured Prompting with XML Tags

### Common Tags

- `<instructions>` - Task directions
- `<data>` - Content to process
- `<context>` - Background information
- `<example>` - Example of desired output
- `<format>` - Output format specifications

### Template Structure

```
<instructions>
  Clear directions about what to do with the input
</instructions>

<data>
  {inputText}
</data>

<format>
  Specifications about how the output should be formatted
</format>
```

## Quick Examples

### Text Analysis

```
=LLMC(
  A1,
  "You are an expert in textual analysis.",
  "<instructions>Identify the main themes, tone, and key points.</instructions><data>{inputText}</data>"
)
```

### Data Extraction

```
=LLMC(
  A1,
  "You are a data extraction specialist.",
  "<instructions>Extract all dates, names, and monetary values.</instructions><data>{inputText}</data>",
  "<extracted_data>",
  ["</extracted_data>"]
)
```

### Format Conversion

```
=LLMC(
  A1,
  "You are a data formatting expert.",
  "<instructions>Convert this information to a CSV format with headers.</instructions><data>{inputText}</data>",
  "```csv\n",
  ["\n```"]
)
```

## Troubleshooting

1. **If responses are too long**: Reduce max_tokens or use stop sequences
2. **If responses are off-topic**: Make system prompt more specific
3. **If format is inconsistent**: Use assistantStart and stopSequences to enforce structure
4. **If responses lack detail**: Increase max_tokens and add specific instructions
5. **If responses are too generic**: Lower temperature (closer to 0) for more deterministic outputs
