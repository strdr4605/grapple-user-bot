import { useState } from "react"

interface InputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function Input({ onSend, disabled }: InputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value);
      setValue('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Ask me anything about your case..."
        value={value}
        disabled={disabled}
        className="flex-1 p-2 border rounded-lg disabled:bg-gray-100"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
        onChange={e => setValue(e.target.value)}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
      >
        Send
      </button>
    </div>
  )
}
