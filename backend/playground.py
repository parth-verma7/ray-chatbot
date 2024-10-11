import os
from pinecone import Pinecone
from dotenv import load_dotenv
from pinecone import ServerlessSpec

load_dotenv()

pinecone_api_key=os.getenv('PINECONE_API_KEY')
pc = Pinecone(api_key=pinecone_api_key)

list_indexes=[]
index_description=pc.list_indexes()
for desc in index_description:
    list_indexes.append(desc['name'])

index = pc.Index("ray-chatbot")

data=index.describe_index_stats()
print(data)