import os
import openai
import streamlit as st
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from streamlit_extras.add_vertical_space import add_vertical_space
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from htmlTemplates import css, bot_template, user_template
import speech_recognition as sr

def get_all_pdfs_in_folder(folder_path):
    pdf_files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith('.pdf')]
    return pdf_files

def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vectorstore(text_chunks, api_key):
    embeddings = OpenAIEmbeddings(openai_api_key=api_key)
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

def get_conversation_chain(vectorstore, api_key):
    llm = ChatOpenAI(openai_api_key=api_key)
    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(llm=llm, retriever=vectorstore.as_retriever(), memory=memory)
    return conversation_chain

def handle_userinput(user_question):
    response = st.session_state.conversation({'question': user_question})
    st.session_state.chat_history = response['chat_history']

    for i, message in enumerate(st.session_state.chat_history):
        if i % 2 == 0:
            st.write(user_template.replace("{{MSG}}", message.content), unsafe_allow_html=True)
        else:
            st.write(bot_template.replace("{{MSG}}", message.content), unsafe_allow_html=True)

def main():
    load_dotenv()
    st.set_page_config(page_title="Chat with multiple PDFs", page_icon=":books:")
    st.write(css, unsafe_allow_html=True)

    if "conversation" not in st.session_state:
        st.session_state.conversation = None
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = None
    if "user_question" not in st.session_state:
        st.session_state.user_question = ""

    st.header("Chat with multiple PDFs :books:")

    openai_api_key = ""

    with st.sidebar:
        st.title('🤗💬 Chat App')
        add_vertical_space(2)
        st.write('Made with ❤️ by TechTrack Team')
        openai_api_key = st.text_input('Enter your OpenAI API key:')
        pdf_input_method = st.radio("Choose your PDF input method:", ("Upload files", "Select directory"))
        pdf_files = []
        if pdf_input_method == "Upload files":
            pdf_docs = st.file_uploader("Upload your PDFs here and click on 'Process'", accept_multiple_files=True)
            if pdf_docs is not None:
                pdf_files = [pdf_doc for pdf_doc in pdf_docs]
        elif pdf_input_method == "Select directory":
            pdf_folder = st.text_input('Enter your PDF directory:')
            if pdf_folder:
                pdf_files = get_all_pdfs_in_folder(pdf_folder)
        if st.button("Process") and pdf_files:
            with st.spinner("Processing"):
                # get pdf text
                raw_text = get_pdf_text(pdf_files)
                # get the text chunks
                text_chunks = get_text_chunks(raw_text)
                # create vector store
                vectorstore = get_vectorstore(text_chunks, openai_api_key)
                # create conversation chain
                st.session_state.conversation = get_conversation_chain(vectorstore, openai_api_key) # Pass the API key here


    st.session_state.user_question = st.text_input("Ask a question about your documents:")

    if st.button("🎙️"):
        r = sr.Recognizer()
        with sr.Microphone() as source:
            st.write("Listening...")
            audio = r.listen(source)
        try:
            st.session_state.user_question = r.recognize_google(audio)
        except sr.UnknownValueError:
            st.write("Sorry, I could not understand your voice command.")
        except sr.RequestError as e:
            st.write("Sorry, I am unable to process your request at the moment. Please try again later.")

    if st.session_state.user_question:
        handle_userinput(st.session_state.user_question)
        st.session_state.user_question = ""

if __name__ == '__main__':
    main()