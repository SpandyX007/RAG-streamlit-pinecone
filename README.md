# Web Link RAG Chat Assistant

## Overview
This project is a Retrieval-Augmented Generation (RAG) application that allows users to interact with the content of any web page via a conversational interface. The system ingests content from a user-provided URL, processes and embeds the text, and stores it in a Pinecone vector database. Users can then query the ingested document using a Streamlit frontend, which communicates with a FastAPI backend powered by LangChain and Google Generative AI (Gemini).

## Architecture
The application is divided into frontend and backend components:
- **Frontends**: A Streamlit chat interface and a React web application that manage user sessions and communicate with the backend API.
- **Backend**: A FastAPI server that handles web scraping, text splitting, embedding generation, semantic search, and prompt formatting.

### Core Technologies
- **Frameworks**: FastAPI, Streamlit, React, Vite
- **AI / LLM**: LangChain, Google Generative AI (Gemini 3.1 Flash Lite Preview, Gemini Embedding 2 Preview)
- **Vector Database**: Pinecone (Serverless)

## Key Features
- **URL Ingestion**: Extracts text content directly from provided web links using LangChain's WebBaseLoader.
- **Session Isolation**: Utilizes unique session IDs to create isolated Pinecone namespaces, ensuring that multiple users do not overwrite or query each other's data.
- **Resource Management**: Includes mechanisms to manually or automatically clean up and delete vector database namespaces when a session is terminated or times out.
- **Contextual Retrieval**: Injects retrieve documents dynamically into the prompt state for accurate, context-aware generation.

## Prerequisites
To run this application, you will need the following API keys:
- Pinecone API Key
- Google Gemini API Key

## Setup and Installation

1. **Activate the virtual environment:**
   ```bash
   # Windows
   .myapp\Scripts\activate
   # Unix/macOS
   source .myapp/bin/activate
   ```

2. **Install the required dependencies:**
   Ensure you have installed the necessary packages for the backend and Streamlit frontend.
   ```bash
   pip install -r backend/requirements.txt
   pip install streamlit requests
   ```
   For the React frontend, navigate to the `react-frontend` directory and install the Node modules:
   ```bash
   cd react-frontend
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory (or wherever your application loads it from) and add your API keys:
   ```env
   PINECONE_API_KEY="your_pinecone_api_key_here"
   GEMINI_API_KEY="your_gemini_api_key_here"
   USER_AGENT="RAG_Streamlit_App/1.0"
   ```

## Usage

### 1. Start the Backend Server
Navigate to the `backend` directory and start the FastAPI application using Uvicorn:
```bash
cd backend
uvicorn main:app --reload
```
The backend API will be available at `http://127.0.0.1:8000`.

### 2. Start the Frontends

You can run either or both of the available frontends:

#### Option A: Streamlit Frontend
Open a new terminal, activate your virtual environment, navigate to the `frontend` directory, and start Streamlit:
```bash
cd frontend
streamlit run main.py
```
The Streamlit interface will be accessible in your web browser, typically at `http://localhost:8501`.

#### Option B: React Frontend
Open a new terminal, navigate to the `react-frontend` directory, and start the development server:
```bash
cd react-frontend
npm run dev
```
The React interface will be accessible in your web browser, typically at `http://localhost:5173`.

## API Endpoints
- `GET /`: Health check endpoint to verify the service is running.
- `POST /link-injestion`: Receives a URL and a session ID, scrapes the web page, splits it into chunks, generates embeddings, and uploads them to the highly specific Pinecone namespace.
- `POST /link-retrieval`: Receives a user query and a session ID, performs a semantic search against the Pinecone namespace, and returns an LLM-generated answer based on the retrieved context.
- `POST /clear-namespace`: Deletes all records associated with a specific session ID namespace in the Pinecone database to free up space.
