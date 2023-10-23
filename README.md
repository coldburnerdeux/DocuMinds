# DocuMinds
DocuMinds EKB
Version: 1.0

Date: September 4, 2023

Author: Amila Wijesooriya

Stakeholders: Amila Wijesooriya, Vihanga Palihakkara, Samadhi Gunawardhana, Ruchira Sewmini, Poornima Kodithuwakku`

# Table of Contents

1. Introduction
👉 This document outlines the requirements for a Knowledgebase Application capable of analyzing multiple documents, supporting multi-tenancy, and integrating with various Language Learning Models (LLMs).


2. Document Analysis

- **Batch Limit**: The application should be able to analyze up to **5 documents** simultaneously.
- **Context Window**: The context window for analysis will be set to **100,000** characters for the initial phase.

3. Multi-Tenancy

- The application should allow different departments (e.g., HR, Engineering) to have their own tenants.
- Each tenant should be able to maintain their own chats.

4. Privilege Management

- At later stages, the application will consider assigning privileged views and editing access to each tenant and their respective chats.

5. Data Retention

- The application should be capable of retaining chat data indefinitely.

 6. RAG (Retrieval Augmented Generation)

- The application will employ Retrieval Augmented Generation to fetch information from a vector database.

7. Data Flow

1. When a user uploads a document, the extracted data will be converted to text embeddings.
2. These embeddings will be uploaded to a Vector Database.
3. Teams are encouraged to explore databases like Pinecone, Qdrant for this purpose.

 8. LLM Integration

- The application should be capable of accessing multiple LLMs (e.g., GPT-4, GPT-3.5, Claude 2, Bard, Perplexity.ai) through API tokens and web browser session keys.
- The data retrieved should match the exact context window of the LLM.

9. Output Comparison

- The application should be able to compare outputs from multiple LLMs.
- It should also allow for comparison with outputs from previous rounds.

10. API and Bot Development

- The platform should enable API access for faster bot development.
- It should be easily integrable with any website or web application, taking cues from platforms like Dify, getcody, and ChatNode.

Low Code / No Code Development

11. References


# 🎯️ Project Goals and New Ideas for the Knowledgebase Application

## Project Goals

### Core Functionality

1. **Multi-Document Analysis**: Enable the application to analyze up to 5 documents simultaneously.
2. **Multi-Tenancy Support**: Allow different departments to have their own tenants and manage their own chats.
3. **Context Window**: Implement a context window of 100,000 tokens for document analysis.

### Data Management

1. **Data Retention**: Ensure indefinite retention of chat data for each tenant.
2. **Vector Database Integration**: Integrate a vector database for Retrieval Augmented Generation (RAG).

### User Access and Privileges

1. **Role-Based Access Control**: Implement privileged views and editing access for different tenants.
2. **API Integration**: Enable API access for third-party applications and services.

### Language Learning Models (LLMs)

1. **Multi-LLM Support**: Integrate multiple LLMs like GPT-4, GPT-3.5, Claude 2, Bard, and Perplexity.ai.
2. **Output Comparison**: Develop a feature to compare and analyze outputs from different LLMs.

### Scalability and Performance

1. **Optimization**: Ensure the application is optimized for speed and performance.
2. **Scalability**: Design the architecture to be scalable, allowing for future expansions and features.

# New Ideas for Implementation

### Advanced Features

1. **Real-Time Collaboration**: Allow multiple users to collaborate in real-time within a chat or document.
2. **Sentiment Analysis**: Implement sentiment analysis to gauge the mood or tone of the chats.
3. **Automated Summaries**: Generate automated summaries of long chats or documents.

### User Experience

1. **Customizable Dashboards**: Allow tenants to customize their dashboards based on their specific needs.(Color, Theme etc.)

### Data Analytics

1. **Chat Analytics**: Provide detailed analytics on chat interactions, popular topics, and user engagement.
2. **Document Analytics**: Offer insights into the most frequently accessed documents, their relevance, and usage statistics to an admin.

### Security

1. **Two-Factor Authentication (2FA)**: Implement 2FA for enhanced security.
2. **Data Encryption**: Ensure that all data, including chats and documents, are encrypted.

### Third-Party Integrations

1. **Cloud Integration**: Integrate with popular Cloud storage platforms to retrieve documents and data.
