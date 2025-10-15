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
        
        // Mood board and core asset management
        this.selectedMoodboardImages = [];
        this.coreAssetImages = [
            'https://wolfnessathletics.com/cdn/shop/articles/Why-Every-Woman-Needs-a-Stylish-Athleisure-Set-in-Her-Closet-Wolfness-Athletics-190302390_589x.jpg?v=1725727501',
            'https://www.alittlebirdboutique.com/cdn/shop/files/BA4DFF2E-BD2A-4F42-AFD5-4A0D38621B63_1_105_c.jpg?v=1730746648',
            'https://www.highsnobiety.com/static-assets/dato/1679319196-athleisure-brands-9.jpg?fp-x=0.5&fp-y=0.5&fit=crop&auto=compress%2Cformat&cs=srgb&ar=800%3A1200&w=800'
        ];
        this.currentAssetIndex = 0;
        
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
                            Welcome! Please select a campaign to begin your creative brief development. Each campaign card contains high-level information about objectives, target audiences, and strategic considerations.
                        </div>
                        <div class="campaign-selection-cards">
                            ${this.renderCampaignCards()}
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

    renderCampaignCards() {
        const campaigns = [
            {
                id: 'fall-athleisure-2025',
                title: 'Fall 2025 Athleisure Collection',
                objective: 'Drive awareness and sales of the new Fall 2025 premium athleisure collection, targeting women 25-40, with the dual goal of boosting online purchases and increasing in-store visits for try-on experiences.',
                launchDate: 'October 27, 2025 (T-60 days)',
                targetAudiences: [
                    {
                        name: 'Hybrid Worker',
                        attributes: 'Age: 25-40, Income: $45k-$85k, Urban/Suburban'
                    },
                    {
                        name: 'Wellness Enthusiast', 
                        attributes: 'Age: 28-42, Income: $55k-$95k, Urban areas'
                    },
                    {
                        name: 'Young Professional',
                        attributes: 'Age: 22-35, Income: $40k-$75k, Metropolitan areas'
                    }
                ]
            },
            {
                id: 'professional-workwear-2025',
                title: 'Professional Workwear 2025',
                objective: 'Drive sales of premium workwear targeting working professionals aged 25-50 returning to hybrid office environments.',
                launchDate: 'September 10, 2025 (T-35 days)',
                targetAudiences: [
                    {
                        name: 'Corporate Professional',
                        attributes: 'Age: 28-45, Income: $60k-$120k, Urban'
                    },
                    {
                        name: 'Hybrid Worker',
                        attributes: 'Age: 25-40, Income: $45k-$85k, Urban/Suburban'
                    }
                ]
            },
            {
                id: 'weekend-casual-luxe-2025',
                title: 'Weekend Casual Luxe 2025',
                objective: 'Promote premium casual wear targeting affluent adults aged 30-55 seeking sophisticated leisure clothing.',
                launchDate: 'April 20, 2025 (T-40 days)',
                targetAudiences: [
                    {
                        name: 'Affluent Suburbanite',
                        attributes: 'Age: 35-55, Income: $80k-$150k, Suburban'
                    },
                    {
                        name: 'Urban Sophisticate',
                        attributes: 'Age: 30-45, Income: $70k-$130k, Urban'
                    }
                ]
            },
            {
                id: 'date-night-elegance-2025',
                title: 'Date Night & Special Occasion 2025',
                objective: 'Drive revenue in special occasion wear targeting adults aged 25-50 for date nights and celebrations.',
                launchDate: 'February 1, 2025 (T-28 days)',
                targetAudiences: [
                    {
                        name: 'Young Professional',
                        attributes: 'Age: 25-35, Income: $45k-$80k, Urban'
                    },
                    {
                        name: 'Established Couple',
                        attributes: 'Age: 35-50, Income: $80k-$140k, Urban/Suburban'
                    }
                ]
            }
        ];

        return campaigns.map(campaign => `
            <div class="campaign-card" data-campaign-id="${campaign.id}">
                <div class="campaign-card-header">
                    <h3 class="campaign-title">${campaign.title}</h3>
                    <div class="launch-date">${campaign.launchDate}</div>
                </div>
                <div class="campaign-objective">
                    ${campaign.objective.length > 120 ? campaign.objective.substring(0, 120) + '...' : campaign.objective}
                </div>
                <div class="target-audiences">
                    <div class="audience-count">${campaign.targetAudiences.length} Target Audiences</div>
                    <div class="audience-list">
                        ${campaign.targetAudiences.map(audience => `
                            <div class="audience-item">
                                <span class="audience-name">${audience.name}</span>
                                <span class="audience-attrs">${audience.attributes}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="campaign-card-footer">
                    <button class="select-campaign-btn" data-campaign-id="${campaign.id}">
                        Select Campaign
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderConceptCard() {
        return `
            <div class="concept-card wellness-concept compact">
                <div class="concept-header">
                    <div class="concept-persona">Wellness Enthusiast</div>
                    <div class="concept-status-row">
                        <span class="concept-priority">Primary</span>
                        <span class="concept-phase">Draft</span>
                    </div>
                </div>
                <div class="concept-content">
                    <div class="concept-title-row">
                        <h3 class="concept-title">The Mindful Movement</h3>
                        <div class="core-message-inline">Performance Meets Peace of Mind</div>
                    </div>
                    <p class="concept-description compact">
                        Seamless yoga-to-brunch-to-evening transitions for wellness-focused women.
                    </p>
                    <div class="concept-details-grid">
                        <div class="detail-section">
                            <span class="detail-label">Target:</span>
                            <span class="detail-value">Female, 28-42, Fitness & Sustainability focused</span>
                        </div>
                        <div class="detail-section">
                            <span class="detail-label">Key Need:</span>
                            <span class="detail-value">High-performance + Eco-friendly + Versatile daily wear</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPerformanceStats() {
        return `
            <div class="performance-stats compact">
                <div class="stats-header-inline">
                    <span class="stats-icon">📊</span>
                    <span class="stats-title">Campaign Intelligence</span>
                    <div class="stats-inline">
                        <span class="stat-compact">Past Performance: <strong class="positive">+34%</strong></span>
                        <span class="stat-compact">Brand Compliance: <strong class="high">98%</strong></span>
                        <span class="stat-compact">Predicted CTR: <strong class="good">4.2%</strong></span>
                    </div>
                </div>
            </div>
        `;
    }

    renderMoodBoard() {
        const images = [
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400&h=400&fit=crop'
        ];

        return `
            <div class="mood-board">
                <div class="mood-board-header">
                    <h3>The Mindful Movement - Mood Board</h3>
                    <div class="selection-counter">
                        <span id="selection-count">0 of ${images.length} selected</span>
                    </div>
                </div>
                <div class="mood-board-grid">
                    ${images.map((imageUrl, index) => `
                        <div class="mood-board-item selectable" style="grid-area: item${index + 1}" data-image-index="${index}">
                            <img src="${imageUrl}" alt="Mood board inspiration ${index + 1}" loading="lazy">
                            <div class="selection-indicator">
                                <div class="checkbox-overlay"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="core-asset-actions" id="core-asset-actions" style="display: none;">
                    <button class="generate-core-asset-btn" id="generate-core-asset-btn">Generate Core Asset</button>
                </div>
                <div class="core-asset-preview" id="core-asset-preview" style="display: none;">
                    <h3>Generated Core Asset</h3>
                    <div class="asset-container">
                        <img id="generated-asset" src="" alt="Generated core asset">
                        <div class="asset-metadata">
                            <span class="asset-type">Image</span>
                            <span class="asset-dimensions">1080x1080</span>
                        </div>
                    </div>
                    <button class="generate-new-image-btn" id="generate-new-image-btn">Generate New Image</button>
                </div>
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

        // Campaign card selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('select-campaign-btn') || e.target.closest('.campaign-card')) {
                const campaignId = e.target.dataset.campaignId || e.target.closest('.campaign-card')?.dataset.campaignId;
                if (campaignId) {
                    this.handleCampaignSelection(campaignId);
                }
            }
        });

        // Mood board image selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.mood-board-item.selectable')) {
                const moodBoardItem = e.target.closest('.mood-board-item.selectable');
                const imageIndex = parseInt(moodBoardItem.dataset.imageIndex);
                this.toggleImageSelection(imageIndex);
            }
        });

        // Generate core asset button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'generate-core-asset-btn') {
                this.generateCoreAsset();
            }
        });

        // Generate new image button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'generate-new-image-btn') {
                this.generateNewImage();
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
            case 'focus-wellness':
                this.handleWellnessEnthusiastFocus();
                break;
            case 'create-mood-board':
                this.createMoodBoard();
                break;
            case 'generate-new-asset-image':
                this.generateNewAssetImage();
                break;
            case 'approve-asset':
                this.approveGeneratedAsset();
                break;
            case 'refine-asset':
                this.requestAssetRefinements();
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
        
        // Show thinking animation for 1 second, then generate response
        this.showTypingIndicator('creative');
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(
                'I\'ve created 3 mood board concepts focusing on: 1) Urban Performance (street workouts, city athletics), 2) Premium Training (high-end gym environments), and 3) Lifestyle Integration (athleisure in daily life). Each emphasizes authentic athlete stories and bold visual treatment.',
                'ai',
                'creative',
                'Creative Specialist'
            );
        }, 1000);
    }
    
    showStyleAlternatives() {
        this.addMessage('Show me alternative style directions', 'user');
        
        // Show thinking animation for 1 second, then generate response
        this.showTypingIndicator('creative');
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(
                'Here are 3 alternative approaches: 1) Minimalist Clean - focus on product and subtle typography, 2) Bold Dynamic - high contrast, energetic compositions, 3) Documentary Style - authentic behind-the-scenes athlete content. Which direction resonates with your vision?',
                'ai',
                'creative',
                'Creative Specialist'
            );
        }, 1000);
    }
    
    exploreEnergyThemes() {
        this.addMessage('Focus on energy themes for the campaign', 'user');
        
        // Show thinking animation for 1 second, then generate response
        this.showTypingIndicator('strategy');
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(
                'Energy themes could include: ⚡ "Unleash Your Power" - internal motivation, 🚀 "Push Beyond" - breaking limitations, 🔥 "Fuel Your Fire" - passion-driven performance. These themes work across all touchpoints and create emotional connection with Performance Athletes.',
                'ai',
                'strategy',
                'Strategy Specialist'
            );
        }, 1000);
    }
    
    showMarketResearch() {
        this.addMessage('Show me the market research data', 'user');
        
        // Show thinking animation for 1 second, then generate response
        this.showTypingIndicator('strategy');
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(
                'Market insights show: Performance Athletes segment grew 23% in 2024, with 67% preferring authentic content over polished ads. Key decision factors: product performance (89%), brand authenticity (76%), and social proof (71%). Optimal spend allocation: Digital 45%, Influencer 30%, Traditional 25%.',
                'ai',
                'strategy',
                'Strategy Specialist'
            );
        }, 1000);
    }
    
    showCompetitiveAnalysis() {
        this.addMessage('Analyze the competitive landscape', 'user');
        
        // Show thinking animation for 1 second, then generate response
        this.showTypingIndicator('strategy');
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(
                'Competitive analysis reveals: Nike dominates with performance storytelling (42% share), Adidas focuses on culture integration (28%), Under Armour emphasizes innovation (18%). Our opportunity: authentic athlete partnerships with premium positioning - a gap in the market worth $2.3B.',
                'ai',
                'strategy',
                'Strategy Specialist'
            );
        }, 1000);
    }
    
    approvePositioning() {
        this.addMessage('I approve this positioning strategy', 'user');
        
        // Show thinking animation for 1 second, then generate response
        this.showTypingIndicator('strategy');
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(
                'Excellent! I\'ll document this positioning and begin developing creative briefs. Next steps: 1) Create detailed buyer personas, 2) Develop messaging architecture, 3) Design initial creative concepts. Ready to move to creative development phase?',
                'ai',
                'strategy',
                'Strategy Specialist'
            );
        }, 1000);
    }

    handleWellnessEnthusiastFocus() {
        this.addMessage('Focus on Wellness Enthusiasts - they align perfectly with our premium positioning', 'user');
        
        // Show thinking animation for 1 second, then generate response
        this.showTypingIndicator('creative');
        setTimeout(() => {
            this.hideTypingIndicator();
            
            const conceptContent = `
                Perfect choice! I'm developing ideas specifically for Wellness Enthusiasts. Here's my primary concept:
                
                ${this.renderConceptCard()}
                
                ${this.renderPerformanceStats()}
                
                This concept shows strong potential based on our data. Would you like me to create a visual mood board to bring 'The Mindful Movement' concept to life?
            `;
            
            this.addMessage(
                conceptContent,
                'ai',
                'creative',
                'Creative Specialist'
            );
            
            // Add mood board creation action
            const lastMessage = this.messages[this.messages.length - 1];
            lastMessage.actions = [
                { id: 'create-mood-board', type: 'approve', label: '🎨 Create Mood Board' },
                { id: 'refine-concept', type: 'alternative', label: '✏️ Refine Concept' },
                { id: 'explore-alternatives', type: 'expand', label: '🔍 Explore Alternatives' }
            ];
            this.updateMessageThread();
        }, 1000);
    }

    createMoodBoard() {
        this.addMessage('Yes, create a mood board for The Mindful Movement concept', 'user');
        
        // Show thinking animation for 1 second, then generate response
        this.showTypingIndicator('creative');
        setTimeout(() => {
            this.hideTypingIndicator();
            
            const moodBoardContent = `
                Creating visual inspiration for 'The Mindful Movement'...
                
                ${this.renderMoodBoard()}
                
                This mood board captures the essence of mindful movement - balancing performance with peace of mind. The imagery reflects yoga practices, sustainable materials, and the seamless transition from studio to street that our Wellness Enthusiasts need.
            `;
            
            this.addMessage(
                moodBoardContent,
                'ai',
                'creative',
                'Creative Specialist'
            );
        }, 1000);
    }

    toggleImageSelection(imageIndex) {
        const moodBoardItem = document.querySelector(`[data-image-index="${imageIndex}"]`);
        if (!moodBoardItem) return;

        const isSelected = this.selectedMoodboardImages.includes(imageIndex);
        
        if (isSelected) {
            // Remove from selection
            this.selectedMoodboardImages = this.selectedMoodboardImages.filter(index => index !== imageIndex);
            moodBoardItem.classList.remove('selected');
        } else {
            // Add to selection
            this.selectedMoodboardImages.push(imageIndex);
            moodBoardItem.classList.add('selected');
        }

        // Update selection counter
        this.updateSelectionCounter();
        
        // Show/hide generate button
        this.updateGenerateButton();
    }

    updateSelectionCounter() {
        const counter = document.getElementById('selection-count');
        if (counter) {
            const totalImages = 8;
            counter.textContent = `${this.selectedMoodboardImages.length} of ${totalImages} selected`;
        }
    }

    updateGenerateButton() {
        const generateActions = document.getElementById('core-asset-actions');
        if (generateActions) {
            if (this.selectedMoodboardImages.length > 0) {
                generateActions.style.display = 'block';
            } else {
                generateActions.style.display = 'none';
            }
        }
    }

    generateCoreAsset() {
        // Update AI agent to design specialist
        this.updateAgentStatus('design', 'working');
        this.updateAgentStatus('creative', 'ready');
        
        // Add user message
        this.addMessage(`Generate core asset from ${this.selectedMoodboardImages.length} selected mood board images`, 'user');
        
        // Show thinking animation for 1 second
        this.showTypingIndicator('design');
        setTimeout(() => {
            this.hideTypingIndicator();
            
            // Show 5-second generation animation in chat
            const generationMessage = `
                <div class="generation-animation-inline">
                    <div class="loading-spinner-inline"></div>
                    <p>Generating your core asset using AI...</p>
                </div>
            `;
            
            this.addMessage(generationMessage, 'ai', 'design', 'Design Agent');
            
            // After 5 seconds, show the generated asset image in chat
            setTimeout(() => {
                this.displayGeneratedAssetInChat();
            }, 5000);
        }, 1000);
    }

    displayGeneratedAssetInChat() {
        // Select random asset image
        const randomIndex = Math.floor(Math.random() * this.coreAssetImages.length);
        this.currentAssetIndex = randomIndex;
        const selectedImage = this.coreAssetImages[this.currentAssetIndex];
        
        // Replace the animation message content with generated asset
        const lastMessage = this.messages[this.messages.length - 1];
        lastMessage.content = `
            Core asset generated successfully! Here's your AI-created athleisure image:
            
            <div class="generated-asset-display">
                <img src="${selectedImage}" alt="Generated athleisure core asset" class="core-asset-image">
                <div class="asset-info">
                    <span class="asset-type">Generated Image</span>
                    <span class="asset-dimensions">High-Quality Athleisure Asset</span>
                </div>
            </div>
        `;
        
        // Add generate new image action to the last message
        lastMessage.actions = [
            { id: 'generate-new-asset-image', type: 'alternative', label: '🔄 Generate New Image' },
            { id: 'approve-asset', type: 'approve', label: '✅ Approve Asset' },
            { id: 'refine-asset', type: 'expand', label: '✏️ Request Refinements' }
        ];
        this.updateMessageThread();
        
        // Update agent status
        this.updateAgentStatus('design', 'ready');
    }

    generateNewAssetImage() {
        this.addMessage('Generate a new variation of the core asset', 'user');
        
        // Show thinking animation
        this.showTypingIndicator('design');
        setTimeout(() => {
            this.hideTypingIndicator();
            
            // Add generation animation message
            const generationMessage = `
                <div class="generation-animation-inline">
                    <div class="loading-spinner-inline"></div>
                    <p>Generating new variation...</p>
                </div>
            `;
            
            this.addMessage(generationMessage, 'ai', 'design', 'Design Agent');
            
            // After animation, replace with new asset
            setTimeout(() => {
                // Cycle to next image
                this.currentAssetIndex = (this.currentAssetIndex + 1) % this.coreAssetImages.length;
                const selectedImage = this.coreAssetImages[this.currentAssetIndex];
                
                // Replace the animation message content with new asset
                const lastMessage = this.messages[this.messages.length - 1];
                lastMessage.content = `
                    Generated new variation! Here's an alternative core asset:
                    
                    <div class="generated-asset-display">
                        <img src="${selectedImage}" alt="Generated athleisure core asset variation" class="core-asset-image">
                        <div class="asset-info">
                            <span class="asset-type">Generated Variation</span>
                            <span class="asset-dimensions">High-Quality Athleisure Asset</span>
                        </div>
                    </div>
                `;
                
                // Add actions to the message
                lastMessage.actions = [
                    { id: 'generate-new-asset-image', type: 'alternative', label: '🔄 Generate New Image' },
                    { id: 'approve-asset', type: 'approve', label: '✅ Approve Asset' },
                    { id: 'refine-asset', type: 'expand', label: '✏️ Request Refinements' }
                ];
                this.updateMessageThread();
            }, 3000);
        }, 1000);
    }

    approveGeneratedAsset() {
        this.addMessage('I approve this core asset for the campaign', 'user');
        
        // Show thinking animation
        this.showTypingIndicator('design');
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(
                'Excellent! Your core asset has been approved and is ready for campaign deployment. The asset will be added to your campaign library and can be used across all marketing channels.',
                'ai',
                'design',
                'Design Agent'
            );
        }, 1000);
    }

    requestAssetRefinements() {
        this.addMessage('I\'d like to request refinements to this asset', 'user');
        
        // Show thinking animation
        this.showTypingIndicator('design');
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(
                'I understand you\'d like refinements. Please describe the specific changes you\'d like to see, such as color adjustments, composition changes, or different styling elements. I can generate new variations based on your feedback.',
                'ai',
                'design',
                'Design Agent'
            );
        }, 1000);
    }
    
    handleGenericAction(action) {
        const responses = {
            'continue': 'Please continue with your analysis',
            'modify': 'Let\'s modify this approach based on new insights',
            'explore-options': 'Show me additional options and alternatives'
        };
        
        const userMessage = responses[action] || `Execute action: ${action}`;
        this.addMessage(userMessage, 'user');
        
        // Show thinking animation for 1 second, then generate response
        this.showTypingIndicator('strategy');
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateAIResponse(userMessage);
        }, 1000);
    }


    handleMessageSend() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            
            // Show thinking animation for 1 second, then generate response
            this.showTypingIndicator('strategy');
            setTimeout(() => {
                this.hideTypingIndicator();
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

    handleCampaignSelection(campaignId) {
        console.log('🎯 Campaign selected:', campaignId);
        
        // Update selected campaign
        this.selectedCampaign = campaignId;
        
        // Add user message showing campaign selection
        this.addMessage(`I've selected the ${this.getCampaignName(campaignId)} campaign. Let's begin developing the creative brief.`, 'user');
        
        // Show thinking animation for 1 second, then generate response
        this.showTypingIndicator('strategy');
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateCampaignConfirmationResponse(campaignId);
        }, 1000);
    }

    getCampaignName(campaignId) {
        const campaignNames = {
            'fall-athleisure-2025': 'Fall 2025 Athleisure Collection',
            'professional-workwear-2025': 'Professional Workwear 2025',
            'weekend-casual-luxe-2025': 'Weekend Casual Luxe 2025',
            'date-night-elegance-2025': 'Date Night & Special Occasion 2025'
        };
        return campaignNames[campaignId] || 'Selected Campaign';
    }

    generateCampaignConfirmationResponse(campaignId) {
        const campaignResponses = {
            'fall-athleisure-2025': {
                agent: 'strategy',
                agentName: 'Strategy Specialist',
                content: 'Excellent choice! The Fall 2025 Athleisure Collection campaign targets women 25-40 with a dual goal of boosting online purchases and in-store visits. I\'ve identified 3 primary target segments: Hybrid Workers, Wellness Enthusiasts, and Young Professionals. Should we focus on one segment first or develop messaging for all three?',
                actions: [
                    { id: 'focus-hybrid', type: 'approve', label: '💼 Focus on Hybrid Workers' },
                    { id: 'focus-wellness', type: 'alternative', label: '🏃‍♀️ Focus on Wellness Enthusiasts' },
                    { id: 'develop-all', type: 'expand', label: '🎯 Develop messaging for all segments' }
                ]
            },
            'professional-workwear-2025': {
                agent: 'strategy', 
                agentName: 'Strategy Specialist',
                content: 'Perfect! The Professional Workwear 2025 campaign focuses on the return-to-office trend. I\'ll help you develop messaging for Corporate Professionals and Hybrid Workers who need versatile pieces for boardroom to after-work transitions. What\'s your priority: establishing authority or emphasizing versatility?',
                actions: [
                    { id: 'focus-authority', type: 'approve', label: '⚖️ Establish Authority' },
                    { id: 'focus-versatility', type: 'alternative', label: '🔄 Emphasize Versatility' },
                    { id: 'explore-both', type: 'expand', label: '📊 Explore Both Approaches' }
                ]
            }
        };

        const response = campaignResponses[campaignId] || {
            agent: 'strategy',
            agentName: 'Strategy Specialist', 
            content: `Great choice! I'm analyzing the ${this.getCampaignName(campaignId)} campaign requirements. Let me review the target audiences and objectives to develop the best strategic approach.`,
            actions: [
                { id: 'continue-analysis', type: 'approve', label: '✅ Continue Analysis' },
                { id: 'show-details', type: 'expand', label: '📋 Show Campaign Details' }
            ]
        };

        this.addMessage(response.content, 'ai', response.agent, response.agentName);
        
        // Add actions to the last message if provided
        if (response.actions) {
            const lastMessage = this.messages[this.messages.length - 1];
            lastMessage.actions = response.actions;
            this.updateMessageThread();
        }
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