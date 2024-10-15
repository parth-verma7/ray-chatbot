from dotenv import load_dotenv
load_dotenv()
import os
from openai import OpenAI
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def openai_response(query:str, answer) -> str:

    user_query=f'''User's query: {query}. You have to frame the final answer of this 
    query by extracting answers from this knowledge base - {answer}'''

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": user_query}]
    )
    return response.choices[0].message.content

# print(openai_response("What is science in short?"))
        