from fastapi import FastAPI, File, UploadFile, Form
from pydantic import BaseModel
from services import server

app = FastAPI()

@app.post("/upload_sources")
async def upload_sources(
    file: UploadFile = File(...),
    text: str = Form(...),
    qNa: dict = Form(...),
    links: list = Form(...),
):

    pdf_contents=None

    if file.content_type == "application/pdf":
        pdf_contents = await file.read()
        '''
            Since we are sending the pdf file in form of Bytes from frontend, 
            therefore we need to send convert it into BytesIO format which PdfReader accepts!!
        '''

    status_stored=server.store_data(pdf_contents, text, qNa, links)

    return {"text": status_stored}
    
    
class QueryRequest(BaseModel):
    query: str

@app.post("/query")
async def query(request: QueryRequest):
    query=request.query
    llm_response = server.query_results(query)
    try:
        return {"text": f"{llm_response.text}"}
    except:
        return {"text": f"{llm_response}"}