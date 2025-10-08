class CreativeStudioProjects {
    constructor(app, projectConfig = null) {
        this.app = app;
        this.projectConfig = projectConfig || {
            title: '🧪 TEST EXPERIENCE',
            subtitle: 'Experimental Creative Suite Features',
            campaign: 'Prototype Campaign',
            isPrototype: true
        };
        
        console.log('🏗️ CreativeStudioProjects constructor - projectConfig:', this.projectConfig);
        this.currentTab = 'brief';
        this.currentIdeaIndex = 0;
        this.chatMessages = [];
        this.isTyping = false;
        
        // Pre-defined creative ideas array
        this.allIdeas = [
            {
                title: 'The Cozy Commute',
                audience: 'Hybrid Worker',
                description: 'Showcase the comfort and productivity of modern commuting with sustainable, stylish workwear perfect for the train or coffee shop.',
                status: ['ai-generated', 'approved'],
                emoji: '🚊'
            },
            {
                title: 'Weekend Wanderlust',
                audience: 'Urban Explorer',
                description: 'Capture the spirit of spontaneous city adventures with versatile pieces that transition from brunch to art gallery seamlessly.',
                status: ['ai-generated'],
                emoji: '🌆'
            },
            {
                title: 'Eco-Conscious Living',
                audience: 'Sustainability Advocate',
                description: 'Highlight the environmental impact of choosing sustainable fashion with powerful before-and-after storytelling.',
                status: ['ai-generated'],
                emoji: '🌱'
            },
            {
                title: 'Digital Nomad Essentials',
                audience: 'Remote Professional',
                description: 'Feature minimalist, packable fashion that works across time zones and cultures for the modern remote worker.',
                status: ['ai-generated'],
                emoji: '💼'
            }
        ];

        // Campaign data structure
        this.campaignData = {
            title: "Fall Athleisure Collection",
            objective: "Drive awareness and sales of the new Fall 2025 premium athleisure collection, targeting women 25-40, with the dual goal of boosting online purchases and increasing in-store visits for try-on experiences.",
            launchDate: "October 27, 2025 (T-60 days)",
            personas: [
                {
                    name: "Hybrid Worker",
                    attributes: [
                        "Gender: Female, Male",
                        "Age: 30-40 year old",
                        "Interests: Work-life balance, Productivity hacks, coffee culture, fitness, sustainability, sustainable fashion, comfort-clothing.."
                    ]
                },
                {
                    name: "The Performance Athlete",
                    attributes: [
                        "Gender: Female, Male", 
                        "Age: 20-40 year old",
                        "Interests: Work-life balance, fitness, sustainability, sustainable fashion, health hack, workouts, comfort-clothing.."
                    ]
                },
                {
                    name: "The Fashion Influencer",
                    attributes: [
                        "Gender: Female",
                        "Age: 30-40 year old", 
                        "Interests: Nature, Sustainability, Sustainable Fashion, Coffee-culture, comfort-clothing.."
                    ]
                },
                {
                    name: "The Wellness Seeker",
                    attributes: [
                        "Gender: Female",
                        "Age: 30-40 year old",
                        "Interests: Work-life balance, vacation, vacation-vibes, leisure, sustainability, sustainable fashion, comfort-clothing."
                    ]
                }
            ],
            channels: [
                {
                    name: "Instagram",
                    contentFocus: "Aesthetic Lifestyle & Quick Engagement. Focus on inspiring users and interrupting the scroll with dynamic, high-quality content.",
                    assetType: "Static Image",
                    ratio: "1:1 or 4:5",
                    deliverables: "Feed Posts, Carousel Ads, Explore Page Ads."
                },
                {
                    name: "Instagram",
                    contentFocus: "Entertainment & Dynamic Storytelling. Users expect fast-paced, music-driven, relatable video content.",
                    assetType: "Vertical Video",
                    ratio: "9:16",
                    deliverables: "Reels, Stories, Video Ads."
                },
                {
                    name: "Pinterest",
                    contentFocus: "Aspirational & Utility-Focused. Focus on content that users will save, plan around, and use for styling inspiration.",
                    assetType: "Standard Pin",
                    ratio: "2:3",
                    deliverables: "Standard Product Pins, Promoted Pins."
                },
                {
                    name: "Pinterest",
                    contentFocus: "Discovery & Deep Engagement. Multi-page content designed to guide users through a narrative or styling guide.",
                    assetType: "Idea Pin",
                    ratio: "9:16 (Full Screen)",
                    deliverables: "Styling Guides, Seasonal Lookbooks, Outfit Ideas."
                }
            ]
        };

        // Initialize campaign-specific data after campaignData is defined
        this.initializeCampaignData();

        // Chat suggestions
        this.suggestions = [
            "Suggest target audiences",
            "Generate campaign ideas", 
            "Find similar assets",
            "Improve this brief"
        ];
    }

    // Campaign Data Initialization
    initializeCampaignData() {
        console.log('🎯 Initializing campaign data for:', this.projectConfig.campaign);
        if (this.projectConfig.campaign === 'Fall Athleisure Collection') {
            console.log('✅ Initializing Fall Athleisure data');
            this.initializeFallAthleisureData();
        } else {
            console.log('✅ Initializing Test data');
            this.initializeTestData();
        }
    }

    initializeFallAthleisureData() {
        // Update creative ideas for Fall Athleisure Collection
        this.allIdeas = [
            {
                title: 'Work-to-Workout Transition',
                audience: 'Hybrid Worker',
                description: 'Showcase seamless transition from virtual meeting to home workout with versatile athleisure pieces that perform in both environments.',
                status: ['ai-generated', 'approved'],
                emoji: '💼'
            },
            {
                title: 'Sustainable Style Story',
                audience: 'Wellness Enthusiast',
                description: 'Highlight the eco-friendly materials and ethical production behind the collection while showcasing premium quality and style.',
                status: ['ai-generated'],
                emoji: '🌱'
            },
            {
                title: 'Urban Comfort Collection',
                audience: 'Young Professional',
                description: 'Capture the energy of city life with athleisure that works for coffee shop meetings, walking commutes, and weekend adventures.',
                status: ['ai-generated'],
                emoji: '🏙️'
            },
            {
                title: 'Seasonal Color Story',
                audience: 'Wellness Enthusiast',
                description: 'Feature the rich autumn palette of the collection against natural fall backdrops, emphasizing seasonal transition and style evolution.',
                status: ['ai-generated'],
                emoji: '🍂'
            },
            {
                title: 'Movement & Mindfulness',
                audience: 'Hybrid Worker',
                description: 'Combine wellness practices with fashion moments, showing how the collection supports both physical activity and mental well-being.',
                status: ['ai-generated'],
                emoji: '🧘'
            }
        ];

        // Update campaign data for Fall Athleisure Collection
        this.campaignData.title = "Fall Athleisure Collection";
        this.campaignData.objective = this.projectConfig.objective;
        this.campaignData.launchDate = this.projectConfig.launchDate + " (T-60 days)";
        this.campaignData.targetAudience = "Women 25-40, hybrid workers, wellness-focused professionals";
        this.campaignData.budget = "$125,000 total campaign budget";
        
        // Enhanced personas for Fall Athleisure
        this.campaignData.personas = [
            {
                name: "Hybrid Worker",
                attributes: [
                    "Gender: Female, Male",
                    "Age: 25-40",
                    "Income: $45k-$85k",
                    "Location: Urban/Suburban",
                    "Lifestyle: Work from home 2-3 days/week, values comfort and versatility"
                ]
            },
            {
                name: "Wellness Enthusiast",
                attributes: [
                    "Gender: Female",
                    "Age: 28-42",
                    "Income: $55k-$95k",
                    "Location: Urban areas",
                    "Lifestyle: Regular fitness routine, sustainability-conscious, premium quality focus"
                ]
            },
            {
                name: "Young Professional",
                attributes: [
                    "Gender: Female, Male",
                    "Age: 22-35",
                    "Income: $40k-$75k",
                    "Location: Metropolitan areas",
                    "Lifestyle: Career-focused, social media active, value-conscious but willing to invest in versatile pieces"
                ]
            }
        ];

        // Initialize Fall Athleisure brainstorm data
        this.initializeFallAthleisureBrainstormData();
    }

    initializeTestData() {
        // Keep existing test data structure - no changes needed for TEST EXPERIENCE
    }

    initializeFallAthleisureBrainstormData() {
        this.brainstormData = {
            sceneDescriptions: {
                'Work-to-Workout Transition': 'A bright, modern home office transitioning to a workout space. Natural morning light fills the room as someone effortlessly moves from their laptop to exercise equipment, showcasing how athleisure enables this seamless lifestyle shift. The atmosphere is energetic yet professional, emphasizing versatility and comfort.',
                'Sustainable Style Story': 'An eco-conscious lifestyle scene in a sustainable urban environment. Someone thoughtfully selects pieces from an organized, minimal wardrobe filled with quality athleisure. The setting emphasizes natural materials, earth tones, and conscious consumption while maintaining a premium, aspirational aesthetic.',
                'Urban Comfort Collection': 'Dynamic urban scenes capturing city energy - walking through bustling streets, working from a trendy coffee shop, meeting friends in a park. The athleisure seamlessly fits every environment, showing comfort without compromising style in fast-paced city life.',
                'Seasonal Color Story': 'Autumn outdoor scenes with rich, warm natural lighting. Models wear the collection\'s fall palette against golden leaves, warm brick buildings, and cozy urban spaces. The setting emphasizes seasonal transition and the collection\'s perfect harmony with autumn aesthetics.',
                'Movement & Mindfulness': 'Serene morning scenes combining fitness and mindfulness. Yoga in a sunlit space, meditative walks, stretch sessions by windows. The athleisure supports both physical movement and mental wellness, creating aspirational lifestyle moments.',
                // Keep existing scene descriptions for backwards compatibility
                'The Cozy Commute': 'A warm, intimate morning scene inside a modern commuter train. Soft natural light streams through large windows, creating a golden-hour glow. A young professional sits comfortably in a window seat, wrapped in a cozy oversized cardigan, holding a reusable coffee cup. They\'re looking out at the passing autumn landscape with a content smile. The atmosphere is peaceful and aspirational, emphasizing comfort and mindful commuting.',
                'Weekend Wanderlust': 'An energetic urban exploration scene in a vibrant city neighborhood. Natural afternoon light illuminates colorful street art and bustling cafes. A stylish adventurer walks confidently through the scene wearing versatile athleisure pieces that transition seamlessly from coffee shop to art gallery. The mood is spontaneous and dynamic, capturing the spirit of urban discovery.',
                'Eco-Conscious Living': 'A sustainable lifestyle scene set in a modern, eco-friendly home or outdoor garden space. Warm natural lighting showcases someone choosing sustainable fashion options from a curated wardrobe. The setting emphasizes environmental consciousness with visible eco-friendly elements like plants, natural materials, and sustainable packaging. The atmosphere is mindful and purposeful.',
                'Digital Nomad Essentials': 'A minimalist workspace scene in an inspiring location - perhaps a co-working space with mountain views or a cafe overlooking the ocean. Someone works comfortably in packable, versatile clothing that looks professional yet travel-ready. The setting emphasizes freedom, flexibility, and the modern remote work lifestyle.'
            },
            
            assetRecommendations: {
                'Work-to-Workout Transition': {
                    title: 'Professional Home Workout - Lifestyle Series',
                    source: 'Brand Asset Library Pro',
                    filename: 'IMG_WorkoutTransition_Athleisure_Fall2025_v1.jpg',
                    confidence: '94% Match',
                    metrics: { performance: '+28%', compliance: '97%', ctr: '3.9%' },
                    emoji: '💼',
                    reasoning: 'This asset perfectly captures the work-from-home to workout transition that defines our hybrid worker persona. The professional yet comfortable styling aligns with our versatility messaging, and the lighting emphasizes the premium quality of our athleisure pieces. Similar lifestyle transformation content has shown strong engagement with our target demographic.'
                },
                'Sustainable Style Story': {
                    title: 'Eco-Conscious Fashion Choice - Brand Values',
                    source: 'Sustainability Assets Hub',
                    filename: 'IMG_EcoAthleisure_Sustainable_Fall2025_v2.jpg',
                    confidence: '96% Match',
                    metrics: { performance: '+32%', compliance: '99%', ctr: '4.1%' },
                    emoji: '🌱',
                    reasoning: 'This asset strengthens our sustainability narrative while showcasing premium product quality. The natural styling and earth-tone palette match our fall collection perfectly, and the conscious consumption angle resonates strongly with wellness-focused consumers. Performance data shows sustainability messaging drives 30%+ higher engagement.'
                },
                // Keep existing asset recommendations for backwards compatibility
                'The Cozy Commute': {
                    title: 'Sustainable Summer Lifestyle - Beach Scene',
                    source: 'Acme-Corp Global DAM',
                    filename: 'IMG_SummerBeach_Sustainable_2024_v3.jpg',
                    confidence: '96% Match',
                    metrics: { performance: '+34%', compliance: '98%', ctr: '4.2%' },
                    emoji: '🌿',
                    reasoning: 'This asset aligns perfectly with your campaign\'s sustainability messaging and Gen Z aesthetic. It features diverse models in eco-friendly beachwear with natural lighting and authentic expressions. The color palette matches your brand guidelines (earth tones with vibrant accents), and similar images performed 34% above benchmark with your target demographic.'
                }
            },
            
            adCopyTemplates: {
                'Work-to-Workout Transition': {
                    title: 'From Desk to Mat, Seamlessly',
                    hook: 'Athleisure that works as hard as you do. Professional comfort, workout performance.',
                    cta: 'Shop the Collection →'
                },
                'Sustainable Style Story': {
                    title: 'Style with Purpose',
                    hook: 'Premium athleisure, responsibly made. Feel good about what you wear and how it\'s made.',
                    cta: 'Discover Sustainability →'
                },
                // Keep existing ad copy templates for backwards compatibility
                'The Cozy Commute': {
                    title: 'Your Commute, Reimagined',
                    hook: 'Turn travel time into your time. Comfort meets productivity.',
                    cta: 'Discover More →'
                }
            }
        };
    }

    showInterface() {
        console.log('🎨 Showing Creative Studio Projects Interface');
        
        // Create and display the two-panel interface
        const modal = document.createElement('div');
        modal.className = 'creative-studio-modal';
        modal.innerHTML = this.createInterfaceHTML();
        
        // Style the modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        document.body.appendChild(modal);
        
        // Initialize event listeners
        this.initializeEventListeners(modal);
        
        // Add welcome message
        this.addWelcomeMessage();
    }

    createInterfaceHTML() {
        return `
            <section class="campaign-detail-view">
                <!-- Left Panel: AI Chat Assistant -->
                <div class="ai-chat-panel">
                    <div class="chat-header">
                        <h3>✨ AI Assistant</h3>
                        <p>Ask me anything about your campaign</p>
                    </div>

                    <div class="chat-messages" id="chatMessages">
                        <!-- Messages will be added here -->
                    </div>

                    <div class="chat-suggestions">
                        <div class="suggestion-chips">
                            ${this.suggestions.map(suggestion => 
                                `<div class="suggestion-chip" onclick="window.creativeStudio.sendSuggestion('${suggestion}')">${suggestion}</div>`
                            ).join('')}
                        </div>
                    </div>

                    <div class="chat-input-area">
                        <div class="chat-input-wrapper">
                            <textarea
                                class="chat-input"
                                id="chatInput"
                                placeholder="Ask me anything..."
                                rows="1"
                                onkeydown="window.creativeStudio.handleChatKeydown(event)"
                            ></textarea>
                            <button class="chat-send-btn" onclick="window.creativeStudio.sendChatMessage()">
                                ➤
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Right Panel: Campaign Detail Content -->
                <div class="campaign-detail-content">
                    <!-- Header with Back Button and Title -->
                    <div class="campaign-page-header">
                        <div class="header-left">
                            <button class="back-btn" onclick="window.creativeStudio.closeInterface()">←</button>
                            <div class="header-content">
                                <h1>${this.projectConfig.title}</h1>
                                <p class="header-subtitle">${this.projectConfig.subtitle}</p>
                                ${this.projectConfig.launchDate ? 
                                    `<div class="launch-info">Launch: ${this.projectConfig.launchDate}</div>` : ''
                                }
                            </div>
                        </div>
                        <div class="header-right">
                            ${this.projectConfig.isPrototype ? 
                                '<span class="prototype-badge">PROTOTYPE</span>' : 
                                '<span class="campaign-badge">ACTIVE CAMPAIGN</span>'
                            }
                        </div>
                    </div>

                    <!-- Tab Navigation -->
                    <div class="tab-navigation">
                        <div class="tab-item active" id="briefTab" onclick="window.creativeStudio.switchTab('brief')">Creative Brief</div>
                        <div class="tab-item" id="ideationTab" onclick="window.creativeStudio.switchTab('ideation')">Ideation Board</div>
                        <div class="tab-item" id="assetsTab" onclick="window.creativeStudio.switchTab('assets')">Core Assets</div>
                        <div class="tab-item" id="remixTab" onclick="window.creativeStudio.switchTab('remix')">Remix</div>
                    </div>

                    <!-- Tab Content -->
                    <div class="campaign-content">
                        ${this.createTabContent()}
                    </div>
                </div>
            </section>
        `;
    }

    createTabContent() {
        return `
            <!-- Creative Brief Tab Content -->
            <div class="tab-content" id="briefContent">
                ${this.createBriefTabContent()}
            </div>

            <!-- Ideation Board Tab Content -->
            <div class="tab-content" id="ideationContent" style="display: none;">
                ${this.createIdeationTabContent()}
            </div>

            <!-- Core Assets Tab Content -->
            <div class="tab-content" id="assetsContent" style="display: none;">
                <div style="text-align: center; padding: 60px 24px; color: #8e8e93;">
                    <p>Core Assets view coming soon...</p>
                </div>
            </div>

            <!-- Remix Tab Content -->
            <div class="tab-content" id="remixContent" style="display: none;">
                <div style="text-align: center; padding: 60px 24px; color: #8e8e93;">
                    <p>Remix view coming soon...</p>
                </div>
            </div>
        `;
    }

    createBriefTabContent() {
        return `
            <!-- Objective Section -->
            <div class="objective-section">
                <div class="objective-header">
                    <h2>Objective</h2>
                    <button class="refine-ai-btn" onclick="window.creativeStudio.refineObjective()">✨ Refine with AI</button>
                </div>
                <p class="objective-text">${this.campaignData.objective}</p>
                <p class="launch-date">Launch Date: ${this.campaignData.launchDate}</p>
                <div class="reasoning-toggle">💡 Reasoning ›</div>
            </div>

            <!-- Target Audience Section -->
            <div class="target-audience-section">
                <h2>Target Audience</h2>

                <div class="audience-filters">
                    <span class="audience-filter-tag">Sophisticated</span>
                    <span class="audience-filter-tag">Modern</span>
                    <span class="audience-filter-tag">Aspirational</span>
                    <span class="audience-filter-tag">Lifestyle-Driven Imagery</span>
                </div>

                <div class="persona-cards">
                    ${this.campaignData.personas.map(persona => `
                        <div class="persona-card">
                            <div class="persona-card-header">
                                <div class="persona-name">${persona.name}</div>
                                <div class="persona-menu">⋯</div>
                            </div>
                            <div class="persona-attributes">
                                <strong>Attributes:</strong>
                                <ul style="margin: 8px 0 0 20px;">
                                    ${persona.attributes.map(attr => `<li>${attr}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="reasoning-toggle" style="margin-top: 24px;">
                    💡 Reasoning ›
                    <div style="margin-left: auto; display: flex; gap: 12px;">
                        <span class="conversion-metric">+31% Conversion</span>
                        <span class="confidence-metric">Medium Confidence</span>
                    </div>
                </div>
            </div>

            <!-- Asset Requirements Section -->
            <div class="asset-section">
                <h2>Asset Requirements</h2>
                <table class="channel-table">
                    <thead>
                        <tr>
                            <th>Channel Name</th>
                            <th>Content Focus</th>
                            <th>Asset Type</th>
                            <th>General Size/Ratio</th>
                            <th>Key Deliverable Type(s)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.campaignData.channels.map(channel => `
                            <tr>
                                <td><span class="channel-name">${channel.name}</span></td>
                                <td>${channel.contentFocus}</td>
                                <td>${channel.assetType}</td>
                                <td>${channel.ratio}</td>
                                <td>${channel.deliverables}</td>
                                <td><button class="ideate-btn" onclick="window.creativeStudio.ideateFromAsset('${channel.name}', '${channel.assetType}', '${channel.contentFocus}', '${channel.ratio}', '${channel.deliverables}')">✨ Ideate</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- AI Recommended Mood Board Section -->
            <div class="moodboard-section">
                <h2>AI Recommended Mood Board</h2>
                <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">AI-curated visual inspiration based on your campaign brief</p>

                <button class="generate-moodboard-btn" onclick="window.creativeStudio.generateMoodBoard()">✨ Generate Mood Board</button>

                <div class="moodboard-grid" id="moodboardGrid">
                    <!-- Mood board images will be generated here -->
                </div>
            </div>

            <!-- DAM Assets Section -->
            <div class="dam-assets-section" id="damAssetsSection" style="display: none;">
                <h2>DAM Assets</h2>
                <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">Assets found from your Digital Asset Management system</p>

                <div id="damAssetsContainer">
                    <!-- DAM cards will be inserted here by JavaScript -->
                </div>
            </div>
        `;
    }

    createIdeationTabContent() {
        return `
            <div style="margin-bottom: 32px;">
                <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">Creative Ideation</h2>
                <p style="color: #6e6e73; font-size: 14px;">AI-powered campaign ideas based on your brief</p>
            </div>

            <button class="create-ideas-btn" onclick="window.creativeStudio.generateIdeas()">✨ Create Ideas</button>

            <div class="ideas-grid" id="ideasGrid">
                <!-- Ideas will be generated here -->
            </div>
        `;
    }

    initializeEventListeners(modal) {
        // Store reference for global access
        window.creativeStudio = this;
        
        // Initialize brainstorm data
        this.initializeBrainstormData();
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeInterface();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeInterface();
            }
        });
    }

    addWelcomeMessage() {
        const welcomeMessage = `Hi! I'm your AI creative assistant. I can help you with:
• Refining your campaign objectives
• Generating creative ideas
• Finding relevant assets
• Writing ad copy

How can I help you today?`;

        this.addChatMessage(welcomeMessage, 'ai');
    }

    switchTab(tabName) {
        console.log('🔄 Switching to tab:', tabName);
        
        // Hide all content tabs
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });

        // Remove active class from all tabs
        document.querySelectorAll('.tab-item').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected content and activate tab
        const contentId = tabName + 'Content';
        const tabId = tabName + 'Tab';
        
        const content = document.getElementById(contentId);
        const tab = document.getElementById(tabId);
        
        if (content) content.style.display = 'block';
        if (tab) tab.classList.add('active');
        
        this.currentTab = tabName;
    }

    generateIdeas() {
        console.log('💡 Generating ideas...');
        console.log('💡 CreativeStudio instance available:', window.creativeStudio ? 'YES' : 'NO');
        
        const grid = document.getElementById('ideasGrid');
        const btn = document.querySelector('.create-ideas-btn');
        
        if (this.currentIdeaIndex >= this.allIdeas.length) {
            // Reset to cycle through ideas
            this.currentIdeaIndex = 0;
        }

        const idea = this.allIdeas[this.currentIdeaIndex];
        const ideaTile = document.createElement('div');
        ideaTile.className = 'idea-tile';
        ideaTile.style.opacity = '0';
        ideaTile.style.transform = 'translateY(20px)';

        ideaTile.innerHTML = `
            <div class="idea-tile-image">${idea.emoji}</div>
            <div class="idea-tile-content">
                <div class="idea-tile-title">${idea.title}</div>
                <div class="idea-status-tags">
                    ${idea.status.includes('ai-generated') ? '<span class="idea-status-tag ai-generated">AI Generated</span>' : ''}
                    ${idea.status.includes('approved') ? '<span class="idea-status-tag approved">Approved</span>' : ''}
                </div>
                <div class="idea-audience">👥 ${idea.audience}</div>
                <div class="idea-description">${idea.description}</div>
                <button class="brainstorm-btn" 
                    data-idea-title="${idea.title}"
                    data-idea-audience="${idea.audience}"
                    data-idea-description="${idea.description}"
                    data-idea-emoji="${idea.emoji}"
                    data-idea-status="${idea.status.join(',')}"
                    onclick="window.creativeStudio.handleBrainstormClick(this)">
                    💡 Brainstorm
                </button>
            </div>
        `;

        grid.appendChild(ideaTile);

        // Animate in
        setTimeout(() => {
            ideaTile.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            ideaTile.style.opacity = '1';
            ideaTile.style.transform = 'translateY(0)';
        }, 100);

        this.currentIdeaIndex++;
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addChatMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateAIResponse(message);
            this.addChatMessage(response, 'ai');
        }, 1500);
    }

    sendSuggestion(text) {
        const input = document.getElementById('chatInput');
        input.value = text;
        this.sendChatMessage();
    }

    addChatMessage(text, type) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-bubble">${text}</div>
            <span class="message-time">${timeString}</span>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Store message
        this.chatMessages.push({ text, type, timestamp: now });
    }

    generateAIResponse(userMessage) {
        const responses = [
            "I've analyzed your campaign brief. Based on your Fall Athleisure Collection targeting women 25-40, I suggest focusing on lifestyle imagery that shows the versatility of the collection - from yoga studios to coffee shops to outdoor activities.",
            "Great question! For the target audience of hybrid workers and wellness seekers, I recommend emphasizing comfort, sustainability, and style. Would you like me to generate some specific creative concepts?",
            "I can help with that! Let me pull some high-performing assets from your DAM that align with athleisure and fall themes. Give me a moment...",
            "Based on similar campaigns in your industry, I'd recommend a multi-channel approach focusing on Instagram and Pinterest for visual appeal. The Fall season is perfect for warm, aspirational imagery.",
            "I've found 127 relevant assets in your DAM that match this campaign's aesthetic. The top performers show models in natural settings with warm lighting. Would you like to see them?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message ai';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    handleChatKeydown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendChatMessage();
        }
    }

    refineObjective() {
        const message = "Can you help me refine the campaign objective to be more specific and actionable?";
        this.addChatMessage(message, 'user');
        
        setTimeout(() => {
            const response = "I'd recommend making the objective more specific about success metrics. For example: 'Increase Fall 2025 athleisure collection sales by 25% and drive 15% more in-store visits within the first 60 days of launch, targeting style-conscious women 25-40 who value comfort and sustainability.'";
            this.addChatMessage(response, 'ai');
        }, 1000);
    }

    closeInterface() {
        console.log('🚪 Closing Creative Studio Projects Interface');
        
        const modal = document.querySelector('.creative-studio-modal');
        if (modal) {
            modal.remove();
        }
        
        // Clean up global reference
        if (window.creativeStudio) {
            delete window.creativeStudio;
        }
    }

    // Brainstorm Data Initialization
    initializeBrainstormData() {
        this.brainstormData = {
            sceneDescriptions: {
                'The Cozy Commute': 'A warm, intimate morning scene inside a modern commuter train. Soft natural light streams through large windows, creating a golden-hour glow. A young professional sits comfortably in a window seat, wrapped in a cozy oversized cardigan, holding a reusable coffee cup. They\'re looking out at the passing autumn landscape with a content smile. The atmosphere is peaceful and aspirational, emphasizing comfort and mindful commuting.',
                'Weekend Wanderlust': 'An energetic urban exploration scene in a vibrant city neighborhood. Natural afternoon light illuminates colorful street art and bustling cafes. A stylish adventurer walks confidently through the scene wearing versatile athleisure pieces that transition seamlessly from coffee shop to art gallery. The mood is spontaneous and dynamic, capturing the spirit of urban discovery.',
                'Eco-Conscious Living': 'A sustainable lifestyle scene set in a modern, eco-friendly home or outdoor garden space. Warm natural lighting showcases someone choosing sustainable fashion options from a curated wardrobe. The setting emphasizes environmental consciousness with visible eco-friendly elements like plants, natural materials, and sustainable packaging. The atmosphere is mindful and purposeful.',
                'Digital Nomad Essentials': 'A minimalist workspace scene in an inspiring location - perhaps a co-working space with mountain views or a cafe overlooking the ocean. Someone works comfortably in packable, versatile clothing that looks professional yet travel-ready. The setting emphasizes freedom, flexibility, and the modern remote work lifestyle.'
            },
            
            assetRecommendations: {
                'The Cozy Commute': {
                    title: 'Sustainable Summer Lifestyle - Beach Scene',
                    source: 'Acme-Corp Global DAM',
                    filename: 'IMG_SummerBeach_Sustainable_2024_v3.jpg',
                    confidence: '96% Match',
                    metrics: { performance: '+34%', compliance: '98%', ctr: '4.2%' },
                    emoji: '🌿',
                    reasoning: 'This asset aligns perfectly with your campaign\'s sustainability messaging and Gen Z aesthetic. It features diverse models in eco-friendly beachwear with natural lighting and authentic expressions. The color palette matches your brand guidelines (earth tones with vibrant accents), and similar images performed 34% above benchmark with your target demographic.'
                },
                'Weekend Wanderlust': {
                    title: 'Urban Explorer Lifestyle - City Adventure',
                    source: 'Creative Assets Hub',
                    filename: 'IMG_UrbanExploration_Weekend_2024_v1.jpg', 
                    confidence: '94%',
                    metrics: { performance: '+28%', compliance: '95%', ctr: '3.8%' },
                    emoji: '🌆'
                },
                'Eco-Conscious Living': {
                    title: 'Sustainable Fashion Choice - Eco Home',
                    source: 'Green Living DAM',
                    filename: 'IMG_EcoFashion_Sustainable_2024_v3.jpg',
                    confidence: '92%',
                    metrics: { performance: '+31%', compliance: '99%', ctr: '4.0%' },
                    emoji: '🌱'
                },
                'Digital Nomad Essentials': {
                    title: 'Remote Work Style - Nomad Workspace',
                    source: 'Future Work Assets',
                    filename: 'IMG_RemoteWork_Nomad_2024_v2.jpg',
                    confidence: '89%',
                    metrics: { performance: '+25%', compliance: '96%', ctr: '3.5%' },
                    emoji: '💼'
                }
            },
            
            adCopyTemplates: {
                'The Cozy Commute': {
                    title: 'Your Commute, Reimagined',
                    hook: 'Turn travel time into your time. Comfort meets productivity.',
                    cta: 'Discover More →'
                },
                'Weekend Wanderlust': {
                    title: 'Adventure Awaits',
                    hook: 'From coffee shops to galleries. Style that moves with you.',
                    cta: 'Explore Collection →'
                },
                'Eco-Conscious Living': {
                    title: 'Conscious Choices',
                    hook: 'Fashion that feels good. For you and the planet.',
                    cta: 'Shop Sustainably →'
                },
                'Digital Nomad Essentials': {
                    title: 'Work From Anywhere',
                    hook: 'Professional style that travels. Freedom redefined.',
                    cta: 'Start Journey →'
                }
            }
        };
    }

    // Brainstorm Navigation Methods
    openBrainstormView(ideaData) {
        console.log('🧠 Opening brainstorm view for:', ideaData.title);
        console.log('🧠 Idea data received:', ideaData);
        
        // Replace the current interface with brainstorm view
        this.showBrainstormInterface(ideaData);
    }

    showBrainstormInterface(ideaData) {
        // Create full-screen brainstorm interface
        const modal = document.querySelector('.creative-studio-modal');
        if (modal) {
            modal.innerHTML = this.createBrainstormHTML(ideaData);
            this.initializeBrainstormEventListeners();
        }
    }

    // Brainstorm HTML Structure Creation
    createBrainstormHTML(ideaData) {
        return `
            <div class="brainstorm-container">
                <div class="brainstorm-header">
                    <div class="brainstorm-title-section">
                        <h2>${ideaData.title}</h2>
                        <div class="idea-status-tags" style="display: flex; gap: 6px; margin-top: 8px;">
                            <span style="padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; background: linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 100%); color: var(--accent-primary);">AI Generated</span>
                            <span style="font-size: 13px; color: var(--accent-primary); font-weight: 600; display: flex; align-items: center; gap: 6px;">👥 ${ideaData.audience}</span>
                        </div>
                    </div>
                    <button class="back-btn" onclick="window.creativeStudio.returnToIdeation()">← Back to Ideas</button>
                </div>

                <div class="brainstorm-canvas">
                    ${this.createSceneDescriptionPanel(ideaData)}
                    ${this.createAssetRecommendationPanel(ideaData)}
                    ${this.createAdCopyPanel(ideaData)}
                </div>

                ${this.createCoreAssetsSection(ideaData)}
            </div>
        `;
    }

    // Individual Panel Creation Methods
    createSceneDescriptionPanel(ideaData) {
        const description = this.brainstormData.sceneDescriptions[ideaData.title] || 
            'A compelling scene that captures the essence of this creative concept, focusing on authentic moments and aspirational lifestyle elements.';
        
        return `
            <div class="scene-panel">
                <div class="panel-label">Scene Description</div>
                <div class="scene-description-text">
                    ${description}
                </div>
            </div>
        `;
    }

    createAssetRecommendationPanel(ideaData) {
        const recommendation = this.brainstormData.assetRecommendations[ideaData.title] || 
            this.brainstormData.assetRecommendations['The Cozy Commute'];
        
        return `
            <div class="asset-panel">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                    <div class="ai-badge">✨ AI RECOMMENDED</div>
                    <div class="ai-thinking-tag">Searched 2 DAM systems in 0.8s</div>
                </div>

                <h3 class="suggestion-title">${recommendation.title}</h3>

                ${this.createDAMSourceHeader(recommendation)}
                ${this.createAssetImageContainer(recommendation)}
                ${this.createPerformanceMetrics(recommendation)}
                ${this.createSuggestionActions()}
                ${this.createAIReasoningSection(ideaData)}
                ${this.createAlternativesSection()}
            </div>
        `;
    }

    createDAMSourceHeader(recommendation) {
        return `
            <div class="dam-source-header">
                <div class="dam-source-title">Asset Source</div>
                <div class="dam-name">${recommendation.source}</div>
                <div class="asset-name">${recommendation.filename}</div>
                <button class="view-source-btn" onclick="window.creativeStudio.toggleSourceDetails(event)">
                    View Source →
                </button>
                <div class="source-details" id="sourceDetails">
                    <div class="source-details-content">
                        <div class="source-detail-row">
                            <span class="source-detail-label">Query:</span>
                            <span class="source-detail-value">"sustainable fashion Gen Z summer"</span>
                        </div>
                        <div class="source-detail-row">
                            <span class="source-detail-label">Searched:</span>
                            <span class="source-detail-value">2 DAM systems (0.8s)</span>
                        </div>
                        <div class="source-detail-row">
                            <span class="source-detail-label">Results:</span>
                            <span class="source-detail-value">127 assets analyzed</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createAssetImageContainer(recommendation) {
        return `
            <div class="asset-image-container">
                <div class="suggestion-image-placeholder">${recommendation.emoji}</div>
                <div class="confidence-badge">${recommendation.confidence}</div>

                <div class="dam-source-overlay">
                    <div class="dam-source-text">
                        📦 Retrieved from ${recommendation.source}
                    </div>
                </div>

                <div class="dam-info-trigger">ℹ️</div>
            </div>
        `;
    }

    createPerformanceMetrics(recommendation) {
        return `
            <div class="performance-metrics">
                <div class="metric">
                    <div class="metric-label">Past Performance</div>
                    <div class="metric-value">${recommendation.metrics.performance}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Brand Compliance</div>
                    <div class="metric-value">${recommendation.metrics.compliance}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Predicted CTR</div>
                    <div class="metric-value prediction">${recommendation.metrics.ctr}</div>
                </div>
            </div>
        `;
    }

    createSuggestionActions() {
        return `
            <div class="suggestion-actions">
                <button class="action-btn primary" onclick="window.creativeStudio.acceptAndAddAsset()">
                    ✓ Accept & Add
                </button>
                <button class="action-btn secondary" onclick="window.creativeStudio.showAlternatives()">
                    ↻ Alternative
                </button>
                <button class="action-btn tertiary" onclick="window.creativeStudio.generateAlternativeAsset()">
                    🎨 Generate
                </button>
            </div>
        `;
    }

    createAIReasoningSection(ideaData) {
        const recommendation = this.brainstormData.assetRecommendations[ideaData.title] || 
            this.brainstormData.assetRecommendations['The Cozy Commute'];
        
        return `
            <div class="ai-reasoning" style="margin-top: 24px;">
                <div class="ai-reasoning-title" onclick="window.creativeStudio.toggleReasoning()">Reasoning</div>
                <div class="ai-reasoning-content" id="reasoningContent">
                    <div class="ai-reasoning-text">
                        ${recommendation.reasoning}
                    </div>
                </div>
            </div>
        `;
    }

    createAlternativesSection() {
        return `
            <div class="alternatives-section" id="alternatives" style="margin-top: 24px;">
                <div class="alternatives-title">Alternative Suggestions</div>
                <div class="alternatives-grid">
                    <div class="alternative-card">
                        <div class="alternative-image">🏖️</div>
                        <div class="alternative-info">
                            Urban Sustainability Scene<br>
                            <span class="alternative-score">92% Match</span>
                        </div>
                    </div>
                    <div class="alternative-card">
                        <div class="alternative-image">🌊</div>
                        <div class="alternative-info">
                            Eco-Fashion Close-up<br>
                            <span class="alternative-score">89% Match</span>
                        </div>
                    </div>
                    <div class="alternative-card">
                        <div class="alternative-image">🌱</div>
                        <div class="alternative-info">
                            Natural Materials Focus<br>
                            <span class="alternative-score">87% Match</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createAdCopyPanel(ideaData) {
        const copyTemplate = this.brainstormData.adCopyTemplates[ideaData.title] || 
            this.brainstormData.adCopyTemplates['The Cozy Commute'];
        
        return `
            <div class="adcopy-panel">
                <div class="panel-label">Ad Copy Preview</div>
                <div class="adcopy-preview">
                    <div class="adcopy-element">
                        <div class="adcopy-label">Line One (Title)</div>
                        <div class="adcopy-text">${copyTemplate.title}</div>
                    </div>
                    <div class="adcopy-element">
                        <div class="adcopy-label">Line Two (Hook)</div>
                        <div class="adcopy-text">${copyTemplate.hook}</div>
                    </div>
                    <div class="adcopy-element">
                        <div class="adcopy-label">Call-to-Action</div>
                        <div class="adcopy-text cta">${copyTemplate.cta}</div>
                    </div>
                </div>
            </div>
        `;
    }

    createCoreAssetsSection(ideaData) {
        return `
            <div class="core-assets-section">
                <div class="panel-label">Core Assets</div>
                <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">
                    Creative assets for "${ideaData.title}" campaign idea
                </p>

                <div class="assets-gallery">
                    <div class="asset-card">
                        <div class="asset-card-image">
                            📸
                            <div class="asset-type-badge">Image</div>
                        </div>
                        <div class="asset-card-info">
                            <div class="asset-card-title">Lifestyle Photo - Morning Commute</div>
                            <div class="asset-card-meta">
                                <span>📏 1080x1080</span>
                                <span>✅ Approved</span>
                            </div>
                        </div>
                    </div>

                    <div class="asset-card">
                        <div class="asset-card-image">
                            🎬
                            <div class="asset-type-badge">Video</div>
                        </div>
                        <div class="asset-card-info">
                            <div class="asset-card-title">15s Story - Athleisure Transition</div>
                            <div class="asset-card-meta">
                                <span>⏱️ 15s</span>
                                <span>🔄 Draft</span>
                            </div>
                        </div>
                    </div>

                    <div class="asset-card">
                        <div class="asset-card-image">
                            🎨
                            <div class="asset-type-badge">Graphic</div>
                        </div>
                        <div class="asset-card-info">
                            <div class="asset-card-title">Social Media Carousel</div>
                            <div class="asset-card-meta">
                                <span>📐 Multi-size</span>
                                <span>✅ Approved</span>
                            </div>
                        </div>
                    </div>

                    <div class="add-asset-card" onclick="window.creativeStudio.addNewAsset()">
                        <div class="icon">➕</div>
                        <div class="text">Add New Asset</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Interactive Functionality
    initializeBrainstormEventListeners() {
        // Store reference for brainstorm functionality
        window.creativeStudio = this;
    }


    // Handle brainstorm button clicks
    handleBrainstormClick(button) {
        console.log('💡 Brainstorm button clicked');
        
        const ideaData = {
            title: button.dataset.ideaTitle,
            audience: button.dataset.ideaAudience,
            description: button.dataset.ideaDescription,
            emoji: button.dataset.ideaEmoji,
            status: button.dataset.ideaStatus.split(',')
        };
        
        console.log('💡 Extracted idea data:', ideaData);
        this.openBrainstormView(ideaData);
    }

    toggleSourceDetails(event) {
        if (event) {
            event.preventDefault();
        }
        const details = document.getElementById('sourceDetails');
        if (details) {
            details.classList.toggle('expanded');
        }
    }

    toggleReasoning() {
        const content = document.getElementById('reasoningContent');
        const title = document.querySelector('.ai-reasoning-title');
        if (content && title) {
            content.classList.toggle('collapsed');
            title.classList.toggle('collapsed');
        }
    }

    showAlternatives() {
        const alternatives = document.getElementById('alternatives');
        if (alternatives) {
            alternatives.classList.toggle('active');
        }
    }

    acceptAndAddAsset() {
        console.log('✓ Accepting and adding recommended asset');
        // Add asset to campaign
        this.showSuccessMessage('Asset added to campaign successfully!');
    }

    generateAlternativeAsset() {
        console.log('🎨 Generating alternative asset');
        // Trigger asset generation workflow
        this.showGenerationProgress();
    }

    addNewAsset() {
        console.log('➕ Adding new asset');
        alert('Add new asset feature coming soon!');
    }

    showSuccessMessage(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color, #2d9d78);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10001;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    showGenerationProgress() {
        // Show generation progress indicator
        const progress = document.createElement('div');
        progress.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-primary, #1957db);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10001;
        `;
        progress.textContent = '🎨 Generating alternative assets...';
        document.body.appendChild(progress);
        
        setTimeout(() => {
            progress.textContent = '✓ Generation complete!';
            setTimeout(() => {
                progress.remove();
            }, 2000);
        }, 2000);
    }

    returnToIdeation() {
        console.log('🔙 Returning to ideation board');

        // Re-create the main creative studio interface
        const modal = document.querySelector('.creative-studio-modal');
        if (modal) {
            modal.innerHTML = this.createInterfaceHTML();
            this.initializeEventListeners(modal);

            // Switch to ideation tab
            this.switchTab('ideation');
        }
    }

    // Mood Board Generation
    generateMoodBoard() {
        console.log('🎨 Generating mood board...');
        const grid = document.getElementById('moodboardGrid');
        const btn = document.querySelector('.generate-moodboard-btn');

        if (!grid || !btn) return;

        // Disable button and show loading state
        btn.disabled = true;
        btn.textContent = 'Generating...';

        // Clear existing images
        grid.innerHTML = '';

        // Sample mood board images (athleisure/fall theme)
        const moodboardImages = [
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400&h=400&fit=crop'
        ];

        // Simulate AI generation delay
        setTimeout(() => {
            moodboardImages.forEach((url, index) => {
                setTimeout(() => {
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = `Mood board inspiration ${index + 1}`;
                    img.className = 'moodboard-image';
                    img.style.opacity = '0';
                    img.style.transform = 'scale(0.8)';

                    grid.appendChild(img);

                    // Animate in
                    setTimeout(() => {
                        img.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    }, 50);
                }, index * 100);
            });

            // Re-enable button
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = '✨ Regenerate Mood Board';
            }, moodboardImages.length * 100 + 500);
        }, 1000);
    }

    // Ideate from Asset Table
    ideateFromAsset(channel, assetType, contentFocus, sizeRatio, deliverables) {
        console.log('💡 Ideating from asset:', channel, assetType);

        // Create a new idea tile based on the asset row data
        const idea = {
            title: `${channel} ${assetType} Campaign`,
            audience: 'Target Audience',
            description: contentFocus,
            status: ['ai-generated'],
            emoji: channel === 'Instagram' ? '📸' : '📌',
            assetType: assetType,
            sizeRatio: sizeRatio,
            deliverables: deliverables
        };

        // Switch to ideation tab
        this.switchTab('ideation');

        // Generate the idea tile
        const grid = document.getElementById('ideasGrid');
        if (!grid) return;

        const ideaTile = document.createElement('div');
        ideaTile.className = 'idea-tile';
        ideaTile.style.opacity = '0';
        ideaTile.style.transform = 'translateY(20px)';

        ideaTile.innerHTML = `
            <div class="idea-tile-image">${idea.emoji}</div>
            <div class="idea-tile-content">
                <div class="idea-tile-title">${idea.title}</div>
                <div class="idea-status-tags">
                    <span class="idea-status-tag ai-generated">AI Generated</span>
                </div>
                <div class="idea-audience">👥 ${idea.audience}</div>
                <div class="idea-description">${idea.description}</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">
                    <strong>Asset Type:</strong> ${idea.assetType}<br>
                    <strong>Size/Ratio:</strong> ${idea.sizeRatio}<br>
                    <strong>Deliverables:</strong> ${idea.deliverables}
                </div>
                <button class="brainstorm-btn"
                    data-idea-title="${idea.title}"
                    data-idea-audience="${idea.audience}"
                    data-idea-description="${idea.description}"
                    data-idea-emoji="${idea.emoji}"
                    data-idea-status="${idea.status.join(',')}"
                    onclick="window.creativeStudio.handleBrainstormClick(this)">
                    💡 Brainstorm
                </button>
            </div>
        `;

        grid.appendChild(ideaTile);

        // Animate in
        setTimeout(() => {
            ideaTile.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            ideaTile.style.opacity = '1';
            ideaTile.style.transform = 'translateY(0)';
        }, 100);
    }
}

export { CreativeStudioProjects };