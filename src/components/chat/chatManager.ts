import { createChat } from '@n8n/chat';

// Mở rộng window để tránh lỗi TS
declare global {
    interface Window {
        __n8nChat?: any;
    }
}

let chatInstance: any = null;

export const ChatManager = {
    /**
     * Khởi tạo chat instance mới
     */
    init(config: any) {
        if (chatInstance) {
            console.warn('Chat đã được khởi tạo, destroy trước khi init lại');
            this.destroy();
        }

        try {
            chatInstance = createChat(config);
            console.log('Chat khởi tạo thành công');
        } catch (error) {
            console.error('Lỗi khởi tạo chat:', error);
        }
    },

    /**
     * Cập nhật config của chat (không destroy)
     * Chỉ dùng khi muốn update metadata mà không mất session
     */
    update(config: Partial<any>) {
        if (!chatInstance) {
            console.warn('Chat chưa được khởi tạo, không thể update');
            return;
        }

        try {
            // Nếu n8n/chat có method updateChatConfig
            if (chatInstance?.updateChatConfig) {
                chatInstance.updateChatConfig(config);
                console.log('Chat config đã được cập nhật');
            } else {
                // Fallback: update trực tiếp properties nếu có thể
                Object.assign(chatInstance, config);
                console.log('Chat properties đã được cập nhật');
            }
        } catch (error) {
            console.error('Lỗi update chat:', error);
        }
    },

    /**
     * Lấy chat instance hiện tại
     */
    get() {
        return chatInstance;
    },

    /**
     * Hủy chat instance và xóa DOM
     */
    destroy() {
        try {
            // Xóa tất cả elements liên quan đến n8n chat
            const elements = document.querySelectorAll('#n8n-chat, .n8n-chat, iframe[src*="n8n"]');
            elements.forEach((el) => {
                el?.parentNode?.removeChild(el);
            });

            // Clear instance
            chatInstance = null;

            // Xóa global instance của n8n/chat
            if (window.__n8nChat) {
                delete window.__n8nChat;
            }

            console.log('Chat đã được destroy');
        } catch (error) {
            console.error('Lỗi destroy chat:', error);
        }
    },

    /**
     * Kiểm tra xem chat đã được khởi tạo chưa
     */
    isInitialized() {
        return chatInstance !== null;
    },

    /**
     * Reset session - xóa session cũ và bắt đầu conversation mới
     */
    resetSession() {
        if (!chatInstance) {
            console.warn('Chat chưa được khởi tạo');
            return;
        }

        try {
            // Xóa session từ localStorage/sessionStorage
            const sessionKey = chatInstance.chatSessionKey || 'sessionId';
            const inputKey = chatInstance.chatInputKey || 'chatInput';

            localStorage.removeItem(sessionKey);
            localStorage.removeItem(inputKey);
            sessionStorage.removeItem(sessionKey);
            sessionStorage.removeItem(inputKey);

            console.log('Session đã được reset');
        } catch (error) {
            console.error('Lỗi reset session:', error);
        }
    },
};
