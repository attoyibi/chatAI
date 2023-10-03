// ./app/api/chat/route.ts
import { Message, AIStream, StreamingTextResponse } from 'ai';
import { cookies } from 'next/headers';
import baseUrl from "../../../../utils/apiConfig";


// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req) {
  // Extract the `prompt` from the body of the request
  const { messages, headers } = await req.json();
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  console.log(accessToken.value);
  console.log(`${baseUrl}/stream`);

  const prediction = await fetch(`${baseUrl}/stream`, 
  {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+accessToken.value
    },
    body: JSON.stringify({"message": messages[messages.length - 1].content})
  });

  

  // Convert the response into a friendly text-stream
  const stream = await AIStream(prediction);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}