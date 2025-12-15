import { useConversation } from "../store/conversation"

export function Input() {
  const value = useConversation(state => state.userInput);
  const setValue = useConversation(state => state.setUserInput);
  const setIsUserWaiting = useConversation(state => state.setIsUserWaiting);

  return (
    <input
      type="text"
      placeholder="Ask me anything related to your case"
      value={value}
      onKeyPress={(event) => {
        if (event.key == "Enter") {
          setIsUserWaiting(true);
          // setValue("");
        }
      }}
      onChange={e => setValue(e.target.value)} />
  )
}
