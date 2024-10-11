import toml
from utils import text_splitter
from models import load_model
from utils import store_to_pinecone, query_to_pinecone
from utils import vectorstore_embeddings, site_scraper, openai_response

config = toml.load('config.toml')
index=config['pinecone']['index']
top_k=config['pinecone']['top_k']

chunk_size = config['text_splitter']['CHUNK_SIZE']
chunk_overlap = config['text_splitter']['CHUNK_OVERLAP']

model_name=config['model']['MODEL_NAME']
tokenizer, model = load_model.load_model(model_name)

def pinecone_operations(total_text:list, namespace:str):
    vectorstore=vectorstore_embeddings.create_vector_store(total_text, tokenizer, model)
    storing_pinecone_status=store_to_pinecone.store_to_pinecone(vectorstore, index, namespace)
    return storing_pinecone_status

def pinecone_qna_operations(qNa:dict, namespace: str):
    vectorstore=vectorstore_embeddings.create_vector_store_qna(qNa, tokenizer, model)
    storing_pinecone_status=store_to_pinecone.store_to_pinecone(vectorstore, index, namespace)
    if(storing_pinecone_status): return True
    else: return False

def store_data(pdf_contents: str, text: str, qNa: dict, links: list):
    # for pdf
    pdf_status=False
    txt_status=False
    links_status=False
    qna_status=False

    print("chk krlo:", pdf_contents, text, qNa, links)
    if pdf_contents:
        total_text=text_splitter.extract_text_from_pdf(pdf_contents, chunk_size, chunk_overlap)
        pdf_status=pinecone_operations(total_text, config['pinecone']['pdf_namespace'])

    # for text
    if text:
        texts=text_splitter.extract_text_from_string(text, chunk_size, chunk_overlap)
        txt_status=pinecone_operations(texts, config['pinecone']['text_namespace'])

    # for qNa
    if qNa:
        qna_status=pinecone_qna_operations(qNa, config['pinecone']['qNa_namespace'])

    # for links
    if links:
        print("links found")
        scraped_data=site_scraper.scrape_sites(links)
        links_status=pinecone_operations(scraped_data, config['pinecone']['link_namespace'])

    return f"PDF Status: {pdf_status}, Text Status: {txt_status}, QnA Status: {qna_status}, Links Status: {links_status}"


def query_results(query, namespace):

    pinecone_results=query_to_pinecone.query_pinecone(tokenizer, model, query, index, namespace, top_k)
    llm_response=openai_response.openai_response(query, pinecone_results)

    return llm_response