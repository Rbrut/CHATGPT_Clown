function InputBox () {
    return(
        <>
            <div className="input-box">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Write message" 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)} 
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                />
                <button className='btn btn-secondary' type='button' onClick={handleSend}>Send</button>
            </div>
        </>
    )
}

export default InputBox;