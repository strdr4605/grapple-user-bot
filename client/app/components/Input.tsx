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
    <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
      {/* Input field */}
      <input
        type="text"
        placeholder="Ask Grapple Law"
        value={value}
        disabled={disabled}
        className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 py-2"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
        onChange={e => setValue(e.target.value)}
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        title="Send message"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}
