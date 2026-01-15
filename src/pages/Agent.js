import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CreditCard, Link, DollarSign, Calendar, Search, Loader2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const FourierAgent = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: "Hello! I'm your transaction assistant. I can help you query transactions, payments, and payment links. What would you like to know?",
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [showApiKeyInput, setShowApiKeyInput] = useState(true);
    const chatEndRef = useRef(null);

    // Mock transaction data for demonstration
    const mockTransactions = [
        { id: 'TXN001', amount: 150.00, type: 'payment', status: 'completed', date: '2025-06-01', merchant: 'Amazon' },
        { id: 'TXN002', amount: 75.50, type: 'refund', status: 'pending', date: '2025-06-02', merchant: 'Uber' },
        { id: 'TXN003', amount: 200.00, type: 'payment', status: 'failed', date: '2025-06-03', merchant: 'Netflix' },
        { id: 'TXN004', amount: 320.99, type: 'payment', status: 'completed', date: '2025-06-04', merchant: 'Best Buy' },
        { id: 'TXN005', amount: 45.00, type: 'payment', status: 'completed', date: '2025-06-05', merchant: 'Starbucks' }
    ];

    const mockPaymentLinks = [
        { id: 'LINK001', amount: 100.00, status: 'active', expires: '2025-06-10', recipient: 'john@example.com' },
        { id: 'LINK002', amount: 250.00, status: 'used', expires: '2025-06-08', recipient: 'sarah@example.com' },
        { id: 'LINK003', amount: 75.00, status: 'expired', expires: '2025-06-01', recipient: 'mike@example.com' }
    ];

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Transaction query functions
    const queryTransactions = (filters = {}) => {
        let filtered = [...mockTransactions];

        if (filters.status) {
            filtered = filtered.filter(t => t.status.toLowerCase().includes(filters.status.toLowerCase()));
        }
        if (filters.type) {
            filtered = filtered.filter(t => t.type.toLowerCase().includes(filters.type.toLowerCase()));
        }
        if (filters.merchant) {
            filtered = filtered.filter(t => t.merchant.toLowerCase().includes(filters.merchant.toLowerCase()));
        }
        if (filters.minAmount) {
            filtered = filtered.filter(t => t.amount >= filters.minAmount);
        }
        if (filters.maxAmount) {
            filtered = filtered.filter(t => t.amount <= filters.maxAmount);
        }

        return filtered;
    };

    const queryPaymentLinks = (filters = {}) => {
        let filtered = [...mockPaymentLinks];

        if (filters.status) {
            filtered = filtered.filter(l => l.status.toLowerCase().includes(filters.status.toLowerCase()));
        }
        if (filters.recipient) {
            filtered = filtered.filter(l => l.recipient.toLowerCase().includes(filters.recipient.toLowerCase()));
        }

        return filtered;
    };



    const getStatusEmoji = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return '✅';
            case 'pending': return '⏳';
            case 'failed': return '❌';
            default: return '❓';
        }
    };

    const getTypeEmoji = (type) => {
        switch (type.toLowerCase()) {
            case 'payment': return '💸';
            case 'refund': return '💰';
            case 'transfer': return '🔄';
            default: return '💳';
        }
    };

    const getMerchantEmoji = (merchant) => {
        const merchantLower = merchant.toLowerCase();
        if (merchantLower.includes('amazon')) return '📦';
        if (merchantLower.includes('uber')) return '🚗';
        if (merchantLower.includes('netflix')) return '🎬';
        if (merchantLower.includes('best buy')) return '🛒';
        if (merchantLower.includes('starbucks')) return '☕';
        return '🏪';
    };

    const formatTransactionResponse = (transactions) => {
        if (transactions.length === 0) {
            return "🔍 No transactions found matching your criteria.";
        }

        let response = `📊 **Transaction Summary** (${transactions.length} found)\n`;
        response += `${'─'.repeat(50)}\n\n`;

        transactions.forEach((txn, index) => {
            const statusEmoji = getStatusEmoji(txn.status);
            const typeEmoji = getTypeEmoji(txn.type);
            const merchantEmoji = getMerchantEmoji(txn.merchant);

            response += `${typeEmoji} **${txn.id}** ${statusEmoji}\n`;
            response += `┌─ 💰 Amount: ₦${txn.amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
            response += `├─ 📝 Type: ${txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}\n`;
            response += `├─ 🏷️ Status: ${txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}\n`;
            response += `├─ ${merchantEmoji} Merchant: ${txn.merchant}\n`;
            response += `└─ 📅 Date: ${new Date(txn.date).toLocaleDateString('en-NG', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })}\n`;

            if (index < transactions.length - 1) {
                response += `\n${'┈'.repeat(30)}\n\n`;
            }
        });

        return response;
    };

    const formatPaymentLinksResponse = (links) => {
        if (links.length === 0) {
            return "No payment links found matching your criteria.";
        }

        let response = `Found ${links.length} payment link(s):\n\n`;
        links.forEach(link => {
            response += `🔗 **${link.id}**\n`;
            response += `   Amount: $${link.amount.toFixed(2)}\n`;
            response += `   Status: ${link.status}\n`;
            response += `   Recipient: ${link.recipient}\n`;
            response += `   Expires: ${link.expires}\n\n`;
        });

        return response;
    };

    const processQuery = async (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        // Simple keyword-based processing (in real implementation, use Gemini for better NLP)
        if (lowerMessage.includes('transaction') || lowerMessage.includes('payment')) {
            const filters = {};

            if (lowerMessage.includes('completed')) filters.status = 'completed';
            if (lowerMessage.includes('pending')) filters.status = 'pending';
            if (lowerMessage.includes('failed')) filters.status = 'failed';
            if (lowerMessage.includes('refund')) filters.type = 'refund';

            // Extract merchant name
            const merchantMatch = lowerMessage.match(/from\s+(\w+)|at\s+(\w+)|merchant\s+(\w+)/);
            if (merchantMatch) {
                filters.merchant = merchantMatch[1] || merchantMatch[2] || merchantMatch[3];
            }

            // Extract amount ranges
            const amountMatch = lowerMessage.match(/over\s+\$?(\d+(?:\.\d{2})?)|above\s+\$?(\d+(?:\.\d{2})?)/);
            if (amountMatch) {
                filters.minAmount = parseFloat(amountMatch[1] || amountMatch[2]);
            }

            const maxAmountMatch = lowerMessage.match(/under\s+\$?(\d+(?:\.\d{2})?)|below\s+\$?(\d+(?:\.\d{2})?)/);
            if (maxAmountMatch) {
                filters.maxAmount = parseFloat(maxAmountMatch[1] || maxAmountMatch[2]);
            }

            const transactions = queryTransactions(filters);
            return formatTransactionResponse(transactions);
        }

        if (lowerMessage.includes('payment link') || lowerMessage.includes('link')) {
            const filters = {};

            if (lowerMessage.includes('active')) filters.status = 'active';
            if (lowerMessage.includes('used')) filters.status = 'used';
            if (lowerMessage.includes('expired')) filters.status = 'expired';

            const emailMatch = lowerMessage.match(/for\s+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
            if (emailMatch) {
                filters.recipient = emailMatch[1];
            }

            const links = queryPaymentLinks(filters);
            return formatPaymentLinksResponse(links);
        }

        if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
            return `I can help you with the following queries:

**Transaction Queries:**
• "Show me all completed transactions"
• "Find failed payments"
• "Show transactions from Amazon"
• "Find payments over $100"
• "Show all refunds"

**Payment Link Queries:**
• "Show active payment links"
• "Find expired links"
• "Show links for john@example.com"
• "List all payment links"

**Examples:**
• "Show me completed transactions from Starbucks"
• "Find active payment links"
• "Show me failed payments over $200"

Just ask me in natural language!`;
        }

        // For actual implementation, integrate with Gemini API here
        return "I understand you're asking about transactions or payments. Please try a more specific query like 'Show me completed transactions' or 'Find active payment links'. Type 'help' for more examples.";
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await processQuery(inputMessage);

            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: response,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: "Sorry, I encountered an error processing your request. Please try again.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickActions = [
        { label: "Show All Transactions", icon: CreditCard, query: "Show me all transactions" },
        { label: "Recent Payments", icon: DollarSign, query: "Show completed transactions" },
        { label: "Failed Transactions", icon: Search, query: "Show failed transactions" }
    ];

    const handleQuickAction = (query) => {
        setInputMessage(query);
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto h-screen flex flex-col bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Bot className="text-blue-500" size={32} />
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">Transaction Assistant</h1>
                                <p className="text-sm text-gray-500">Query your transactions and payments</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border-b p-4">
                    <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuickAction(action.query)}
                                className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors text-sm"
                            >
                                <action.icon size={16} />
                                <span>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-500' : 'bg-gray-200'}`}>
                                    {message.type === 'user' ?
                                        <User className="text-white" size={20} /> :
                                        <Bot className="text-gray-600" size={20} />
                                    }
                                </div>
                                <div className={`p-4 rounded-lg ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white shadow-sm border'}`}>
                                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                                    <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                        {message.timestamp.toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-start space-x-3 max-w-3xl">
                                <div className="p-2 rounded-full bg-gray-200">
                                    <Bot className="text-gray-600" size={20} />
                                </div>
                                <div className="p-4 rounded-lg bg-white shadow-sm border">
                                    <div className="flex items-center space-x-2">
                                        <Loader2 className="animate-spin" size={16} />
                                        <span className="text-sm text-gray-500">Processing your request...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-white border-t p-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex-1 relative">
                            <textarea
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask about transactions, payments, or payment links..."
                                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows={1}
                                style={{ minHeight: '44px', maxHeight: '120px' }}
                            />
                        </div>
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim() || isLoading}
                            className="p-3 bg-[#065143] text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Press Enter to send, Shift+Enter for new line
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FourierAgent;