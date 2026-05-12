import { useState, useEffect, useCallback, useRef } from 'react';

export default function TypeWriter({
  strings = [],
  typeSpeed = 80,
  deleteSpeed = 50,
  delayBetween = 2000,
  className = '',
}) {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const tick = useCallback(() => {
    const currentString = strings[stringIndex] || '';

    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delayBetween);
      return;
    }

    if (isDeleting) {
      setText(currentString.substring(0, text.length - 1));
      if (text.length === 0) {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
      }
    } else {
      setText(currentString.substring(0, text.length + 1));
      if (text.length === currentString.length) {
        setIsPaused(true);
      }
    }
  }, [text, stringIndex, isDeleting, isPaused, strings, delayBetween]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : isPaused ? delayBetween : typeSpeed;
    timeoutRef.current = setTimeout(tick, speed);
    return () => clearTimeout(timeoutRef.current);
  }, [tick, isDeleting, isPaused, typeSpeed, deleteSpeed, delayBetween]);

  return (
    <span className={className}>
      {text}
      <span
        className="inline-block w-[3px] h-[1em] ml-1 align-middle"
        style={{
          backgroundColor: '#00F0FF',
          animation: 'blink-caret 0.75s step-end infinite',
          boxShadow: '0 0 8px rgba(0, 240, 255, 0.6)',
        }}
      />
    </span>
  );
}
