// AI Creative Experience - AI-Native Conversational Creative Workflow
class AICreativeExperience {
    constructor(parentApp) {
        this.parentApp = parentApp;
        this.conversationState = 'initial';
        this.currentCampaign = null;
        this.generatedConcepts = [];
        this.userPreferences = {};
        this.conversationHistory = [];
        this.isProcessing = false;
        
        this.init();
    }
    
    init() {
        console.log('🤖 AI Creative Experience initialized');
        this.createInterface();
        this.attachEventListeners();
        this.startConversation();
    }
    
    createInterface() {
        const interfaceHTML = this.getTemplate();
        document.body.insertAdjacentHTML('beforeend', interfaceHTML);
        
        // Add entrance animation
        setTimeout(() => {
            const container = document.getElementById('ai-creative-experience');
            if (container) {
                container.classList.add('active');
            }
        }, 100);
    }
    
    getTemplate() {
        return `
            <div class="ai-creative-experience" id="ai-creative-experience">
                <!-- AI Experience Header -->
                <header class="ai-experience-header">
                    <div class="ai-branding">
                        <i class="fas fa-robot" style="color: var(--accent-purple, #9256d9)"></i>
                        <h1>AI Creative Partner</h1>
                        <span class="beta-badge">BETA</span>
                    </div>
                    <button class="close-experience-btn" id="close-ai-experience">
                        <i class="fas fa-times"></i>
                    </button>
                </header>
                
                <!-- Main Conversation Interface -->
                <div class="conversation-container">
                    <div class="conversation-thread" id="conversation-thread">
                        <!-- Messages will be populated here -->
                    </div>
                    
                    <!-- AI Input Interface -->
                    <div class="ai-input-container">
                        <div class="input-wrapper">
                            <textarea 
                                class="ai-chat-input" 
                                id="ai-chat-input"
                                placeholder="Describe your campaign idea or ask me anything..."
                                rows="3"
                            ></textarea>
                            <div class="input-actions">
                                <button class="voice-input-btn" id="voice-input-btn" title="Voice Input">
                                    <i class="fas fa-microphone"></i>
                                </button>
                                <button class="send-message-btn" id="send-ai-message" title="Send Message">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- AI Status Indicator -->
                        <div class="ai-status" id="ai-status">
                            <div class="status-indicator ready">
                                <div class="pulse-ring"></div>
                                <i class="fas fa-brain"></i>
                            </div>
                            <span class="status-text">AI Ready</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        // Close button
        document.getElementById('close-ai-experience').addEventListener('click', () => {
            this.closeExperience();
        });
        
        // Send message button
        document.getElementById('send-ai-message').addEventListener('click', () => {
            this.handleMessageSend();
        });
        
        // Enter key to send message
        document.getElementById('ai-chat-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleMessageSend();
            }
        });
        
        // Voice input button (placeholder)
        document.getElementById('voice-input-btn').addEventListener('click', () => {
            this.handleVoiceInput();
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeExperience();
            }
        });
    }
    
    startConversation() {
        // Initial AI greeting
        setTimeout(() => {
            this.addAIMessage(
                "👋 Hello! I'm your AI Creative Partner. I can help you develop campaign strategies, generate creative concepts, and create marketing assets through natural conversation.\n\nWhat kind of marketing challenge are you working on today?",
                'greeting'
            );
        }, 1000);
    }
    
    handleMessageSend() {
        const input = document.getElementById('ai-chat-input');
        const message = input.value.trim();
        
        if (message && !this.isProcessing) {
            this.addUserMessage(message);
            input.value = '';
            this.processUserMessage(message);
        }
    }
    
    addUserMessage(message) {
        const messageElement = this.createMessageElement(message, 'user');
        this.appendMessage(messageElement);
        this.conversationHistory.push({
            sender: 'user',
            content: message,
            timestamp: Date.now()
        });
    }
    
    addAIMessage(message, type = 'response', concepts = null) {
        this.setAIStatus('thinking');
        
        // Simulate AI thinking time
        setTimeout(() => {
            const messageElement = this.createAIMessageElement(message, type, concepts);
            this.appendMessage(messageElement);
            this.conversationHistory.push({
                sender: 'ai',
                content: message,
                type: type,
                concepts: concepts,
                timestamp: Date.now()
            });
            this.setAIStatus('ready');
        }, 1500 + Math.random() * 1000);
    }
    
    createMessageElement(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${this.formatMessage(content)}</p>
                    <div class="message-timestamp">${this.getTimestamp()}</div>
                </div>
            `;
        }
        
        return messageDiv;
    }
    
    createAIMessageElement(content, type, concepts) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        
        let conceptsHTML = '';
        if (concepts && concepts.length > 0) {
            conceptsHTML = this.generateConceptCards(concepts);
        }
        
        messageDiv.innerHTML = `
            <div class="ai-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="ai-response">
                    ${this.formatAIMessage(content)}
                </div>
                ${conceptsHTML}
                <div class="message-timestamp">${this.getTimestamp()}</div>
            </div>
        `;
        
        return messageDiv;
    }
    
    generateConceptCards(concepts) {
        return `
            <div class="concept-cards">
                ${concepts.map(concept => `
                    <div class="concept-card" data-concept-id="${concept.id}">
                        <div class="concept-header">
                            <h4>${concept.title}</h4>
                            <div class="confidence-badge ${concept.confidence > 80 ? 'high' : concept.confidence > 60 ? 'medium' : 'low'}">
                                ${concept.confidence}% Match
                            </div>
                        </div>
                        <p class="concept-description">${concept.description}</p>
                        <div class="concept-actions">
                            <button class="btn-concept-develop" data-concept-id="${concept.id}">
                                <i class="fas fa-expand-arrows-alt"></i>
                                Develop Concept
                            </button>
                            <button class="btn-concept-refine" data-concept-id="${concept.id}">
                                <i class="fas fa-magic"></i>
                                Refine
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    processUserMessage(message) {
        this.isProcessing = true;
        
        // Simple AI response logic based on message content
        const response = this.generateAIResponse(message);
        this.addAIMessage(response.message, response.type, response.concepts);
        
        this.isProcessing = false;
    }
    
    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Campaign development flow
        if (message.includes('campaign') || message.includes('marketing') || this.conversationState === 'initial') {
            this.conversationState = 'campaign_discovery';
            return {
                message: `Excellent! I can help you create a powerful marketing campaign. Let me understand your specific goals...\n\n🎯 **Campaign Objectives** (I'll help you define these):\n• Brand awareness for a new product?\n• Direct sales conversion?\n• Market positioning against competitors?\n\n🔍 **Target Audience** (Tell me about your ideal customers):\n• Demographics (age, location, income)?\n• Psychographics (values, lifestyle, interests)?\n• Current customer insights?\n\n💡 **Creative Direction** (What feeling should this campaign evoke):\n• Aspirational and premium?\n• Authentic and relatable?\n• Bold and disruptive?\n\nYou can answer these in any order, or ask me to start with what interests you most!`,
                type: 'campaign_discovery'
            };
        }
        
        // Audience targeting
        if (message.includes('target') || message.includes('audience') || message.includes('customer')) {
            this.conversationState = 'audience_analysis';
            return {
                message: `Perfect! I'm analyzing this segment now...\n\n✅ **Audience Analysis Complete**\n\nBased on your description, I'm seeing strong potential for:\n\n📊 **Key Insights**:\n• High engagement potential in digital channels\n• Strong values-driven purchasing behavior\n• Peak activity during specific time windows\n\n🎨 **Creative Direction Recommendations**:\nI can generate specific concepts once you tell me more about your product or service. What are you promoting?`,
                type: 'audience_analysis'
            };
        }
        
        // Concept generation
        if (message.includes('idea') || message.includes('concept') || message.includes('creative')) {
            this.conversationState = 'concept_generation';
            const concepts = this.generateSampleConcepts(message);
            return {
                message: `Brilliant! I'm generating creative concepts based on your brief...\n\n🎨 **Creative Concepts Generated**\n\nI've created several concept directions for you to explore. Each concept includes messaging strategy, visual direction, and performance predictions.\n\nSelect a concept below to develop it further, or ask me to generate different directions!`,
                type: 'concept_generation',
                concepts: concepts
            };
        }
        
        // Asset creation
        if (message.includes('asset') || message.includes('email') || message.includes('image') || message.includes('social')) {
            this.conversationState = 'asset_creation';
            return {
                message: `Great! I can help you create specific marketing assets. Let me generate what you need...\n\n📧 **Email Campaign**: Subject lines, body content, and templates\n🖼️ **Visual Assets**: Hero images, social media graphics, banner ads\n📱 **Social Content**: Posts, stories, and engagement strategies\n📝 **Copy Assets**: Headlines, taglines, and product descriptions\n\nWhich type of asset would you like me to create first?`,
                type: 'asset_creation'
            };
        }
        
        // Default helpful response
        return {
            message: `I understand you're interested in "${message}". I can help you with:\n\n• **Campaign Strategy**: Define objectives and target audiences\n• **Creative Concepts**: Generate ideas and messaging directions\n• **Asset Creation**: Develop emails, images, and social content\n• **Performance Optimization**: Predict and improve campaign results\n\nWhat would you like to work on together?`,
            type: 'general_help'
        };
    }
    
    generateSampleConcepts(userMessage) {
        // Generate 3 sample concepts based on user input
        const concepts = [
            {
                id: 'concept-1',
                title: 'Performance with Purpose',
                description: 'Emphasize both function and values - perfect for eco-conscious consumers who want premium quality.',
                confidence: 87
            },
            {
                id: 'concept-2',
                title: 'Authentic Lifestyle',
                description: 'Real people, real stories - connect through genuine experiences and relatable moments.',
                confidence: 92
            },
            {
                id: 'concept-3',
                title: 'Innovation Leadership',
                description: 'Position as the cutting-edge solution that others will follow - bold and forward-thinking.',
                confidence: 74
            }
        ];
        
        return concepts;
    }
    
    formatMessage(content) {
        return content.replace(/\\n/g, '<br>');
    }
    
    formatAIMessage(content) {
        // Format AI messages with better styling
        return content
            .replace(/\\n\\n/g, '</p><p>')
            .replace(/\\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/•/g, '<span class="bullet">•</span>')
            .replace(/🎯|🔍|💡|📊|🎨|📧|🖼️|📱|📝|✅/g, '<span class="emoji">$&</span>');
    }
    
    appendMessage(messageElement) {
        const thread = document.getElementById('conversation-thread');
        thread.appendChild(messageElement);
        thread.scrollTop = thread.scrollHeight;
        
        // Add animation
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            messageElement.style.transition = 'all 0.3s ease';
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 100);
    }
    
    setAIStatus(status) {
        const statusElement = document.getElementById('ai-status');
        const statusText = statusElement.querySelector('.status-text');
        const statusIndicator = statusElement.querySelector('.status-indicator');
        
        statusIndicator.className = `status-indicator ${status}`;
        
        switch (status) {
            case 'thinking':
                statusText.textContent = 'AI Thinking...';
                break;
            case 'generating':
                statusText.textContent = 'Generating Ideas...';
                break;
            case 'ready':
                statusText.textContent = 'AI Ready';
                break;
            default:
                statusText.textContent = 'AI Ready';
        }
    }
    
    getTimestamp() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    handleVoiceInput() {
        // Voice input placeholder - would integrate with Web Speech API
        this.addAIMessage("Voice input is coming soon! For now, please type your message.", 'info');
    }
    
    closeExperience() {
        const container = document.getElementById('ai-creative-experience');
        if (container) {
            container.classList.add('closing');
            setTimeout(() => {
                container.remove();
            }, 300);
        }
    }
    
    // Export conversation or generated assets
    exportConversation() {
        return {
            sessionId: Date.now(),
            conversationHistory: this.conversationHistory,
            generatedConcepts: this.generatedConcepts,
            campaignContext: this.currentCampaign
        };
    }
}

// Initialize when needed
window.AICreativeExperience = AICreativeExperience;