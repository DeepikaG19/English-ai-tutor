require('dotenv').config();
const OpenAI = require('openai');
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

async function test() {
  try {
    const level = 'beginner';
    const evaluationCriteria = 'Check basic grammar (articles, tenses), pronunciation clues if possible, and sentence completeness. If they use wrong answers/grammar, provide a CLEAR-CUT grammatical explanation naming the exact rule (e.g. missing article, wrong tense).';
    const maxScore = 5;
    const userInput = 'I goes to school yesterday.';
    
    const systemPrompt = `You are an English Tutor evaluating a student's speaking practice.
Level: ${level}

Evaluate the student's input based on the following criteria for the ${level} level:
${evaluationCriteria}

Provide the response in the following JSON format EXACTLY. Ensure the "score" is a number out of ${maxScore}.
{
  "correctedText": "The corrected and improved version of the text",
  "feedback": "List of mistakes identified or general feedback",
  "explanationEnglish": "Simple English explanation of the mistakes and how to improve",
  "explanationTamil": "Explanation of the mistakes and how to improve translated to Tamil",
  "explanationHindi": "Explanation of the mistakes and how to improve translated to Hindi",
  "score": "Score out of ${maxScore} formatted exactly as 'X/${maxScore}' (e.g., '4/${maxScore}')"
}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Student Input: "${userInput}"` }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: "json_object" }
    });
    console.log(chatCompletion.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
}
test();
