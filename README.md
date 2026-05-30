# Beee Chess

## `/chess/learn` AI chat

The learn chat uses Gemini Interactions API for server-side conversation history.

- The system prompt stays simple: the model is a concise chess coach.
- The client owns visible chat messages and sends hidden board context with each user turn.
- Hidden context can include FEN, SAN move history, last user move, last AI move, and hint eval/depth.
- The UI renders only the visible message text.
- The server expands hidden context into the user input, streams text by SSE, and returns the completed interaction id.
- If Interactions fails before output starts, the server falls back to `generateContentStream`.
