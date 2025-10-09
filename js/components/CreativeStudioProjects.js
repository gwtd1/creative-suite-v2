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
            { text: "Refine creative brief", icon: "✨" },
            { text: "Write copy", icon: "✍️" },
            { text: "Find assets", icon: "🔍" },
            { text: "Generate creative assets", icon: "🎨" }
        ];

        // DAM search flow state
        this.findAssetsState = null;
        this.selectedDAMName = null;
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
                description: "The Seamless Transition. The clothing must erase the friction between distinct parts of her day—the high-intensity workout, the high-stakes video call, the sustainable coffee run, and the evening recovery.",
                coreMessage: "Core Message: The Only Transition You Need.",
                attributes: [
                    "Gender: Female, Male",
                    "Age: 30-40 year old",
                    "Interests: Work-life balance, Productivity hacks, coffee culture, fitness, sustainability, sustainable fashion, comfort-clothing."
                ],
                painpoints: [
                    "The anxiety of having to constantly change clothes to look put-together for an impromptu video call or client meeting after a morning workout or before running errands.",
                    "She struggles to find premium, versatile clothing that also meets her sustainable and ethical standards."
                ]
            },
            {
                name: "Wellness Enthusiast",
                description: "The Mindful Movement. Clothing that supports both physical performance and mental well-being, seamlessly transitioning from yoga studio to brunch to evening relaxation.",
                coreMessage: "Core Message: Performance Meets Peace of Mind.",
                attributes: [
                    "Gender: Female",
                    "Age: 28-42 year old",
                    "Interests: Fitness, yoga, meditation, sustainability, clean eating, holistic wellness, premium quality products."
                ],
                painpoints: [
                    "Difficulty finding athleisure that is both high-performance and environmentally responsible without compromising on style.",
                    "The need for versatile pieces that work for multiple activities throughout the day without requiring outfit changes."
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
                                `<div class="suggestion-chip" onclick="window.creativeStudio.sendSuggestion('${suggestion.text}')">${suggestion.icon} ${suggestion.text}</div>`
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
                <p class="objective-text">Launch Fall Athleisure Collection targeting active lifestyle women with premium positioning and versatile studio-to-street messaging.</p>
                <div style="margin-top: 16px;">
                    <p style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">Key Message</p>
                    <p style="font-size: 14px; color: #3C4257; line-height: 1.6;">Blending elegance with performance, highlighting versatility from studio to street.</p>
                </div>
                <p class="launch-date" style="margin-top: 16px;">Launch Date: ${this.campaignData.launchDate}</p>
                <div class="reasoning-toggle">💡 Reasoning ›</div>
            </div>

            <!-- Voice and Tone Section -->
            <div class="objective-section">
                <div class="objective-header">
                    <h2>Voice and Tone</h2>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 16px;">
                    <div>
                        <p style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">Voice</p>
                        <p style="font-size: 14px; color: #3C4257; line-height: 1.6;">Confident, sophisticated, and empowering. Speaks to the modern woman who values both style and substance.</p>
                    </div>
                    <div>
                        <p style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">Tone</p>
                        <p style="font-size: 14px; color: #3C4257; line-height: 1.6;">Aspirational yet approachable, premium without being pretentious, energetic but refined.</p>
                    </div>
                </div>
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
                                <div class="persona-header-left">
                                    <div class="persona-name">${persona.name}</div>
                                    <span class="persona-tag primary">Primary</span>
                                    <span class="persona-tag draft">Draft</span>
                                </div>
                                <div class="persona-menu">⋯</div>
                            </div>

                            <p class="persona-description">${persona.description}</p>

                            <p class="persona-core-message">${persona.coreMessage}</p>

                            <div class="persona-details-grid">
                                <div class="persona-detail-section">
                                    <strong class="persona-detail-label">Attributes:</strong>
                                    <ul class="persona-detail-list">
                                        ${persona.attributes.map(attr => `<li>${attr}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="persona-detail-section">
                                    <strong class="persona-detail-label">Painpoints:</strong>
                                    <ul class="persona-detail-list">
                                        ${persona.painpoints.map(pain => `<li>${pain}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>

                            <div class="persona-divider"></div>

                            <div class="creative-direction-header">
                                <div class="creative-direction-left">
                                    <span class="creative-direction-icon">▼</span>
                                    <span class="creative-direction-title">Creative Direction</span>
                                </div>
                                <div class="persona-menu">⋯</div>
                            </div>

                            <button class="brainstorm-btn-new"
                                data-idea-title="${persona.name}"
                                data-idea-audience="${persona.name}"
                                data-idea-description="${persona.description}"
                                data-idea-emoji="👥"
                                data-idea-status="ai-generated"
                                onclick="window.creativeStudio.handleBrainstormClick(this)">
                                ✨ Brainstorm
                            </button>
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
                            <th>Channel</th>
                            <th>Type</th>
                            <th>Aspect Ratio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.campaignData.channels.map(channel => `
                            <tr>
                                <td><span class="channel-name">${channel.name}</span></td>
                                <td>${channel.assetType}</td>
                                <td>${channel.ratio}</td>
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
            <div class="ideation-container">
                <!-- Main Content Area -->
                <div class="ideation-main-content" id="ideationMainContent" style="padding-top: 32px;">
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">Creative Ideation</h2>
                        <p style="color: #6e6e73; font-size: 14px;">AI-powered campaign ideas based on your brief</p>
                    </div>

                    <button class="create-ideas-btn" onclick="window.creativeStudio.generateIdeas()">✨ Create Ideas</button>

                    <div class="ideas-grid" id="ideasGrid">
                        <!-- Ideas will be generated here -->
                    </div>
                </div>
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

        // Add Next Steps recommendations
        this.addNextStepsRecommendations();
    }

    addNextStepsRecommendations() {
        const messagesContainer = document.getElementById('chatMessages');
        const nextStepsDiv = document.createElement('div');
        nextStepsDiv.className = 'chat-message ai';
        nextStepsDiv.style.maxWidth = '100%';

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        nextStepsDiv.innerHTML = `
            <div class="message-bubble" style="max-width: 100%;">
                <div style="margin-bottom: 12px; font-weight: 600; font-size: 14px; color: var(--text-primary);">Next Steps</div>

                <!-- Recommendation Cards -->
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <!-- Card 1: Brainstorm Hybrid Worker -->
                    <div onclick="window.creativeStudio.executeRecommendation('brainstorm-hybrid')" style="background: white; border: 1px solid #dce1ea; border-radius: 4px; padding: 16px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="font-weight: 600; font-size: 16px; color: #212121; line-height: 1.3;">Brainstorm creative direction for Hybrid Worker</div>
                            <div style="font-size: 14px; color: #6d6d6d; line-height: 1.5;">Define the narrative that will be used to create assets.</div>
                            <div style="height: 1px; background: #dce1ea;"></div>
                            <div style="background: #e7faea; padding: 8px; border-radius: 4px; display: flex; align-items: center; gap: 8px;">
                                <span style="color: #3b8c4a; font-size: 14px;">✓</span>
                                <span style="color: #3b8c4a; font-size: 14px; font-weight: 500;">Recommended</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card 2: Brainstorm Wellness Enthusiast -->
                    <div onclick="window.creativeStudio.executeRecommendation('brainstorm-wellness')" style="background: white; border: 1px solid #dce1ea; border-radius: 4px; padding: 16px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="font-weight: 600; font-size: 16px; color: #212121; line-height: 1.3;">Brainstorm creative direction for Wellness Enthusiast</div>
                            <div style="font-size: 14px; color: #6d6d6d; line-height: 1.5;">Define the narrative that will be used to create assets.</div>
                            <div style="height: 1px; background: #dce1ea;"></div>
                        </div>
                    </div>

                    <!-- Card 3: Create Mood Board -->
                    <div onclick="window.creativeStudio.executeRecommendation('moodboard')" style="background: white; border: 1px solid #dce1ea; border-radius: 4px; padding: 16px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="font-weight: 600; font-size: 16px; color: #212121; line-height: 1.3;">Create a mood board.</div>
                            <div style="font-size: 14px; color: #6d6d6d; line-height: 1.5;">Create a visual guide for inspiration.</div>
                            <div style="height: 1px; background: #dce1ea;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <span class="message-time">${timeString}</span>
        `;

        messagesContainer.appendChild(nextStepsDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    executeRecommendation(recommendationType) {
        console.log('📋 Executing recommendation:', recommendationType);

        if (recommendationType === 'brainstorm-hybrid') {
            // Find the Hybrid Worker persona brainstorm button and click it
            const hybridWorkerBtn = document.querySelector('[data-idea-title="Hybrid Worker"]');
            if (hybridWorkerBtn) {
                hybridWorkerBtn.click();
            } else {
                this.addChatMessage("Let me help you brainstorm creative direction for the Hybrid Worker persona. Switching to the Creative Brief tab...", 'ai');
                this.switchTab('brief');
            }
        } else if (recommendationType === 'brainstorm-wellness') {
            // Find the Wellness Enthusiast persona brainstorm button and click it
            const wellnessBtn = document.querySelector('[data-idea-title="Wellness Enthusiast"]');
            if (wellnessBtn) {
                wellnessBtn.click();
            } else {
                this.addChatMessage("Let me help you brainstorm creative direction for the Wellness Enthusiast persona. Switching to the Creative Brief tab...", 'ai');
                this.switchTab('brief');
            }
        } else if (recommendationType === 'moodboard') {
            this.addChatMessage("I'll help you create a mood board. Switching to the Creative Brief tab where you can generate a mood board...", 'ai');
            this.switchTab('brief');
            // Scroll to mood board section
            setTimeout(() => {
                const moodboardSection = document.querySelector('.moodboard-section');
                if (moodboardSection) {
                    moodboardSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 300);
        }
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
                    onclick="window.creativeStudio.openBrainstormFromCard(this)">
                    ✨ Brainstorm with AI
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

        // Check if we're in find assets flow
        if (this.findAssetsState) {
            this.handleFindAssetsFlow(message);
            return;
        }

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
        // Special handling for "Find assets"
        if (text === 'Find assets') {
            // Add user message
            this.addChatMessage(text, 'user');

            // Show typing indicator
            this.showTypingIndicator();

            // Step 1: Ask what they're looking for
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addChatMessage("What assets are you looking for? You can describe the type, theme, or campaign.", 'ai');
                this.findAssetsState = 'awaiting_description'; // Set state to await user's description
            }, 1000);
        } else {
            const input = document.getElementById('chatInput');
            input.value = text;
            this.sendChatMessage();
        }
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

    // Handle Find Assets Flow
    handleFindAssetsFlow(userMessage) {
        if (this.findAssetsState === 'awaiting_description') {
            // Step 2: Show DAM cards
            this.showTypingIndicator();
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addChatMessage(`Great! I found some relevant asset collections. Which DAM system would you like me to search?`, 'ai');
                this.addDAMSelectionCards();
                this.findAssetsState = 'awaiting_dam_selection';
            }, 1000);
        } else if (this.findAssetsState === 'awaiting_dam_selection') {
            // Step 3: Show loading and search
            this.showTypingIndicator();
            this.addChatMessage("Searching...", 'ai');

            setTimeout(() => {
                this.hideTypingIndicator();
                const totalAssets = Math.floor(Math.random() * 100) + 50;
                this.addChatMessage(`Found ${totalAssets} assets matching your criteria from ${this.selectedDAMName}! Here are 5 sample images:`, 'ai');
                this.showSampleImages();
                this.findAssetsState = 'awaiting_view_all';
            }, 2000);
        } else if (this.findAssetsState === 'awaiting_view_all') {
            // Step 4: Open modal with all images
            if (userMessage.toLowerCase().includes('yes') || userMessage.toLowerCase().includes('all')) {
                this.addChatMessage("Opening all assets...", 'ai');
                setTimeout(() => {
                    this.openAssetModal();
                    this.findAssetsState = null; // Reset state
                }, 500);
            } else {
                this.findAssetsState = null; // Reset state
            }
        }
    }

    addDAMSelectionCards() {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message ai';

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-bubble" style="max-width: 100%;">
                <div class="dam-card" style="cursor: pointer; margin-bottom: 16px;" onclick="window.creativeStudio.selectDAM('Fall 2024 Assets')">
                    <h3 class="dam-card-title">Fall 2024 Assets</h3>
                    <div class="dam-badge">Adobe</div>
                    <p class="dam-description">Explore emerging platforms and untapped opportunities</p>
                    <p class="dam-type">Type: Images, Video, Composed</p>
                    <div class="dam-metrics">
                        <div class="dam-metric">
                            <div class="dam-metric-label">ASSETS</div>
                            <div class="dam-metric-value">248</div>
                        </div>
                        <div class="dam-metric">
                            <div class="dam-metric-label">CLICKS</div>
                            <div class="dam-metric-value">32,876</div>
                        </div>
                        <div class="dam-metric">
                            <div class="dam-metric-label">CTR</div>
                            <div class="dam-metric-value">7.11</div>
                        </div>
                    </div>
                </div>

                <div class="dam-card" style="cursor: pointer;" onclick="window.creativeStudio.selectDAM('Fall Fitness Campaign')">
                    <h3 class="dam-card-title">Fall Fitness Campaign</h3>
                    <div class="dam-badge">Adobe</div>
                    <p class="dam-description">Explore emerging platforms and untapped opportunities</p>
                    <p class="dam-type">Type: Images, Video, Composed</p>
                    <div class="dam-metrics">
                        <div class="dam-metric">
                            <div class="dam-metric-label">ASSETS</div>
                            <div class="dam-metric-value">156</div>
                        </div>
                        <div class="dam-metric">
                            <div class="dam-metric-label">CLICKS</div>
                            <div class="dam-metric-value">21,543</div>
                        </div>
                        <div class="dam-metric">
                            <div class="dam-metric-label">CTR</div>
                            <div class="dam-metric-value">6.84</div>
                        </div>
                    </div>
                </div>
            </div>
            <span class="message-time">${timeString}</span>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    selectDAM(damName) {
        this.addChatMessage(damName, 'user');
        this.selectedDAMName = damName;
        this.handleFindAssetsFlow(damName);
    }

    showSampleImages() {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message ai';

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        // Sample image URLs (using placeholder images)
        const sampleImages = [
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1475403614135-5f1aa0eb5015?w=400&h=300&fit=crop'
        ];

        messageDiv.innerHTML = `
            <div class="message-bubble" style="max-width: 100%;">
                <div class="sample-images-grid" style="display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
                    ${sampleImages.map(url => `
                        <img src="${url}" alt="Asset preview" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    `).join('')}
                </div>
                <div>Would you like to see all assets?</div>
            </div>
            <span class="message-time">${timeString}</span>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    openAssetModal() {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.id = 'assetModal';
        modal.className = 'asset-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: fadeIn 0.2s ease-out;
        `;

        // Generate more images for the modal
        const allImages = [
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1475403614135-5f1aa0eb5015?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1532635270-c92ebcc42f4e?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=400&h=300&fit=crop'
        ];

        modal.innerHTML = `
            <div class="asset-modal-content" style="background: var(--card-bg); border-radius: 12px; width: 90%; max-width: 1200px; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
                <div class="asset-modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 32px; border-bottom: 1px solid var(--border-color);">
                    <h2 style="font-size: 28px; font-weight: 600; margin: 0;">All Assets from ${this.selectedDAMName}</h2>
                    <button onclick="window.creativeStudio.closeAssetModal()" style="background: none; border: none; font-size: 32px; color: var(--text-muted); cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 8px; transition: 0.2s;">×</button>
                </div>
                <div class="asset-modal-body" style="padding: 32px; overflow-y: auto;">
                    <div class="asset-modal-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px;">
                        ${allImages.map((url, index) => `
                            <div class="asset-modal-item" data-asset-index="${index}" style="position: relative; border-radius: 12px; overflow: hidden; border: 2px solid var(--border-color); transition: 0.2s; cursor: pointer;">
                                <input type="checkbox" class="asset-checkbox" id="asset-${index}" onchange="window.creativeStudio.toggleAssetSelection(${index})" style="position: absolute; top: 12px; right: 12px; width: 24px; height: 24px; cursor: pointer; z-index: 10; accent-color: var(--accent-primary);">
                                <img src="${url}" alt="Asset" onclick="window.creativeStudio.toggleCheckbox(${index})" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="asset-modal-footer" style="display: flex; justify-content: space-between; align-items: center; padding: 32px; border-top: 1px solid var(--border-color); background: var(--primary-bg);">
                    <div class="selected-count" id="selectedCount" style="font-size: 14px; color: var(--text-secondary); font-weight: 500;">0 assets selected</div>
                    <button class="save-to-campaign-btn" id="saveToCampaignBtn" onclick="window.creativeStudio.saveToCampaign()" disabled style="background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-purple) 100%); color: white; border: none; padding: 12px 28px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 8px;">
                        Save to campaign
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    toggleCheckbox(index) {
        const checkbox = document.getElementById(`asset-${index}`);
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            this.toggleAssetSelection(index);
        }
    }

    toggleAssetSelection(index) {
        const item = document.querySelector(`.asset-modal-item[data-asset-index="${index}"]`);
        const checkbox = document.getElementById(`asset-${index}`);

        if (item && checkbox) {
            if (checkbox.checked) {
                item.style.border = '2px solid var(--accent-primary)';
                item.style.boxShadow = '0 0 0 3px rgba(25, 87, 219, 0.1)';
            } else {
                item.style.border = '2px solid var(--border-color)';
                item.style.boxShadow = 'none';
            }
        }

        this.updateSelectedCount();
    }

    updateSelectedCount() {
        const checkboxes = document.querySelectorAll('.asset-checkbox:checked');
        const count = checkboxes.length;
        const countElement = document.getElementById('selectedCount');
        const saveBtn = document.getElementById('saveToCampaignBtn');

        if (countElement) {
            countElement.textContent = `${count} asset${count !== 1 ? 's' : ''} selected`;
        }

        if (saveBtn) {
            saveBtn.disabled = count === 0;
            saveBtn.style.opacity = count === 0 ? '0.5' : '1';
            saveBtn.style.cursor = count === 0 ? 'not-allowed' : 'pointer';
        }
    }

    saveToCampaign() {
        const checkboxes = document.querySelectorAll('.asset-checkbox:checked');
        const count = checkboxes.length;

        if (count === 0) return;

        // Close the modal
        this.closeAssetModal();

        // Show DAM assets section on the Creative Brief page
        const damSection = document.getElementById('damAssetsSection');
        if (damSection && this.selectedDAMName) {
            damSection.style.display = 'block';
            this.addDAMToBriefPage(this.selectedDAMName);
        }

        // Add a confirmation message to the chat
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addChatMessage(`Successfully saved ${count} asset${count !== 1 ? 's' : ''} to your campaign! You can find them in the DAM Assets section on the Creative Brief page.`, 'ai');
        }, 1000);

        // Reset the find assets flow
        this.findAssetsState = null;
    }

    addDAMToBriefPage(damName) {
        const damContainer = document.getElementById('damAssetsContainer');
        if (!damContainer) return;

        // Sample DAM data
        const damData = {
            'Fall 2024 Assets': {
                title: 'Fall 2024 Assets',
                badge: 'Adobe',
                description: 'Explore emerging platforms and untapped opportunities',
                type: 'Images, Video, Composed',
                metrics: { assets: '248', clicks: '32,876', ctr: '7.11' }
            },
            'Fall Fitness Campaign': {
                title: 'Fall Fitness Campaign',
                badge: 'Adobe',
                description: 'Explore emerging platforms and untapped opportunities',
                type: 'Images, Video, Composed',
                metrics: { assets: '156', clicks: '21,543', ctr: '6.84' }
            }
        };

        const selectedDAM = damData[damName];
        if (!selectedDAM) return;

        // Check if this DAM card already exists
        const existingCards = damContainer.querySelectorAll('.dam-card');
        for (let card of existingCards) {
            if (card.dataset.damName === damName) {
                return; // Already added
            }
        }

        // Create DAM card for the brief page
        const damCard = document.createElement('div');
        damCard.className = 'dam-card';
        damCard.dataset.damName = damName;
        damCard.innerHTML = `
            <h3 class="dam-card-title">${selectedDAM.title}</h3>
            <div class="dam-badge">${selectedDAM.badge}</div>
            <p class="dam-description">${selectedDAM.description}</p>
            <p class="dam-type">Type: ${selectedDAM.type}</p>
            <div class="dam-metrics">
                <div class="dam-metric">
                    <div class="dam-metric-label">ASSETS</div>
                    <div class="dam-metric-value">${selectedDAM.metrics.assets}</div>
                </div>
                <div class="dam-metric">
                    <div class="dam-metric-label">CLICKS</div>
                    <div class="dam-metric-value">${selectedDAM.metrics.clicks}</div>
                </div>
                <div class="dam-metric">
                    <div class="dam-metric-label">CTR</div>
                    <div class="dam-metric-value">${selectedDAM.metrics.ctr}</div>
                </div>
            </div>
        `;

        damContainer.appendChild(damCard);
    }

    closeAssetModal() {
        const modal = document.getElementById('assetModal');
        if (modal) {
            modal.remove();
        }
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
        // Save current ideation board state before replacing
        const mainContent = document.getElementById('ideationMainContent');
        if (mainContent) {
            this.savedIdeationHTML = mainContent.innerHTML;
            mainContent.innerHTML = this.createBrainstormHTML(ideaData);
            this.initializeBrainstormEventListeners();
        }
    }

    // Brainstorm HTML Structure Creation
    createBrainstormHTML(ideaData) {
        return `
            <div class="brainstorm-workspace">
                <!-- Brainstorm Header -->
                <div class="brainstorm-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <button class="back-btn" onclick="window.creativeStudio.returnToIdeation()" style="width: 40px; height: 40px; border-radius: 8px; border: 1px solid var(--border-color); background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px;">←</button>
                        <div class="brainstorm-title-section">
                            <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">${ideaData.title}</h2>
                            <div class="idea-status-tags" style="display: flex; gap: 6px; margin-top: 8px;">
                                <span style="padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; background: linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 100%); color: var(--accent-primary);">AI Generated</span>
                                <span style="font-size: 13px; color: var(--accent-primary); font-weight: 600; display: flex; align-items: center; gap: 6px;">👥 ${ideaData.audience}</span>
                            </div>
                        </div>
                    </div>
                    <button class="create-asset-btn" onclick="window.creativeStudio.createAsset()" style="padding: 12px 24px; border-radius: 12px; border: none; background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-purple) 100%); color: white; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">✨ Create Asset</button>
                </div>

                <!-- Creative Output Content -->
                <div class="output-content-area">
                    ${this.createSceneDescriptionPanel(ideaData)}
                    ${this.createAssetRecommendationPanel(ideaData)}
                    ${this.createAdCopyPanel(ideaData)}
                </div>
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
            title: `Creative Direction: ${button.dataset.ideaTitle}`,
            audience: button.dataset.ideaAudience,
            description: button.dataset.ideaDescription,
            emoji: button.dataset.ideaEmoji,
            status: ['ai-generated', 'brainstorm'],
            originalTitle: button.dataset.ideaTitle
        };

        console.log('💡 Creating ideation card for:', ideaData);

        // Switch to ideation tab
        this.switchTab('ideation');

        // Add the new card to the ideation board
        this.addIdeationCard(ideaData);
    }

    // Add new ideation card
    addIdeationCard(ideaData) {
        const grid = document.getElementById('ideasGrid');
        if (!grid) return;

        // Generate unique ID for this idea
        const ideaId = `idea-${Date.now()}`;
        ideaData.id = ideaId;

        const ideaTile = document.createElement('div');
        ideaTile.className = 'idea-tile';
        ideaTile.id = ideaId;
        ideaTile.style.opacity = '0';
        ideaTile.style.transform = 'translateY(20px)';

        ideaTile.innerHTML = `
            <div class="idea-tile-image">${ideaData.emoji}</div>
            <div class="idea-tile-content">
                <div class="idea-tile-title">${ideaData.title}</div>
                <div class="idea-status-tags">
                    ${ideaData.status.includes('ai-generated') ? '<span class="idea-status-tag ai-generated">AI Generated</span>' : ''}
                    ${ideaData.status.includes('brainstorm') ? '<span class="idea-status-tag brainstorm">From Persona</span>' : ''}
                    ${ideaData.status.includes('approved') ? '<span class="idea-status-tag approved">Approved</span>' : ''}
                </div>
                <div class="idea-audience">👥 ${ideaData.audience}</div>
                <div class="idea-description">${ideaData.description}</div>
                <button class="view-brainstorm-btn"
                    data-idea-title="${ideaData.title}"
                    data-idea-audience="${ideaData.audience}"
                    data-idea-description="${ideaData.description}"
                    data-idea-emoji="${ideaData.emoji}"
                    data-idea-status="${ideaData.status.join(',')}"
                    onclick="window.creativeStudio.openBrainstormFromCard(this)">
                    ✨ Brainstorm with AI
                </button>
            </div>
        `;

        grid.appendChild(ideaTile);

        // Add navigation item
        this.addIdeationNavItem(ideaData);

        // Animate in
        setTimeout(() => {
            ideaTile.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            ideaTile.style.opacity = '1';
            ideaTile.style.transform = 'translateY(0)';
        }, 100);
    }

    // Add navigation item for idea
    addIdeationNavItem(ideaData) {
        const navItems = document.getElementById('ideationNavItems');
        if (!navItems) return;

        const navItem = document.createElement('div');
        navItem.className = 'ideation-nav-item';
        navItem.dataset.ideaId = ideaData.id;
        navItem.title = ideaData.title;
        navItem.onclick = () => this.scrollToIdea(ideaData.id);

        navItem.innerHTML = `<span class="ideation-nav-item-icon">${ideaData.emoji}</span>`;

        navItems.appendChild(navItem);
    }

    // Scroll to specific idea card
    scrollToIdea(ideaId) {
        const ideaCard = document.getElementById(ideaId);
        if (ideaCard) {
            ideaCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Highlight the card briefly
            ideaCard.style.transition = 'box-shadow 0.3s ease';
            ideaCard.style.boxShadow = '0 0 0 3px rgba(25, 87, 219, 0.3)';

            setTimeout(() => {
                ideaCard.style.boxShadow = '';
            }, 2000);
        }
    }

    // Scroll to top of ideation board
    scrollToIdeationTop() {
        const mainContent = document.getElementById('ideationMainContent');
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Return to ideation board from brainstorm view
    returnToIdeation() {
        const mainContent = document.getElementById('ideationMainContent');
        if (mainContent) {
            // Restore saved ideation HTML if it exists, otherwise show default
            if (this.savedIdeationHTML) {
                mainContent.innerHTML = this.savedIdeationHTML;
            } else {
                mainContent.innerHTML = `
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
        }
    }

    // Open brainstorm view from card
    openBrainstormFromCard(button) {
        const ideaData = {
            title: button.dataset.ideaTitle,
            audience: button.dataset.ideaAudience,
            description: button.dataset.ideaDescription,
            emoji: button.dataset.ideaEmoji,
            status: button.dataset.ideaStatus.split(',')
        };

        // Generate unique ID if not exists
        if (!ideaData.id) {
            ideaData.id = `brainstorm-${Date.now()}`;
        }

        // Add icon to left navigation panel
        this.addBrainstormNavItem(ideaData);

        // Open brainstorm view
        this.openBrainstormView(ideaData);
    }

    // Add brainstorm navigation item
    addBrainstormNavItem(ideaData) {
        const navItems = document.getElementById('ideationNavItems');
        if (!navItems) return;

        // Check if item already exists
        const existingItem = navItems.querySelector(`[data-brainstorm-id="${ideaData.id}"]`);
        if (existingItem) return;

        const navItem = document.createElement('div');
        navItem.className = 'ideation-nav-item brainstorm-nav-item';
        navItem.dataset.brainstormId = ideaData.id;
        navItem.title = ideaData.title;
        navItem.onclick = () => this.openBrainstormView(ideaData);

        navItem.innerHTML = `<span class="ideation-nav-item-icon">💡</span>`;

        navItems.appendChild(navItem);

        // Animate in
        setTimeout(() => {
            navItem.style.opacity = '1';
            navItem.style.transform = 'translateX(0)';
        }, 100);
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

    createAsset() {
        console.log('✨ Opening Creative Canvas');
        this.openCreativeCanvas();
    }

    openCreativeCanvas() {
        const mainContent = document.getElementById('ideationMainContent');
        if (mainContent) {
            this.savedBrainstormHTML = mainContent.innerHTML;
            mainContent.innerHTML = this.createCreativeCanvasHTML();
            this.initializeCanvasEventListeners();
        }
    }

    createCreativeCanvasHTML() {
        return `
            <div class="creative-canvas-workspace">
                <!-- Canvas Header -->
                <div class="canvas-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <button class="back-btn" onclick="window.creativeStudio.returnFromCanvas()" style="width: 40px; height: 40px; border-radius: 8px; border: 1px solid var(--border-color); background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px;">←</button>
                        <h2 style="font-size: 24px; font-weight: 600; margin: 0;">Creative Canvas</h2>
                    </div>
                    <button class="canvas-settings-btn" style="width: 40px; height: 40px; border-radius: 8px; border: 1px solid var(--border-color); background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px;">⚙️</button>
                </div>

                <!-- Two Column Layout -->
                <div style="display: grid; grid-template-columns: 280px 1fr; gap: 24px; height: calc(100vh - 300px);">
                    <!-- Left Panel: Quick Tools -->
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <!-- Tools Panel -->
                        <div style="border: 1px solid var(--border-color); border-radius: 12px; background: white; padding: 20px;">
                            <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: var(--text-primary);">Quick Tools</h3>

                            <!-- Tool Buttons -->
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <button onclick="window.creativeStudio.selectTool('text')" class="tool-btn" style="width: 48px; height: 48px; border: 1px solid var(--border-color); border-radius: 8px; background: white; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                                    <span>T</span>
                                </button>

                                <button onclick="window.creativeStudio.selectTool('image')" class="tool-btn" style="width: 48px; height: 48px; border: 1px solid var(--border-color); border-radius: 8px; background: white; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                                    <span>🖼️</span>
                                </button>

                                <button onclick="window.creativeStudio.selectTool('ai-generate')" class="tool-btn" style="width: 48px; height: 48px; border: 1px solid var(--accent-primary); border-radius: 8px; background: linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 100%); cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; color: var(--accent-primary);">
                                    <span>✨</span>
                                </button>
                            </div>
                        </div>

                        <!-- Properties Panel -->
                        <div id="propertiesPanel" style="border: 1px solid var(--border-color); border-radius: 12px; background: white; padding: 20px; flex: 1; overflow-y: auto;">
                            <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: var(--text-primary);">Properties</h3>
                            <p style="margin: 0; font-size: 13px; color: var(--text-secondary);">Select an element to edit its properties</p>
                        </div>
                    </div>

                    <!-- Right Panel: Canvas Area -->
                    <div id="canvasPreviewArea" style="border: 1px solid var(--border-color); border-radius: 12px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
                        <div style="text-align: center; color: var(--text-secondary);">
                            <div style="font-size: 48px; margin-bottom: 16px;">🎨</div>
                            <p style="font-size: 16px; font-weight: 500; margin: 0;">Your canvas</p>
                            <p style="font-size: 14px; margin-top: 8px;">Use tools on the left or chat with AI to create</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initializeCanvasEventListeners() {
        window.creativeStudio = this;
        this.selectedTool = null;
    }

    returnFromCanvas() {
        const mainContent = document.getElementById('ideationMainContent');
        if (mainContent && this.savedBrainstormHTML) {
            mainContent.innerHTML = this.savedBrainstormHTML;
        }
    }

    selectTool(toolName) {
        console.log('🔧 Selected tool:', toolName);
        this.selectedTool = toolName;

        // Update properties panel based on selected tool
        const propertiesPanel = document.getElementById('propertiesPanel');

        if (toolName === 'ai-generate') {
            propertiesPanel.innerHTML = `
                <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: var(--text-primary);">AI Generate</h3>
                <p style="margin: 0 0 12px 0; font-size: 13px; color: var(--text-secondary);">Use the chat to describe what you want to generate</p>
                <div style="padding: 12px; background: linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 100%); border-radius: 8px; font-size: 13px; color: var(--accent-primary);">
                    💡 Tip: Be specific about style, colors, and composition
                </div>
            `;
        } else if (toolName === 'text') {
            propertiesPanel.innerHTML = `
                <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: var(--text-primary);">Text Properties</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px; color: var(--text-primary);">Font Size</label>
                        <input type="range" min="12" max="72" value="16" style="width: 100%;">
                    </div>
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px; color: var(--text-primary);">Font Weight</label>
                        <select style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 6px;">
                            <option>Regular</option>
                            <option>Bold</option>
                            <option>Light</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px; color: var(--text-primary);">Color</label>
                        <input type="color" value="#000000" style="width: 100%; height: 40px; border: 1px solid var(--border-color); border-radius: 6px;">
                    </div>
                </div>
            `;
        } else if (toolName === 'image') {
            propertiesPanel.innerHTML = `
                <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: var(--text-primary);">Image Properties</h3>
                <button onclick="window.creativeStudio.uploadImage()" style="width: 100%; padding: 12px; border: 1px dashed var(--border-color); border-radius: 8px; background: white; cursor: pointer; font-size: 14px; color: var(--text-secondary);">
                    📁 Upload Image
                </button>
            `;
        } else if (toolName === 'shape') {
            propertiesPanel.innerHTML = `
                <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: var(--text-primary);">Shape Properties</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px; color: var(--text-primary);">Fill Color</label>
                        <input type="color" value="#1957db" style="width: 100%; height: 40px; border: 1px solid var(--border-color); border-radius: 6px;">
                    </div>
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px; color: var(--text-primary);">Border</label>
                        <input type="range" min="0" max="10" value="1" style="width: 100%;">
                    </div>
                </div>
            `;
        }
    }

    uploadImage() {
        console.log('📁 Upload image');
        alert('Image upload feature coming soon!');
    }

    addCanvasChatMessage(text, type) {
        const messagesContainer = document.getElementById('canvasChatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `canvas-message ${type}`;

        if (type === 'agent') {
            messageDiv.innerHTML = `
                <div style="display: flex; gap: 12px;">
                    <div class="agent-avatar" style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">💎</div>
                    <div class="message-content" style="flex: 1;">
                        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: var(--text-primary);">${text}</p>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div style="display: flex; justify-content: flex-end;">
                    <div style="background: var(--accent-primary); color: white; padding: 12px 16px; border-radius: 12px; max-width: 80%; font-size: 14px; line-height: 1.6;">
                        ${text}
                    </div>
                </div>
            `;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showCanvasTypingIndicator() {
        const messagesContainer = document.getElementById('canvasChatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'canvasTypingIndicator';
        typingDiv.className = 'canvas-message agent';
        typingDiv.innerHTML = `
            <div style="display: flex; gap: 12px;">
                <div class="agent-avatar" style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">💎</div>
                <div class="typing-indicator" style="display: flex; gap: 4px; padding: 12px;">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--text-secondary); animation: typing 1.4s infinite;"></div>
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--text-secondary); animation: typing 1.4s infinite 0.2s;"></div>
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--text-secondary); animation: typing 1.4s infinite 0.4s;"></div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideCanvasTypingIndicator() {
        const indicator = document.getElementById('canvasTypingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    showGeneratedImage() {
        const previewArea = document.getElementById('canvasPreviewArea');
        previewArea.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
                <div style="flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; position: relative;">
                    <div style="text-align: center; color: white;">
                        <div style="font-size: 64px; margin-bottom: 16px;">🎨</div>
                        <p style="font-size: 18px; font-weight: 600;">Generated Image Preview</p>
                        <p style="font-size: 14px; opacity: 0.9; margin-top: 8px;">Your AI-generated asset</p>
                    </div>
                </div>
                <div style="padding: 16px; border-top: 1px solid var(--border-color); display: flex; gap: 12px; justify-content: flex-end; background: white;">
                    <button onclick="window.creativeStudio.regenerateImage()" style="padding: 10px 20px; border: 1px solid var(--border-color); border-radius: 8px; background: white; cursor: pointer; font-size: 14px; font-weight: 500;">Regenerate</button>
                    <button onclick="window.creativeStudio.saveToAssets()" style="padding: 10px 20px; border: none; border-radius: 8px; background: var(--accent-primary); color: white; cursor: pointer; font-size: 14px; font-weight: 600;">Save to Assets</button>
                </div>
            </div>
        `;
    }

    handleCanvasChatKeydown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendCanvasMessage();
        }
    }

    attachFile() {
        console.log('📎 Attach file');
        alert('File attachment feature coming soon!');
    }

    regenerateImage() {
        console.log('🔄 Regenerating image');
        this.addCanvasChatMessage('Regenerating with variations...', 'agent');
        setTimeout(() => {
            this.showGeneratedImage();
        }, 2000);
    }

    saveToAssets() {
        console.log('💾 Saving to assets');
        alert('Asset saved successfully!');
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

    // Duplicate method removed - using the one above at line ~1750

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
                    onclick="window.creativeStudio.openBrainstormFromCard(this)">
                    ✨ Brainstorm with AI
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