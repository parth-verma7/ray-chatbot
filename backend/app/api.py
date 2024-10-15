from fastapi import FastAPI, File, UploadFile, Form
from services import server
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import json
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload_sources")
async def upload_sources(
    files: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None),
    qNa: Optional[str] = Form(None),
    links: Optional[str] = Form(None)
):

    if qNa: qNa=json.loads(qNa)
    if links: links=json.loads(links)
    else: links = []

    pdf_contents=None
    if files and files.size>0:
        if files.content_type == "application/pdf":
            pdf_contents = await files.read()
            '''
                Since we are sending the pdf file in form of Bytes from frontend, 
                therefore we need to send convert it into BytesIO format which PdfReader accepts!!
            '''
            print("Pdf file is uploaded")

    else: 
        print("Not uploaded pdf file")

    status_stored=server.store_data(pdf_contents, text, qNa, links)
    return {"text": status_stored}
    

@app.post("/query")
async def query(
    user_query: str = Form(...),
    sources: str = Form(...),    
):
    print(user_query)
    print(sources)
    sources=json.loads(sources)
    print(type(sources))
    
    llm_response = server.query_results(user_query, sources)
    return {"text": f"{llm_response}"}
        