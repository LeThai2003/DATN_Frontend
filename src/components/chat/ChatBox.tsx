import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface Message {
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
}

const ChatBox: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isNearBottom, setIsNearBottom] = useState(true);
    const [hasNewMessage, setHasNewMessage] = useState(false); //
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // theo dõi vị trí scroll
    const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
        const nearBottom = distanceFromBottom < 5;

        // Nếu user scroll lên thì tắt auto-scroll
        setIsNearBottom(nearBottom);

        // Nếu cuộn lên (đang xem tin cũ) thì ẩn thông báo tin mới
        if (nearBottom) setHasNewMessage(false);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isNearBottom) {
            // chỉ cuộn xuống khi user đang ở gần cuối
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Nếu đang xem tin cũ thì chỉ hiện nút “Tin mới”
            setHasNewMessage(true);
        }
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            // khi vừa mở chat -> luôn cuộn xuống 1 lần, KHÔNG thay đổi isNearBottom
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
            }, 100);
        }
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        setHasNewMessage(false);
        setIsNearBottom(true);
    };

    const sendMessage = async () => {
        if (!input.trim() || isTyping) return; // Không gửi khi bot đang phản hồi

        const userMessage: Message = {
            sender: 'user',
            text: input,
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            if (!response.body) throw new Error('No response body');
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let botMessage = '';

            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: '', timestamp: new Date().toISOString() },
            ]);

            const streamReader = async () => {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, { stream: true });
                    botMessage += chunk;

                    setMessages((prev) => {
                        const updated = [...prev];
                        updated[updated.length - 1].text = botMessage;
                        return updated;
                    });
                }
            };

            await streamReader();
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: 'bot',
                    text: 'Lỗi khi nhận phản hồi từ server.',
                    timestamp: new Date().toISOString(),
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => {
                        setIsOpen(true);
                    }}
                    className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
                >
                    💬
                    {/* 🤖 */}
                </button>
            )}

            {isOpen && (
                <div className="bg-white w-80 h-96 rounded-2xl shadow-xl flex flex-col border border-gray-200 overflow-hidden relative">
                    {/* header */}
                    <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-2xl border-b border-gray-200">
                        <h3 className="text-sm font-semibold">AI Chat - Phòng khám</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200"
                        >
                            <IoClose size={20} />
                        </button>
                    </div>

                    {/* tin nhắn */}
                    <div
                        ref={containerRef}
                        className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50"
                    >
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${
                                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <div className="max-w-[75%]">
                                    <div
                                        className={`px-3 py-2 rounded-lg text-sm  ${
                                            msg.sender === 'user'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-800'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                    <div
                                        className={`text-[11px] text-gray-400 mt-1 ${
                                            msg.sender === 'user' && 'text-right'
                                        }`}
                                    >
                                        {new Date(msg.timestamp).toLocaleTimeString('vi-VN', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm flex items-center space-x-1">
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* thông báo tin mới */}
                    {hasNewMessage && !isNearBottom && (
                        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                            <button
                                onClick={scrollToBottom}
                                className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow hover:bg-yellow-500 transition"
                            >
                                🔔 Tin mới
                            </button>
                        </div>
                    )}

                    {/* nhập tin nhắn */}
                    <div className="border-t border-gray-200 p-2 flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={isTyping ? '⏳ Đang phản hồi...' : 'Nhập tin nhắn...'}
                            disabled={isTyping} // khóa input khi bot đang trả lời
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isTyping}
                            className={`ml-2 rounded-lg px-3 py-2 transition ${
                                isTyping
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
