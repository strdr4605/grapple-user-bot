import axios from "axios";
const API_URL = "https://monacosolicitors-sandbox-304aa5.pipedrive.com/v1";

const DEAL_ID = "83164";

const DESC_KEY = "9f6700c8417daf29766b6634eab51d22ca745854";

export async function getDealContext() {
  const response = await axios.get<{ data: Record<string, unknown> }>(
    `${API_URL}/deals/${DEAL_ID}`,
    {
      headers: {
        "x-api-token": process.env.PIPEDRIVE_KEY,
      },
    },
  );

  // console.log("response.data: ", response.data);
  return response.data.data[DESC_KEY];
  // axios request to pipedrive
  //
  return `I began my employment with Mcdonalds in 2020 as a Cook and have consistently performed well over the past three years, receiving positive feedback from colleagues and management. However, in September, the work environment changed, and I started experiencing issues that have made it challenging for me to continue.

I believe I have been subjected to discrimination based on Race and age. Specific incidents include calling me names or kicking me Despite raising these concerns informally, no actions were taken by management to address the issues.

My annual income is approximately 45000, and I am currently considering my options, including possibly leaving my job due to the hostile work environment. I do not have a settlement agreement, but I would like to explore whether this could be an option to resolve the situation fairly and move forward.`;
}
