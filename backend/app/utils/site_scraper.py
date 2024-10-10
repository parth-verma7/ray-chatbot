from langchain_community.document_loaders import AsyncHtmlLoader
from langchain_community.document_transformers import Html2TextTransformer
html2text = Html2TextTransformer()

def scrape_sites(urls:list) -> list[str]:
    scraped_content=[]
    loader = AsyncHtmlLoader(urls)
    docs = loader.load()
    docs_transformed = html2text.transform_documents(docs)

    for i in range(0, len(docs_transformed)):
        scraped_content.append({urls[i]: docs_transformed[i].page_content})

    combined_content = " ".join(item["content"] for item in scraped_content)
    return combined_content