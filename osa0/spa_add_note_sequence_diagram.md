```mermaid
sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: The browser sends the new note to the server in JSON format
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server->>browser: 201 Created
    deactivate server
    
    
    
```