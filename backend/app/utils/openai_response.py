from dotenv import load_dotenv
load_dotenv()
import os
from openai import OpenAI
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def openai_response(query:str, answer) -> str:

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system", 
                    "content": '''You are a helpful AI assistant. Respond concisely and clearly to any user query, either with greetings or information as appropriate. Respond in the same Language as you receive the user's query. Use the Vector DB results when relevant.'''
                },
                {
                    "role": "user", 
                    "content": f'''
                        User's query: {query}.
                        You have to frame the response for this user's query.
                        If user query is a greeting message or something similar, reply with a conversation greeting message matching the user's tone.
                        Else if the user is seeking information, use the following Vector DB results to frame the final answer: {answer}.
                        It is not necessary to use all the results from the Vector DB; use your judgment to frame a concise and precise response.
                    '''
                }
            ]
        )
        return response.choices[0].message.content

# print(openai_response("What is science in short?"))
        