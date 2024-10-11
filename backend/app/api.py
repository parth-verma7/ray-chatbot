from fastapi import FastAPI, File, UploadFile, Form
from services import server
from typing import Union
import json
app = FastAPI()

@app.post("/upload_sources")
async def upload_sources(
    file: Union[UploadFile, str] = File(...),
    text: str = Form(...),
    qNa: str = Form(...),
    links: str = Form(...),
):
    if qNa: qNa=json.loads(qNa)
    if links: links=json.loads(links)
    else: links = []

    pdf_contents=None
    if file.size>0:
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
    

@app.post("/query")
async def query(
    user_query: str = Form(...),
    sources: str = Form(...),    
):
    sources=json.loads(sources)
    '''
    sources will look like:

    `
    {
        "pdf":True/False, 
        "text":True/False, 
        "qna": True/False, 
        "links":True/False
    }
    `
    '''
    llm_response = server.query_results(user_query, sources)
    return {"text": f"{llm_response}"}
