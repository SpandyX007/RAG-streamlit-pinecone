import streamlit as st
import uuid
import requests

# BACKEND = 'http://127.0.0.1:8000'
BACKEND = 'https://guileless-nonpervertible-ai.ngrok-free.dev'
# BACKEND = 'https://rag-streamlit-pinecone.vercel.app'

# Initialize session state
if "session_id" not in st.session_state:
    st.session_state.session_id = str(uuid.uuid4())
if "messages" not in st.session_state:
    st.session_state.messages = []
if "is_link_processed" not in st.session_state:
    st.session_state.is_link_processed = False
if "current_link" not in st.session_state:
    st.session_state.current_link = ""

def process_link_backend(weburl):
    payload = {'weburl': weburl, 'session_id': st.session_state.session_id}
    response = requests.post(BACKEND + '/link-injestion', json=payload)
    return response.json()

def get_chat_response(query):
    payload = {'query': query, 'session_id': st.session_state.session_id}
    try:
        response = requests.post(BACKEND + '/link-retrieval', json=payload)
        return response.json().get('message', "No answer found")
    except Exception as e:
        return f"Error connecting to backend: {str(e)}"

# Streamlit UI
st.title("Web Link Chat Assistant")

# Sidebar for link input
with st.sidebar:
    st.header("Ingest Content")
    web_link = st.text_input("Enter a web link URL:")
    
    if st.button("Process Link"):
        if web_link:
            with st.spinner("Processing content from the link..."):
                result = process_link_backend(web_link)
                if 'message' in result:
                    st.session_state.is_link_processed = True
                    st.session_state.current_link = web_link
                    st.success(f"Successfully processed link!")
                else:
                    st.error("Failed to process the link.")
        else:
            st.warning("Please enter a valid link first.")
            
    if st.session_state.is_link_processed:
        st.subheader("Current Link")
        st.write(st.session_state.current_link)
        
        st.markdown("---")
        if st.button("End Session & Clear Data"):
            with st.spinner("Clearing Database..."):
                requests.post(BACKEND + '/clear-namespace', json={'session_id': st.session_state.session_id})
            
            # Reset state for a fresh start
            st.session_state.messages = []
            st.session_state.is_link_processed = False
            st.session_state.current_link = ""
            st.session_state.session_id = str(uuid.uuid4())
            st.rerun()
   
# Main chat interface
if not st.session_state.is_link_processed:
    st.info("Please enter and process a web link in the sidebar to start chatting.")
else:
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
    
    if prompt := st.chat_input("Ask a question about the link content..."):
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)
        
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                full_response = get_chat_response(prompt)
            st.markdown(full_response)
            st.session_state.messages.append({"role": "assistant", "content": full_response})

st.sidebar.markdown("---")
