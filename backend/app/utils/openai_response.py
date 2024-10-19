from dotenv import load_dotenv
load_dotenv()
import os
from openai import OpenAI
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def openai_response(query:str, answer, instruction: str, links) -> str:

        added_links = f''' You can provide any of these hardcore links if user asks some query with respect to these data source from these links data which is fetched from vectordb - {links}'''
        user_message = f'''User's query: {query}.
                        You have to frame the response for this user's query.
                        If user query is a greeting message or something similar, reply with a conversation greeting message matching the user's tone. Keep your greeting responses short.
                        Else if the user is seeking information, use the following Vector DB results to frame the final answer: {answer}.
                        It is not necessary to use all the results from the Vector DB; use your judgment to frame a concise and precise response.
                        Follow the instructions carefully in system prompt and return always your response in Spanish Language and not considering the query language for your response.
                        You have to keep the user engaging so you can also suggest something related to the vector db results to bot and be proactive in responses. Dont make it long, keep it concise and short.'''

        if links: user_message = user_message + added_links
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system", 
                    "content": 
                        f'''You are an helpful AI assistant. 
                        You always have to return your response in Spanish even despite being the user query in any language. 
                        Follow these instructions carefully - {instruction} ''', 
                },
                {
                    "role": "user", 
                    "content": user_message
                }
            ]
        )
        return response.choices[0].message.content

# print(openai_response("What is science in short?")) 
        