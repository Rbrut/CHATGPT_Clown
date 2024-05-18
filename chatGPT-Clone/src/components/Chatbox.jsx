function Chatbox () {

    // Scroll chat box to bottom when messages update
    const chatBoxRef = useRef(null);
    useEffect(() => {
        if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);
    return(
        <>
            <div className="chat-box" ref={chatBoxRef}>
                {isTyping && <div className="typing-indicator">ChatGPT is typing...</div>}
                {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.direction}`}>
                    <div className="message-content">
                        <div className="text-message">
                            <p>
                            {msg.direction === 'incoming' && <i className="bi bi-robot icon" />} 
                            {msg.direction === 'outgoing' && <i className="bi bi-person-circle icon" />}
                            {msg.content}
                            </p>
                            <span className="time">{msg.time}</span>
                        </div>
                    </div>
                </div>
                ))}
            </div>       
        </>
    )
}

export default Chatbox;