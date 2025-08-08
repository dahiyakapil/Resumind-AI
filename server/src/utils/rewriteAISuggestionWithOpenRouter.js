// utils/rewriteWithOpenRouter.js
import axios from "axios";


export const rewriteAISuggestionWithOpenRouter = async (text) => {
    const prompt = `
You are an expert resume writing assistant.

Rewrite the following resume bullet point to be stronger, concise, and start with a powerful action verb.

Return ONLY one rewritten bullet point. Do NOT return multiple options. Do NOT include explanations, footnotes, markdown, or comments.

Just respond with one clean bullet point.

Original:
"${text}"

Rewritten:
`;



    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "mistralai/mixtral-8x7b-instruct",
                messages: [
                    { role: "system", content: "You are a resume rewriting assistant." },
                    { role: "user", content: prompt },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "HTTP-Referer": "https://yourdomain.com",
                    "X-Title": "ScanHire Rewrite Tool",
                },
            }
        );

        let result = response.data.choices[0].message.content.trim();

        // Step 1: Take only the first line (in case AI adds explanations)
        result = result.split("\n")[0];

        // Step 2: Strip quotes and special characters
        result = result.replace(/^["'“”]+|["'“”]+$/g, "").trim();

        // Step 3: Final fallback — pick first sentence if multiple options present
        if (result.includes(" or ")) {
            result = result.split(" or ")[0].trim();
        }

        return result;



        return result;
    } catch (err) {
        console.error("⚠️ AI Rewrite Error:", err.message);
        throw new Error("Failed to rewrite bullet point.");
    }
};
