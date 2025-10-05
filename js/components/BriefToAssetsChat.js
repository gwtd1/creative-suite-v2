/**
 * Brief to Assets Chat Interface
 * Main container component for AI-powered conversational creative brief workflow
 * Enhanced with performance optimization and real-time simulation patterns
 */

// AI-Native Enhancement Classes
class AIConfidenceSystem {
    constructor() {
        this.confidenceLevels = {
            high: 0.8,
            medium: 0.6,
            low: 0.4
        };
    }
    
    updateAgentConfidence(agentId, confidence) {
        const agentElement = document.querySelector(`[data-agent="${agentId}"]`);
        if (agentElement) {
            agentElement.style.setProperty('--agent-confidence', confidence);
            agentElement.style.setProperty('--confidence-color', this.getConfidenceColor(confidence));
            
            // Animate confidence change
            agentElement.classList.add('confidence-updating');
            setTimeout(() => agentElement.classList.remove('confidence-updating'), 300);
        }
    }
    
    getConfidenceColor(confidence) {
        if (confidence >= this.confidenceLevels.high) return 'var(--confidence-high)';
        if (confidence >= this.confidenceLevels.medium) return 'var(--confidence-medium)';
        return 'var(--confidence-low)';
    }
    
    getConfidenceLevel(confidence) {
        if (confidence >= this.confidenceLevels.high) return 'high';
        if (confidence >= this.confidenceLevels.medium) return 'medium';
        return 'low';
    }
}

class AIVisualEnhancer {
    constructor() {
        this.agentColors = {
            strategy: 'var(--agent-strategy)',
            creative: 'var(--agent-creative)',
            copy: 'var(--agent-copy)',
            design: 'var(--agent-design)',
            legal: 'var(--agent-legal)',
            brand: 'var(--agent-brand)',
            email: 'var(--agent-email)',
            image: 'var(--agent-image)'
        };
    }
    
    renderEnhancedAvatar(agent, status, confidence) {
        const agentColor = this.agentColors[agent] || 'var(--accent-primary)';
        return `
            <div class="agent-avatar enhanced ${agent} ${status}" 
                 data-agent="${agent}"
                 data-confidence="${confidence}"
                 style="--agent-color: ${agentColor}; --agent-confidence: ${confidence}">
                <span class="agent-emoji">${this.getAgentEmoji(agent)}</span>
                <div class="status-indicator ${status}"></div>
            </div>
        `;
    }
    
    getAgentEmoji(agent) {
        const emojis = {
            'strategy': '🧠',
            'creative': '🎨',
            'copy': '✍️',
            'design': '🎯'
        };
        return emojis[agent] || '🤖';
    }
    
    applyConfidenceVisualization(messageElement, agent, confidence) {
        const agentColor = this.agentColors[agent] || 'var(--accent-primary)';
        messageElement.style.setProperty('--agent-color', agentColor);
        messageElement.style.setProperty('--agent-confidence', confidence);
        messageElement.classList.add('ai-message', agent);
    }
}

class AIInteractionManager {
    constructor(chatInstance) {
        this.chat = chatInstance;
        this.typingTimeouts = new Map();
    }
    
    showTypingIndicator(agent) {
        this.hideTypingIndicator(); // Remove any existing indicator
        
        const agentColor = this.chat.visualEnhancer.agentColors[agent] || 'var(--accent-primary)';
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'typing-indicator';
        indicator.innerHTML = `
            <div class="agent-avatar mini ${agent}" style="--agent-color: ${agentColor}">
                ${this.chat.visualEnhancer.getAgentEmoji(agent)}
            </div>
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
            <span class="typing-text">${this.chat.getAgentName(agent)} is thinking...</span>
        `;
        
        const messageThread = document.getElementById('message-thread');
        if (messageThread) {
            messageThread.appendChild(indicator);
            this.chat.smoothScrollToBottom(messageThread);
        }
    }
    
    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    animateMessageEntrance(messageElement) {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px) scale(0.95)';
        
        // Force reflow
        messageElement.offsetHeight;
        
        messageElement.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0) scale(1)';
    }
    
    addButtonClickAnimation(button) {
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
}

// Performance Optimization Classes
class ChatEventManager {
    constructor() {
        this.listeners = new Map();
        this.eventQueue = [];
        this.isProcessing = false;
    }
    
    emit(eventName, data) {
        this.eventQueue.push({ eventName, data, timestamp: Date.now() });
        if (!this.isProcessing) {
            this.processEventQueue();
        }
    }
    
    subscribe(eventName, callback) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, new Set());
        }
        this.listeners.get(eventName).add(callback);
        
        return () => this.listeners.get(eventName)?.delete(callback);
    }
    
    processEventQueue() {
        this.isProcessing = true;
        
        while (this.eventQueue.length > 0) {
            const { eventName, data } = this.eventQueue.shift();
            const callbacks = this.listeners.get(eventName);
            
            if (callbacks) {
                callbacks.forEach(callback => {
                    try {
                        callback(data);
                    } catch (error) {
                        console.error(`Event handler error for ${eventName}:`, error);
                    }
                });
            }
        }
        
        this.isProcessing = false;
    }
    
    cleanup() {
        this.listeners.clear();
        this.eventQueue = [];
    }
}

class ChatRenderManager {
    constructor() {
        this.renderQueue = [];
        this.isRendering = false;
        this.documentFragment = null;
    }
    
    queueRender(element, operation) {
        this.renderQueue.push({ element, operation, timestamp: Date.now() });
        if (!this.isRendering) {
            this.processRenderQueue();
        }
    }
    
    processRenderQueue() {
        this.isRendering = true;
        this.documentFragment = document.createDocumentFragment();
        
        while (this.renderQueue.length > 0) {
            const { element, operation } = this.renderQueue.shift();
            
            try {
                operation(element, this.documentFragment);
            } catch (error) {
                console.error('Render operation error:', error);
            }
        }
        
        this.commitRender();
        this.isRendering = false;
    }
    
    commitRender() {
        if (this.documentFragment && this.documentFragment.hasChildNodes()) {
            const messageThread = document.getElementById('message-thread');
            if (messageThread) {
                messageThread.appendChild(this.documentFragment);
            }
        }
        this.documentFragment = null;
    }
    
    optimizedMessageUpdate(messageContainer, newContent) {
        // Use DocumentFragment for efficient DOM updates
        const fragment = document.createDocumentFragment();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newContent;
        
        while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild);
        }
        
        messageContainer.innerHTML = '';
        messageContainer.appendChild(fragment);
    }
}

class BriefToAssetsChat {
    constructor() {
        // Core state
        this.selectedCampaign = 'athleisure-2024';
        this.messages = [];
        this.isProcessing = false;
        this.conversationHistory = {};
        
        // Enhanced AI agent system with confidence tracking
        this.aiAgents = {
            strategy: { active: true, confidence: 0.85, status: 'ready', specialty: 'positioning' },
            creative: { active: true, confidence: 0.78, status: 'working', specialty: 'visuals' },
            copy: { active: false, confidence: 0.92, status: 'ready', specialty: 'messaging' },
            design: { active: false, confidence: 0.71, status: 'ready', specialty: 'layouts' },
            legal: { active: true, confidence: 0.88, status: 'ready', specialty: 'compliance' },
            brand: { active: true, confidence: 0.91, status: 'ready', specialty: 'guidelines' },
            email: { active: true, confidence: 0.84, status: 'ready', specialty: 'email-campaigns' },
            image: { active: true, confidence: 0.79, status: 'ready', specialty: 'text-to-image' }
        };
        
        // AI-Native Enhancement Systems
        this.confidenceSystem = new AIConfidenceSystem();
        this.visualEnhancer = new AIVisualEnhancer();
        this.interactionManager = new AIInteractionManager(this);
        
        // Campaign intelligence system with CLAUDE.md colors
        this.campaigns = [
            { 
                id: 'athleisure-2024', 
                name: 'Athleisure 2024', 
                shortName: 'Athleisure',
                primaryColor: '#9256d9', // CLAUDE.md accent-purple
                confidenceScore: 85,
                aiRecommended: true,
                status: 'active'
            },
            { 
                id: 'ai-productivity', 
                name: 'AI Productivity', 
                shortName: 'AI Prod',
                primaryColor: '#1957db', // CLAUDE.md accent-primary
                confidenceScore: 72,
                aiRecommended: false,
                status: 'scheduled'
            },
            { 
                id: 'eco-fashion', 
                name: 'Eco Fashion', 
                shortName: 'Eco Fashion',
                primaryColor: '#2d9d78', // CLAUDE.md accent-green
                confidenceScore: 68,
                aiRecommended: false,
                status: 'draft'
            }
        ];
        
        this.conversationThreads = [
            { id: 'main', title: 'Main Campaign Discussion', messages: 7, status: 'active' },
            { id: 'creative', title: 'Creative Direction', messages: 4, status: 'pending' },
            { id: 'messaging', title: 'Messaging Strategy', messages: 3, status: 'approved' }
        ];
        this.campaignProgress = [
            { id: 'audience', label: 'Target Audience', status: 'completed' },
            { id: 'objectives', label: 'Objectives', status: 'completed' },
            { id: 'tone', label: 'Tone & Style', status: 'in-progress' }
        ];
        
        // Performance optimization properties
        this.messagePool = [];
        this.visibleMessages = new Set();
        this.eventManager = new ChatEventManager();
        this.renderManager = new ChatRenderManager();
        
        // Real-time simulation properties
        this.connectionState = 'connected';
        this.messageQueue = [];
        this.retryAttempts = 0;
        
        this.initializeChat();
    }

    initializeChat() {
        this.render();
        this.attachEventListeners();
        this.loadInitialConversation();
        this.initializePerformanceOptimizations();
        this.initializeRealTimeSimulation();
        this.initializeAINativeFeatures();
    }
    
    initializeAINativeFeatures() {
        // Set up confidence tracking for all agents
        Object.entries(this.aiAgents).forEach(([agentId, agent]) => {
            this.confidenceSystem.updateAgentConfidence(agentId, agent.confidence);
        });
        
        // Set up visual enhancements
        this.updateVisualStyles();
        
        // Initialize interaction patterns
        this.setupAdvancedInteractions();
    }
    
    updateVisualStyles() {
        // Apply AI-native styling to the chat container
        const chatContainer = document.querySelector('.brief-to-assets-chat');
        if (chatContainer) {
            chatContainer.classList.add('ai-native-enhanced');
        }
    }
    
    setupAdvancedInteractions() {
        // Set up enhanced event listeners for AI-native interactions
        document.addEventListener('mouseenter', (e) => {
            if (e.target.classList.contains('agent-badge')) {
                e.target.style.transform = 'translateY(-2px)';
            }
        });
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target.classList.contains('agent-badge')) {
                e.target.style.transform = 'translateY(0)';
            }
        });
    }
    
    initializePerformanceOptimizations() {
        // Set up intersection observer for virtual scrolling
        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const messageId = entry.target.dataset.messageId;
                    if (entry.isIntersecting) {
                        this.visibleMessages.add(messageId);
                    } else {
                        this.visibleMessages.delete(messageId);
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        // Set up performance monitoring
        this.performanceMetrics = {
            renderTime: [],
            messageCount: 0,
            lastCleanup: Date.now()
        };
    }
    
    initializeRealTimeSimulation() {
        // Simulate WebSocket connection behavior
        this.simulateConnectionStates();
        this.startMessageQueueProcessor();
        
        // Set up connection monitoring
        this.eventManager.subscribe('connection:state', (state) => {
            this.updateConnectionUI(state);
        });
    }
    
    simulateConnectionStates() {
        const states = ['connecting', 'connected', 'reconnecting', 'disconnected'];
        let currentStateIndex = 1; // Start connected
        
        // Simulate occasional connection issues
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance of connection issue
                this.connectionState = 'reconnecting';
                this.eventManager.emit('connection:state', this.connectionState);
                
                setTimeout(() => {
                    this.connectionState = 'connected';
                    this.eventManager.emit('connection:state', this.connectionState);
                    this.processMessageQueue();
                }, 2000 + Math.random() * 3000);
            }
        }, 30000); // Check every 30 seconds
    }
    
    startMessageQueueProcessor() {
        setInterval(() => {
            this.processMessageQueue();
        }, 1000);
    }
    
    processMessageQueue() {
        if (this.connectionState !== 'connected' || this.messageQueue.length === 0) {
            return;
        }
        
        while (this.messageQueue.length > 0) {
            const queuedMessage = this.messageQueue.shift();
            this.deliverMessage(queuedMessage);
        }
    }
    
    deliverMessage(message) {
        this.addMessage(message.content, message.type, message.agent, message.agentName);
    }
    
    updateConnectionUI(state) {
        const connectionIndicator = document.querySelector('.connection-status');
        if (connectionIndicator) {
            connectionIndicator.className = `connection-status ${state}`;
            connectionIndicator.textContent = state.charAt(0).toUpperCase() + state.slice(1);
        }
    }

    render() {
        const chatContainer = document.createElement('div');
        chatContainer.className = 'brief-to-assets-chat';
        chatContainer.innerHTML = this.getTemplate();
        
        // Find and replace any existing chat interface
        const existingChat = document.querySelector('.brief-to-assets-chat');
        if (existingChat) {
            existingChat.replaceWith(chatContainer);
        } else {
            // Insert into Creative Suite interface
            const suiteInterface = document.getElementById('creative-suite-interface');
            if (suiteInterface) {
                suiteInterface.appendChild(chatContainer);
            }
        }
    }

    getTemplate() {
        return `
            <!-- Simplified Campaign Header -->
            <div class="campaign-header compact">
                <div class="ai-agents minimal">
                    ${this.renderCompactAgentBadges()}
                </div>
            </div>

            <!-- Chat Interface -->
            <div class="chat-container">
                <!-- Connection Status -->
                <div class="connection-status connected">Connected</div>
                
                <!-- Message Thread -->
                <div class="message-thread" id="message-thread">
                    ${this.renderMessages()}
                </div>

                <!-- Input Area -->
                <div class="chat-input-container">
                    <div class="input-wrapper">
                        <textarea 
                            class="chat-input" 
                            id="chat-input"
                            placeholder="Respond to the AI agents or provide feedback on the campaign ideas..."
                            rows="3"
                        ></textarea>
                        <div class="input-actions">
                            <button class="send-btn" id="send-btn">Send</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Side Panel -->
            <div class="chat-sidebar">
                <div class="conversation-threads">
                    <h3>Conversation Threads</h3>
                    ${this.renderConversationThreads()}
                </div>

                <div class="campaign-progress">
                    <h3>Campaign Progress</h3>
                    ${this.renderCampaignProgress()}
                </div>
            </div>
        `;
    }


    renderAgentBadges() {
        return this.renderEnhancedAgentBadges();
    }

    renderEnhancedAgentBadges() {
        return Object.entries(this.aiAgents).map(([agentId, agent]) => {
            const confidenceLevel = this.confidenceSystem.getConfidenceLevel(agent.confidence);
            const emoji = this.visualEnhancer.getAgentEmoji(agentId);
            const agentColor = this.visualEnhancer.agentColors[agentId] || 'var(--accent-primary)';
            
            return `<span class="agent-badge enhanced ${agentId} ${agent.status} confidence-${confidenceLevel}" 
                       data-agent="${agentId}"
                       style="--agent-color: ${agentColor}; --agent-confidence: ${agent.confidence}">
                    <span class="agent-emoji">${emoji}</span>
                    <span class="agent-name">${this.getAgentName(agentId)}</span>
                    <span class="confidence-bar">
                        <span class="confidence-fill" style="width: ${agent.confidence * 100}%"></span>
                    </span>
                    <span class="status-indicator ${agent.status}"></span>
                </span>`;
        }).join('');
    }

    renderCompactAgentBadges() {
        return Object.entries(this.aiAgents).map(([agentId, agent]) => {
            const emoji = this.visualEnhancer.getAgentEmoji(agentId);
            const agentColor = this.visualEnhancer.agentColors[agentId] || 'var(--accent-primary)';
            
            return `<span class="agent-badge compact ${agentId} ${agent.status}" 
                       data-agent="${agentId}"
                       style="--agent-color: ${agentColor}; --agent-confidence: ${agent.confidence}">
                    <span class="agent-emoji">${emoji}</span>
                    <span class="status-indicator ${agent.status}"></span>
                </span>`;
        }).join('');
    }

    renderMessages() {
        if (this.messages.length === 0) {
            return `
                <div class="ai-message strategy-specialist">
                    <div class="agent-avatar">🧠</div>
                    <div class="message-content">
                        <div class="agent-name">Strategy Specialist</div>
                        <div class="message-text">
                            I've identified 3 primary target segments: Performance Athletes (primary), 
                            Casual Fitness enthusiasts, and Fashion-Forward activewear consumers. 
                            Should we focus primarily on the Performance Athletes segment?
                        </div>
                        <div class="quick-actions">
                            <button class="action-btn approve" data-action="approve" data-content="performance-athletes">
                                ✅ Yes, focus on Performance Athletes
                            </button>
                            <button class="action-btn alternative" data-action="show-segments">
                                📊 Show all segments
                            </button>
                            <button class="action-btn expand" data-action="tell-more">
                                💬 Tell me more
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        return this.messages.map(message => this.renderMessage(message)).join('');
    }

    renderMessage(message) {
        if (message.type === 'ai') {
            const agent = this.aiAgents[message.agent] || { confidence: 0.8 };
            const agentColor = this.visualEnhancer.agentColors[message.agent] || 'var(--accent-primary)';
            
            return `
                <div class="ai-message ${message.agent}" style="--agent-color: ${agentColor}; --agent-confidence: ${agent.confidence}">
                    ${this.visualEnhancer.renderEnhancedAvatar(message.agent, agent.status || 'ready', agent.confidence)}
                    <div class="message-content">
                        <div class="agent-name" style="color: ${agentColor}">
                            ${message.agentName}
                            <span class="confidence-indicator confidence-${this.confidenceSystem.getConfidenceLevel(agent.confidence)}"></span>
                        </div>
                        <div class="message-text">${message.content}</div>
                        ${message.actions ? this.renderQuickActions(message.actions) : ''}
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="human-message">
                    <div class="message-content">
                        ${message.content}
                    </div>
                </div>
            `;
        }
    }

    renderQuickActions(actions) {
        return `
            <div class="quick-actions">
                ${actions.map(action => 
                    `<button class="action-btn ${action.type}" data-action="${action.id}">
                        ${action.label}
                    </button>`
                ).join('')}
            </div>
        `;
    }


    renderConversationThreads() {
        return this.conversationThreads.map(thread =>
            `<div class="thread-item ${thread.status}" data-thread="${thread.id}">
                <div class="thread-icon">${this.getThreadIcon(thread.id)}</div>
                <div class="thread-content">
                    <div class="thread-title">${thread.title}</div>
                    <div class="thread-meta">${thread.messages} messages • ${thread.status}</div>
                </div>
            </div>`
        ).join('');
    }

    renderCampaignProgress() {
        return this.campaignProgress.map(item =>
            `<div class="progress-item ${item.status}">
                <span class="progress-icon">${this.getProgressIcon(item.status)}</span>
                <span class="progress-label">${item.label}</span>
            </div>`
        ).join('');
    }

    getAgentEmoji(agent) {
        const emojis = {
            'strategy': '🧠',
            'creative': '🎨', 
            'copy': '✍️',
            'design': '🎯',
            'legal': '⚖️',
            'brand': '🏷️',
            'email': '📧',
            'image': '🖼️'
        };
        return emojis[agent] || '🤖';
    }

    getAgentName(agentId) {
        const names = {
            'strategy': 'Strategy Specialist',
            'creative': 'Creative Specialist',
            'copy': 'Copy Agent',
            'design': 'Design Agent',
            'legal': 'Legal Agent',
            'brand': 'Brand Agent',
            'email': 'Email Agent',
            'image': 'Image Agent'
        };
        return names[agentId] || 'AI Agent';
    }

    getConfidenceLevel(score) {
        if (score >= 80) return 'high';
        if (score >= 60) return 'medium';
        return 'low';
    }

    generateContextualSuggestions() {
        const campaign = this.campaigns.find(c => c.id === this.selectedCampaign);
        const baseSuggestions = [
            { text: 'Tell me more about this approach', icon: '💬', type: 'inquiry', confidence: 0.9 },
            { text: 'Show alternative options', icon: '🔄', type: 'alternative', confidence: 0.8 },
            { text: 'Generate visual concepts', icon: '🎨', type: 'creation', confidence: 0.85 }
        ];

        if (campaign) {
            const campaignSpecific = {
                'athleisure-2024': [
                    { text: 'Focus on performance metrics', icon: '⚡', type: 'focus', confidence: 0.92 },
                    { text: 'Explore lifestyle angles', icon: '🏃', type: 'exploration', confidence: 0.87 }
                ],
                'ai-productivity': [
                    { text: 'Emphasize efficiency gains', icon: '🚀', type: 'focus', confidence: 0.89 },
                    { text: 'Show workflow improvements', icon: '📊', type: 'demonstration', confidence: 0.84 }
                ],
                'eco-fashion': [
                    { text: 'Highlight sustainability', icon: '🌱', type: 'focus', confidence: 0.91 },
                    { text: 'Show environmental impact', icon: '🌍', type: 'impact', confidence: 0.86 }
                ]
            };
            
            return [...baseSuggestions, ...(campaignSpecific[campaign.id] || [])];
        }
        
        return baseSuggestions;
    }

    getThreadIcon(threadId) {
        const icons = {
            'main': '💬',
            'creative': '🎨',
            'messaging': '⚡'
        };
        return icons[threadId] || '💬';
    }

    getProgressIcon(status) {
        const icons = {
            'completed': '✅',
            'in-progress': '🟡',
            'pending': '⏳'
        };
        return icons[status] || '⏳';
    }

    attachEventListeners() {

        // Quick action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('action-btn')) {
                this.handleQuickAction(e.target.dataset.action, e.target);
            }
        });


        // Send button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'send-btn') {
                this.handleMessageSend();
            }
        });


        // Enter key in chat input
        document.addEventListener('keydown', (e) => {
            if (e.target.id === 'chat-input' && e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleMessageSend();
            }
        });

        // Thread switching
        document.addEventListener('click', (e) => {
            if (e.target.closest('.thread-item')) {
                const threadItem = e.target.closest('.thread-item');
                this.handleThreadSwitch(threadItem.dataset.thread);
            }
        });
    }


    handleQuickAction(action, button) {
        console.log('⚡ Quick action:', action);
        
        // Enhanced visual feedback with animation
        this.animateButtonClick(button);
        
        // Process the action with enhanced logic
        switch (action) {
            case 'approve':
                this.handleApproval(button.dataset.content);
                break;
            case 'show-segments':
                this.showAllSegments();
                break;
            case 'tell-more':
                this.requestMoreInfo();
                break;
            case 'generate-moodboards':
                this.generateMoodboards();
                break;
            case 'style-alternatives':
                this.showStyleAlternatives();
                break;
            case 'energy-themes':
                this.exploreEnergyThemes();
                break;
            case 'market-research':
                this.showMarketResearch();
                break;
            case 'competitive-analysis':
                this.showCompetitiveAnalysis();
                break;
            case 'approve-positioning':
                this.approvePositioning();
                break;
            default:
                this.handleGenericAction(action);
        }
        
        // Track action for analytics
        this.eventManager.emit('action:clicked', { action, timestamp: Date.now() });
    }
    
    animateButtonClick(button) {
        // Use the AI interaction manager for enhanced animations
        this.interactionManager.addButtonClickAnimation(button);
        
        // Add visual feedback with smooth animation
        button.style.background = 'var(--confidence-high)';
        button.style.color = 'white';
        button.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Disable button temporarily to prevent double-clicks
        button.disabled = true;
        setTimeout(() => {
            button.disabled = false;
            // Reset styles
            button.style.background = '';
            button.style.color = '';
        }, 1000);
    }
    
    generateMoodboards() {
        this.addMessage('Generate mood boards for Performance Athletes segment', 'user');
        
        setTimeout(() => {
            this.addMessage(
                'I\'ve created 3 mood board concepts focusing on: 1) Urban Performance (street workouts, city athletics), 2) Premium Training (high-end gym environments), and 3) Lifestyle Integration (athleisure in daily life). Each emphasizes authentic athlete stories and bold visual treatment.',
                'ai',
                'creative',
                'Creative Specialist'
            );
        }, 2000);
    }
    
    showStyleAlternatives() {
        this.addMessage('Show me alternative style directions', 'user');
        
        setTimeout(() => {
            this.addMessage(
                'Here are 3 alternative approaches: 1) Minimalist Clean - focus on product and subtle typography, 2) Bold Dynamic - high contrast, energetic compositions, 3) Documentary Style - authentic behind-the-scenes athlete content. Which direction resonates with your vision?',
                'ai',
                'creative',
                'Creative Specialist'
            );
        }, 1800);
    }
    
    exploreEnergyThemes() {
        this.addMessage('Focus on energy themes for the campaign', 'user');
        
        setTimeout(() => {
            this.addMessage(
                'Energy themes could include: ⚡ "Unleash Your Power" - internal motivation, 🚀 "Push Beyond" - breaking limitations, 🔥 "Fuel Your Fire" - passion-driven performance. These themes work across all touchpoints and create emotional connection with Performance Athletes.',
                'ai',
                'strategy',
                'Strategy Specialist'
            );
        }, 2200);
    }
    
    showMarketResearch() {
        this.addMessage('Show me the market research data', 'user');
        
        setTimeout(() => {
            this.addMessage(
                'Market insights show: Performance Athletes segment grew 23% in 2024, with 67% preferring authentic content over polished ads. Key decision factors: product performance (89%), brand authenticity (76%), and social proof (71%). Optimal spend allocation: Digital 45%, Influencer 30%, Traditional 25%.',
                'ai',
                'strategy',
                'Strategy Specialist'
            );
        }, 2500);
    }
    
    showCompetitiveAnalysis() {
        this.addMessage('Analyze the competitive landscape', 'user');
        
        setTimeout(() => {
            this.addMessage(
                'Competitive analysis reveals: Nike dominates with performance storytelling (42% share), Adidas focuses on culture integration (28%), Under Armour emphasizes innovation (18%). Our opportunity: authentic athlete partnerships with premium positioning - a gap in the market worth $2.3B.',
                'ai',
                'strategy',
                'Strategy Specialist'
            );
        }, 2800);
    }
    
    approvePositioning() {
        this.addMessage('I approve this positioning strategy', 'user');
        
        setTimeout(() => {
            this.addMessage(
                'Excellent! I\'ll document this positioning and begin developing creative briefs. Next steps: 1) Create detailed buyer personas, 2) Develop messaging architecture, 3) Design initial creative concepts. Ready to move to creative development phase?',
                'ai',
                'strategy',
                'Strategy Specialist'
            );
        }, 1500);
    }
    
    handleGenericAction(action) {
        const responses = {
            'continue': 'Please continue with your analysis',
            'modify': 'Let\'s modify this approach based on new insights',
            'explore-options': 'Show me additional options and alternatives'
        };
        
        const userMessage = responses[action] || `Execute action: ${action}`;
        this.addMessage(userMessage, 'user');
        
        setTimeout(() => {
            this.generateAIResponse(userMessage);
        }, 1000);
    }


    handleMessageSend() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            
            // Generate AI response
            setTimeout(() => {
                this.generateAIResponse(message);
            }, 1000);
        }
    }


    handleThreadSwitch(threadId) {
        console.log('🧵 Switched to thread:', threadId);
        
        // Update active thread
        document.querySelectorAll('.thread-item').forEach(item => {
            item.classList.toggle('active', item.dataset.thread === threadId);
        });
    }

    addMessage(content, type, agent = null, agentName = null) {
        const message = {
            id: Date.now(),
            content,
            type,
            agent,
            agentName,
            timestamp: new Date()
        };

        // Queue message if not connected
        if (this.connectionState !== 'connected' && type === 'ai') {
            this.messageQueue.push(message);
            return;
        }

        this.messages.push(message);
        this.performanceMetrics.messageCount++;
        
        // Emit message event
        this.eventManager.emit('message:added', message);
        
        // Update UI
        this.updateMessageThread();
        
        // Cleanup memory periodically
        if (this.performanceMetrics.messageCount % 50 === 0) {
            this.cleanupMemory();
        }
    }

    updateMessageThread() {
        const startTime = performance.now();
        
        const thread = document.getElementById('message-thread');
        if (thread) {
            // Use render manager for optimized updates
            this.renderManager.optimizedMessageUpdate(thread, this.renderMessages());
            
            // Smooth scroll to bottom
            this.smoothScrollToBottom(thread);
            
            // Track performance
            const renderTime = performance.now() - startTime;
            this.performanceMetrics.renderTime.push(renderTime);
            
            // Cleanup old performance data
            if (this.performanceMetrics.renderTime.length > 100) {
                this.performanceMetrics.renderTime.shift();
            }
        }
    }
    
    smoothScrollToBottom(container) {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    cleanupMemory() {
        // Clean up old messages from memory if we have too many
        if (this.messages.length > 1000) {
            this.messages = this.messages.slice(-500); // Keep last 500 messages
        }
        
        // Clean up message pool
        if (this.messagePool.length > 50) {
            this.messagePool = this.messagePool.slice(-25);
        }
        
        // Update cleanup timestamp
        this.performanceMetrics.lastCleanup = Date.now();
    }

    generateAIResponse(userMessage) {
        // Determine which agent should respond
        const respondingAgent = this.selectOptimalAgent(this.analyzeMessageContext(userMessage));
        
        // Show typing indicator for the responding agent
        this.showTypingIndicator(respondingAgent);
        
        // Update agent status to working
        this.updateAgentStatus(respondingAgent, 'working');
        
        // Mock AI responses based on user message with enhanced intelligence
        const responses = this.getIntelligentResponses(userMessage);
        const response = this.selectBestResponse(responses, userMessage);
        
        // Simulate realistic AI processing time
        const processingTime = 1500 + Math.random() * 2000;
        
        setTimeout(() => {
            this.hideTypingIndicator();
            this.updateAgentStatus(response.agent, 'ready');
            
            // Add message with enhanced visual effects
            this.addMessage(response.content, 'ai', response.agent, response.agentName);
            
            // Add actions to the last message
            if (response.actions) {
                const lastMessage = this.messages[this.messages.length - 1];
                lastMessage.actions = response.actions;
                this.updateMessageThread();
            }
            
            // Update agent confidence based on response quality
            this.updateAgentConfidence(response.agent, response.confidence || 0.8);
            
            // Apply entrance animation to the new message
            setTimeout(() => {
                const lastMessageElement = document.querySelector('.ai-message:last-of-type');
                if (lastMessageElement) {
                    this.interactionManager.animateMessageEntrance(lastMessageElement);
                }
            }, 50);
            
        }, processingTime);
    }
    
    getIntelligentResponses(userMessage) {
        const campaign = this.campaigns.find(c => c.id === this.selectedCampaign);
        const messageContext = this.analyzeMessageContext(userMessage);
        
        const responses = {
            'performance-athletes': {
                agent: 'creative',
                agentName: 'Creative Specialist',
                content: 'Perfect! For Performance Athletes, I recommend a motivational, high-energy creative direction. Think urban gym settings, action photography, and bold typography. Should I generate some initial mood board concepts?',
                confidence: 0.92,
                actions: [
                    { id: 'generate-moodboards', type: 'approve', label: '✅ Generate mood boards' },
                    { id: 'style-alternatives', type: 'alternative', label: '🎨 Show style alternatives' },
                    { id: 'energy-themes', type: 'expand', label: '⚡ Focus on energy themes' }
                ]
            },
            'brand-positioning': {
                agent: 'strategy',
                agentName: 'Strategy Specialist',
                content: `Based on your ${campaign?.name || 'current'} campaign objectives, I recommend positioning around premium performance and lifestyle integration. This aligns with current market trends showing 67% preference for authentic athletic content.`,
                confidence: 0.89,
                actions: [
                    { id: 'market-research', type: 'expand', label: '📊 Show market data' },
                    { id: 'competitive-analysis', type: 'alternative', label: '🎯 Competitive landscape' },
                    { id: 'approve-positioning', type: 'approve', label: '✅ Approve positioning' }
                ]
            },
            'visual-concepts': {
                agent: 'design',
                agentName: 'Design Agent',
                content: 'I can create visual concepts that blend performance aesthetics with lifestyle appeal. Thinking bold typography, dynamic compositions, and authentic athlete imagery. What style direction resonates most?',
                confidence: 0.85,
                actions: [
                    { id: 'minimalist-approach', type: 'alternative', label: '🎆 Minimalist & clean' },
                    { id: 'bold-dynamic', type: 'approve', label: '⚡ Bold & dynamic' },
                    { id: 'lifestyle-focused', type: 'expand', label: '🏃 Lifestyle integration' }
                ]
            }
        };
        
        // Enhanced default response with campaign context
        const defaultResponse = {
            agent: this.selectOptimalAgent(messageContext),
            agentName: this.getAgentName(this.selectOptimalAgent(messageContext)),
            content: this.generateContextualResponse(userMessage, campaign, messageContext),
            confidence: 0.75,
            actions: [
                { id: 'continue', type: 'approve', label: '✅ Continue' },
                { id: 'modify', type: 'alternative', label: '🔄 Modify approach' },
                { id: 'explore-options', type: 'expand', label: '🔍 Explore options' }
            ]
        };
        
        return responses[this.detectMessageIntent(userMessage)] || defaultResponse;
    }
    
    selectBestResponse(responses, userMessage) {
        // Enhanced response selection based on campaign context and message history
        const messageHistory = this.messages.slice(-5); // Last 5 messages for context
        const campaign = this.campaigns.find(c => c.id === this.selectedCampaign);
        
        // If it's a single response object, return it
        if (!Array.isArray(responses)) {
            return responses;
        }
        
        // Select based on campaign confidence and context relevance
        return responses.reduce((best, current) => {
            const contextScore = this.calculateContextRelevance(current, campaign, messageHistory);
            const confidenceScore = current.confidence || 0.5;
            const totalScore = (contextScore * 0.6) + (confidenceScore * 0.4);
            
            return totalScore > (best.totalScore || 0) ? { ...current, totalScore } : best;
        }, responses[0]);
    }
    
    analyzeMessageContext(message) {
        const keywords = {
            strategy: ['positioning', 'audience', 'market', 'objectives', 'goals'],
            creative: ['visual', 'design', 'imagery', 'style', 'aesthetic'],
            copy: ['messaging', 'copy', 'text', 'content', 'voice'],
            design: ['layout', 'composition', 'typography', 'color', 'brand']
        };
        
        const messageLower = message.toLowerCase();
        const scores = {};
        
        Object.entries(keywords).forEach(([agent, words]) => {
            scores[agent] = words.reduce((score, word) => {
                return score + (messageLower.includes(word) ? 1 : 0);
            }, 0);
        });
        
        return scores;
    }
    
    selectOptimalAgent(context) {
        const maxScore = Math.max(...Object.values(context));
        const optimalAgent = Object.entries(context).find(([agent, score]) => score === maxScore)?.[0];
        return optimalAgent || 'strategy';
    }
    
    detectMessageIntent(message) {
        const intents = {
            'performance-athletes': /performance|athlete|sport|fitness|training/i,
            'brand-positioning': /position|brand|market|competition|audience/i,
            'visual-concepts': /visual|design|concept|image|creative|art/i
        };
        
        for (const [intent, pattern] of Object.entries(intents)) {
            if (pattern.test(message)) {
                return intent;
            }
        }
        
        return null;
    }
    
    generateContextualResponse(message, campaign, context) {
        const templates = [
            `I understand your feedback: "${message}". Let me analyze this for your ${campaign?.name || 'current'} campaign.`,
            `Great input! Based on your ${campaign?.name || 'current'} campaign context, here's my recommendation...`,
            `Considering your ${campaign?.name || 'current'} campaign objectives, I suggest we explore this direction further.`
        ];
        
        return templates[Math.floor(Math.random() * templates.length)];
    }
    
    calculateContextRelevance(response, campaign, messageHistory) {
        // Simple relevance scoring based on campaign and message context
        let score = 0.5; // Base score
        
        if (campaign) {
            // Boost score for campaign-specific content
            if (response.content.includes(campaign.name) || response.content.includes(campaign.shortName)) {
                score += 0.2;
            }
        }
        
        // Consider message history for conversation flow
        const recentAgents = messageHistory.map(m => m.agent).filter(Boolean);
        if (recentAgents.includes(response.agent)) {
            score += 0.1; // Boost for conversation continuity
        }
        
        return Math.min(score, 1.0);
    }
    
    showTypingIndicator(agent = 'strategy') {
        this.interactionManager.showTypingIndicator(agent);
    }
    
    hideTypingIndicator() {
        this.interactionManager.hideTypingIndicator();
    }
    
    updateAgentStatus(agentId, status) {
        if (this.aiAgents[agentId]) {
            this.aiAgents[agentId].status = status;
            this.updateAgentBadges();
            
            // Emit status change event
            this.eventManager.emit('agent:status:changed', { agentId, status });
        }
    }
    
    updateAgentConfidence(agentId, newConfidence) {
        if (this.aiAgents[agentId]) {
            // Smooth confidence updates
            const currentConfidence = this.aiAgents[agentId].confidence;
            const targetConfidence = Math.min(Math.max(newConfidence, 0), 1);
            
            // Gradually update confidence
            this.aiAgents[agentId].confidence = currentConfidence + (targetConfidence - currentConfidence) * 0.3;
            
            // Update visual confidence indicators
            this.confidenceSystem.updateAgentConfidence(agentId, this.aiAgents[agentId].confidence);
            this.updateAgentBadges();
            
            // Emit confidence change event
            this.eventManager.emit('agent:confidence:changed', { agentId, confidence: this.aiAgents[agentId].confidence });
        }
    }
    
    updateAgentBadges() {
        const agentContainer = document.querySelector('.ai-agents');
        if (agentContainer) {
            agentContainer.innerHTML = this.renderEnhancedAgentBadges();
        }
    }

    loadInitialConversation() {
        // Load default conversation for the selected campaign
        console.log('💬 Loading initial conversation for:', this.selectedCampaign);
    }

    loadCampaignConversation(campaignId) {
        console.log('📂 Loading conversation for campaign:', campaignId);
        // Here you would load campaign-specific conversation history
    }

    handleApproval(content) {
        this.addMessage(`Yes, let's focus on ${content.replace('-', ' ')}. They align best with our brand positioning.`, 'user');
    }

    showAllSegments() {
        this.addMessage('Please show me all target segments with detailed analysis.', 'user');
    }

    requestMoreInfo() {
        this.addMessage('Tell me more about the Performance Athletes segment and why you recommend focusing on them.', 'user');
    }
}

// Export for use in main application
window.BriefToAssetsChat = BriefToAssetsChat;