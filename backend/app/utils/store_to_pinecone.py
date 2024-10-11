import os
from pinecone import Pinecone
from dotenv import load_dotenv
from pinecone import ServerlessSpec

load_dotenv()

def store_to_pinecone(vectorstore: list, index_name: str, namespace_name: str) -> bool:
    try:
        pinecone_api_key=os.getenv('PINECONE_API_KEY')
        pc = Pinecone(api_key=pinecone_api_key)

        list_indexes=[]
        index_description=pc.list_indexes()
        for desc in index_description:
            list_indexes.append(desc['name'])
        print("Existing indexes: ", list_indexes)

        if index_name not in list_indexes:
        
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
        namespaces=list(data["namespaces"].keys())

        index.upsert(
            vectors=vectorstore,
            namespace=namespace_name
        )
        namespaces=list(data["namespaces"].keys())

        return True
    
    except Exception as e:
        print("issue is: ", e)
        return False


# def delete_namespace_vectors(index_name):
#     try:
#         pinecone_api_key=os.getenv('PINECONE_API_KEY')
#         pc = Pinecone(api_key=pinecone_api_key)

#         list_indexes=[]
#         index_description=pc.list_indexes()
#         for desc in index_description:
#             list_indexes.append(desc['name'])

#         index = pc.Index(index_name)

#         data=index.describe_index_stats()
#         to_be_deleted_namespaces=list(data["namespaces"].keys())    
        
#         for ns in to_be_deleted_namespaces:
#             index.delete(delete_all=True, namespace=ns)
        
#         return index.describe_index_stats()
#     except Exception as e:
#         return e

# except Exception as e:
#     print("Deleting namespaces issue is : ", e)
#     return False