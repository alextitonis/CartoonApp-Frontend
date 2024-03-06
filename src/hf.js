import { HfInference } from "@huggingface/inference";
import Replicate from "replicate";
const key = "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";
const hf = new HfInference(key);
const replicate = new Replicate({
  auth: "r8_VJloyKSeQIhNprd2sTkct0B2xFYJsZM0ea8pO",
});
import { Buffer } from "buffer";
window.Buffer = window.Buffer || Buffer;

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
