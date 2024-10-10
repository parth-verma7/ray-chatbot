from langchain_community.document_loaders import AsyncHtmlLoader
from langchain_community.document_transformers import Html2TextTransformer
html2text = Html2TextTransformer()

def scrape_sites(urls:list) -> str:
    scraped_content=[]
    loader = AsyncHtmlLoader(urls)
    docs = loader.load()
    docs_transformed = html2text.transform_documents(docs)

    for i in range(len(docs_transformed)):
        scraped_content.append(docs_transformed[i].page_content)

    combined_content=" ".join(scraped_content)
    return combined_content