import os
from pinecone import Pinecone
from dotenv import load_dotenv
from pinecone import ServerlessSpec

load_dotenv()

def store_to_pinecone(vectorstore: list, index_name: str, namespace_name: str) -> bool:
    try:
        pinecone_api_key=os.getenv('PINECONE_API_KEY')
        pc = Pinecone(api_key=pinecone_api_key)

        existing_indexes=pc.list_indexes()
        if index_name not in existing_indexes:
        
            pc.create_index(
                name=index_name, 
                dimension=384, 
                metric="cosine", 
                spec=ServerlessSpec(cloud="aws",region="us-east-1")
            )

        index = pc.Index(index_name)

        data=index.describe_index_stats()
        namespaces=list(data["namespaces"].keys())

        if namespace_name in namespaces:
            index.delete(delete_all=True, namespace=namespace_name)

        index.upsert(
            vectors=vectorstore,
            namespace=namespace_name
        )
        
        return True
    
    except Exception as e:
        print(e)
        return False
