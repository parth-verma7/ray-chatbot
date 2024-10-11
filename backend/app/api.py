from fastapi import FastAPI, File, UploadFile, Form
from pydantic import BaseModel
from services import server
from typing import Union
app = FastAPI()

@app.post("/upload_sources")
async def upload_sources(
    file: Union[UploadFile, str] = File(...),
    text: str = Form(...),
    qNa: str = Form(...),
    links: str = Form(...),
):
    import json
    if qNa: qNa=json.loads(qNa)
    if links: links=json.loads(links)
    else: links = []

    pdf_contents=None
    if file.size>0:
        print("file size is: ", file.size)
        if file.content_type == "application/pdf":
            pdf_contents = await file.read()
            '''
                Since we are sending the pdf file in form of Bytes from frontend, 
                therefore we need to send convert it into BytesIO format which PdfReader accepts!!
            '''
            print("Pdf file is uploaded")

    else: 
        print("Not uploaded pdf file")

    if not len(text): text=None
    if not len(qNa): qNa=None
    if not len(links): links=None

    # return "success"
    status_stored=server.store_data(pdf_contents, text, qNa, links)
    return {"text": status_stored}
    
    
class QueryRequest(BaseModel):
    query: str

@app.post("/query")
async def query(request: QueryRequest):
    query=request.query
    llm_response = server.query_results(query)
    return {"text": f"{llm_response}"}
    