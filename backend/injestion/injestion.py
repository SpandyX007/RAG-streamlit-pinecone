import os
import getpass
import bs4
from dotenv import load_dotenv

from fastapi import APIRouter
from pydantic import BaseModel
from session_store import update_session

from vectorDB.getDB import get_vecstore
from langchain_pinecone import PineconeVectorStore
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from fastapi import HTTPException

load_dotenv()

class weblink(BaseModel):
    weburl: str
    session_id: str

injestion_router = APIRouter()

@injestion_router.post('/link-injestion')
async def link_injest(webURL:weblink):
    # setting up Pinecone with embeddings
    vector_store = get_vecstore(namespace=webURL.session_id)

    # Loading the document
    # Only keep post title, headers, and content from the full HTML.
    # bs4_strainer = bs4.SoupStrainer(class_=("post-title", "post-header", "post-content"))
    # loader = WebBaseLoader(
    #     web_paths=(webURL.weburl,),
    #     bs_kwargs={"parse_only": bs4_strainer},
    # )
    # Set User-Agent to avoid the warning and potential 403 blocks from websites
    if not os.environ.get("USER_AGENT"):
        os.environ["USER_AGENT"] = "RAG_Streamlit_App/1.0"

    # Load the document without restricting to specific templates so it works on any site!
    loader = WebBaseLoader(
        web_paths=(webURL.weburl,)
    )
    docs = loader.load()
    # assert len(docs) == 1
    # print(f"Total characters: {len(docs[0].page_content)}")
    # print(docs[0].page_content[:500])

    # Splitting into chucks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,  # chunk size (characters)
        chunk_overlap=200,  # chunk overlap (characters)
        add_start_index=True,  # track index in original document
    )
    all_splits = text_splitter.split_documents(docs)
    if len(all_splits) == 0:
        raise HTTPException(status_code=400, detail="Could not extract text from this URL")
    print(f"Split blog post into {len(all_splits)} sub-documents.")

    # Uploading to Vector Store
    document_ids = vector_store.add_documents(documents=all_splits)

    # Touch the session to mark it active
    update_session(webURL.session_id)
    return {"message":f"Document Uploaded! {len(all_splits)} chunks processed."}