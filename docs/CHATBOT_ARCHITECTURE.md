# Chatbot – Tech Lead View

This doc describes the chatbot from an engineering perspective: architecture, security, how to extend, and how to test.

---

## Architecture

```
src/
  constants/
    chatbot.js          # Config: bot name, welcome text, max input length, reply delay
  utils/
    chatbotLogic.js     # Pure logic: intent matching, reply generation (no React)
  components/
    Chatbot.jsx         # UI only: state, effects, render; calls getChatbotReply()
```

- **Separation of concerns:** UI (Chatbot.jsx) only renders and handles user input. All reply logic lives in `chatbotLogic.js` and uses portfolio constants. Config lives in `chatbot.js`.
- **No backend:** Everything runs in the browser. No API keys, no server, no PII sent off-site.
- **Stable list keys:** Each message has a unique `id` (`msg-{timestamp}-{random}`) so React can reconcile the list correctly and we avoid key collisions.

---

## Data flow

1. User types → input is trimmed and length-limited in the component (`chatbotConfig.maxInputLength`).
2. Component appends user message (with `id`), sets loading, and after `replyDelayMs` calls `getChatbotReply(text)`.
3. `getChatbotLogic.js` normalizes input, matches intents, builds reply from portfolio data, and returns a string (or fallback on error). No throws to the caller.
4. Component appends bot message (with `id`) and clears loading. Timeout is cleared on unmount.

---

## Security

- **Input:** Trimmed and capped at `maxInputLength` (500 chars). No raw user input is rendered as HTML; user messages are shown as plain text in a `<span>`.
- **Output:** Bot replies are built from our own strings and portfolio data. We use `ReactMarkdown` for formatting; we do not pass user input into markdown. So there is no XSS from user content in bot replies.
- **No external calls:** No analytics or third-party scripts in the chat path; no data leaves the tab.

---

## How to extend

### Change copy or limits

- Edit **`src/constants/chatbot.js`**: `botName`, `welcomeMessage`, `maxInputLength`, `replyDelayMs`.

### Add or change intents

- Edit **`src/utils/chatbotLogic.js`**.
- Each intent is `{ keywords: string[], response: () => string }`. Add a new object to the `intents` array. Order matters: first match wins. Use existing portfolio imports (`aboutMeData`, `contactConfig`, `categories`, `allProjects`) to build replies.
- Keep responses markdown-safe (no user input interpolated into markdown). Use try/catch in `getChatbotReply`; it already returns a safe fallback on throw.

### Change UI only

- Edit **`src/components/Chatbot.jsx`**: layout, theme classes, and behavior (e.g. open/close, focus). Do not put business or reply logic here; keep calling `getChatbotReply(text)` and using `chatbotConfig`.

---

## Testing (manual / future unit)

- **Logic:** `getChatbotReply(message)` and `normalizeInput(text)` are pure and exported. You can unit-test them with different strings and assert on the returned reply and normalized output.
- **UI:** Component is stateful and uses refs; integration tests can focus on “send message → loading → bot reply appears” and “input respects max length”.

---

## Dependencies

- **React, ReactMarkdown, Lucide React:** All used by the chat UI. No chatbot-specific SDKs.
- **Portfolio constants:** `aboutme`, `contacts`, `skills`, `projects` are used only inside `chatbotLogic.js`. If a constant is missing, `getChatbotReply` catches errors and returns a safe fallback message.

---

## Summary

| Concern        | Approach |
|----------------|----------|
| Architecture   | Config → constants; logic → utils; UI → component. Clear boundaries. |
| Security       | Input length cap, no HTML from user, no external requests. |
| Extensibility  | Add intents in one place; change copy/limits in config. |
| Reliability    | Try/catch in reply logic; timeout cleared on unmount; stable message ids. |
