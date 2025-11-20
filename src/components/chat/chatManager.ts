import { createChat } from '@n8n/chat';

// Mở rộng window để tránh lỗi TS
declare global {
    interface Window {
        __n8nChat?: any;
    }
}

let chatInstance: any = null;

export const ChatManager = {
    init(config) {
        chatInstance = createChat(config);
    },

    update(config) {
        if (chatInstance?.updateChatConfig) {
            chatInstance.updateChatConfig(config);
        }
    },

    get() {
        return chatInstance;
    },

    destroy() {
        try {
            const elements = document.querySelectorAll('#n8n-chat, .n8n-chat, iframe[src*="n8n"]');
            elements.forEach((el) => el?.parentNode?.removeChild(el));
        } catch (e) {
            console.error('Error removing elements:', e);
        }

        chatInstance = null;

        // Xóa global instance của n8n/chat
        if (window.__n8nChat) {
            delete window.__n8nChat;
        }
    },
};
