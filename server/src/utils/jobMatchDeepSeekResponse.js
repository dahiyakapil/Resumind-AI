import axios from "axios";

export const jobMatchDeepSeekResponse = async (prompt) => {
  const modelId = "mistralai/mixtral-8x7b-instruct"; // ✅ Working model
  const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: modelId,
        messages: [
          {
            role: "system",
            content: "You are an expert resume-job match AI. Respond only in JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 20000, // 20 seconds timeout
      }
    );

    console.log("▶ Sending to OpenRouter (Job Match AI)");
    console.log("▶ Model Used:", modelId);

    const data = response.data;

    if (data.error) {
      console.error("❌ Error from OpenRouter:", data.error);
      throw new Error("OpenRouter returned an error");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("❌ OpenRouter Fetch Error:", error.message);
    throw new Error("Failed to get job match response");
  }
};
