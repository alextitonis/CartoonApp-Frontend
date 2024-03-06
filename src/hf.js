import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import Replicate from "replicate";
dotenv.config();
const key = process.env.HF_API_KEY;
const hf = new HfInference(key);
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const getHf = () => {
  return hf;
};

export async function textToImage(prompt) {
  const output = await replicate.run(
    "lucataco/ip-adapter-faceid:fb81ef963e74776af72e6f380949013533d46dd5c6228a9e586c57db6303d7cd",
    {
      input: {
        seed: 2212213399,
        width: 1024,
        height: 1024,
        prompt,
        face_image:
          "https://replicate.delivery/pbxt/K5DSwf3aUzIpS4srbRhNQkESybPovfXwEfjIuDMj3Dz86tDV/demo.png",
        num_outputs: 1,
        negative_prompt:
          "monochrome, lowres, bad anatomy, worst quality, low quality, blurry, multiple people",
        num_inference_steps: 30,
        agree_to_research_only: true,
      },
    }
  );
  return output[0];
}
