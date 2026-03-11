const dotenv = require("dotenv");
dotenv.config();
// const { Configuration, OpenAIApi } = require("openai");
/* const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}); */
// const openai = new OpenAIApi(configuration);

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Text is required for summarization." });
    }

    console.log("Text to summarize:", text);

    // ✅ Use cheaper model for free-friendly testing
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // free-trial friendly
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes text concisely.",
        },
        {
          role: "user",
          content: `Summarize this text:\n${text}`,
        },
      ],
      max_tokens: 200, // small token limit for testing
      temperature: 0.5,
    });

    const summary = response.choices[0].message.content;

    return res.status(200).json({ summary });

  } catch (err) {
    console.error("OpenAI Error:", err);

    // Handle quota exceeded separately
    if (err.message.includes("429")) {
      return res.status(429).json({
        message: "Quota exceeded. Try again later or use a paid plan.",
      });
    }

    return res.status(500).json({
      message: err.message || "An error occurred while summarizing text.",
    });
  }
};
/* exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    console.log("text:", text);

    

    const response = await openai.responses.create({
      model: "gpt-4.1-mini", // latest summarization-ready model
      input: `Summarize this text:\n${text}`,
    });

    // response.output_text contains the generated summary
    return res.status(200).json({
      summary: response.output_text,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
}; */

/* exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    console.log("text:", text);
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    console.log("data:", data);
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
}; */
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `write a detail paragraph about \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer question similar to how yoda from star war would.
      Me: 'what is your name?'
      yoda: 'yoda is my name'
      Me: ${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `/* convert these instruction into javascript code \n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createImage({
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data) {
      if (data.data[0].url) {
        return res.status(200).json(data.data[0].url);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
