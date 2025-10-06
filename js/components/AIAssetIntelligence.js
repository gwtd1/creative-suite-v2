// AI Asset Intelligence - Context-Aware Asset Recommendation System
class AIAssetIntelligence {
    constructor(parentApp) {
        this.parentApp = parentApp;
        this.campaignContext = null;
        this.assetRecommendations = [];
        this.isProcessing = false;
        
        this.init();
    }
    
    init() {
        console.log('🧠 AI Asset Intelligence initialized');
        this.attachEventListeners();
        this.enhanceWorkspaceTiles();
    }
    
    attachEventListeners() {
        // AI Recommendations application
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="apply-recommendations"]')) {
                const projectId = e.target.closest('.workspace-tile').dataset.project;
                this.applyAIRecommendations(projectId);
            }
            
            if (e.target.closest('[data-action="refine-suggestions"]')) {
                const projectId = e.target.closest('.workspace-tile').dataset.project;
                this.showAssetSelectionModal(projectId);
            }
            
            if (e.target.closest('.expand-reasoning')) {
                this.toggleReasoningPanel(e.target.closest('.ai-reasoning-panel'));
            }
            
            if (e.target.closest('.btn-use-asset')) {
                const assetId = e.target.closest('.smart-asset-card').dataset.assetId;
                this.applySelectedAsset(assetId);
            }
            
            if (e.target.closest('.btn-apply-all')) {
                this.applyCompleteAssetPackage();
            }
        });
        
        // Workspace tile enhancements
        document.addEventListener('mouseenter', (e) => {
            if (e.target.closest('.workspace-tile.summer-sale-ai-enhanced')) {
                this.showAssetPreview(e.target.closest('.workspace-tile'));
            }
        }, true);
    }
    
    enhanceWorkspaceTiles() {
        console.log('🔍 Looking for workspace tiles to enhance...');
        
        // Find and enhance the summer sale 2025 tile
        const summerSaleTile = document.querySelector('[data-project="summer-sale-2025"]');
        console.log('Summer Sale tile found:', summerSaleTile);
        
        if (summerSaleTile) {
            console.log('✅ Enhancing Summer Sale 2025 tile');
            this.enhanceSummerSaleTile(summerSaleTile);
        } else {
            console.log('❌ Summer Sale 2025 tile not found');
        }
    }
    
    enhanceSummerSaleTile(tile) {
        console.log('🎨 Enhancing Summer Sale tile with AI features...');
        
        // Add AI enhancement class
        tile.classList.add('summer-sale-ai-enhanced');
        console.log('✅ Added AI enhancement class to tile');
        
        // Add AI-Optimized badge
        this.addAIOptimizedBadge(tile);
        
        // Get campaign context for summer sale
        this.campaignContext = this.getSummerSaleCampaignContext();
        console.log('📋 Campaign context loaded:', this.campaignContext);
        
        // Generate AI recommendations
        this.generateSmartRecommendations().then(recommendations => {
            console.log('🤖 AI recommendations generated:', recommendations);
            this.assetRecommendations = recommendations;
            this.updateTileWithRecommendations(tile, recommendations);
        }).catch(error => {
            console.error('❌ Error generating recommendations:', error);
        });
    }
    
    addAIOptimizedBadge(tile) {
        // Check if badge already exists
        if (tile.querySelector('.ai-optimized-badge')) return;
        
        const badge = document.createElement('div');
        badge.className = 'ai-optimized-badge';
        badge.textContent = 'AI-Optimized';
        tile.appendChild(badge);
    }
    
    updateTileWithRecommendations(tile, recommendations) {
        // Add confidence indicator
        this.addConfidenceIndicator(tile, 96);
        
        // Add asset preview thumbnails
        this.addAssetPreviewThumbnails(tile, recommendations);
        
        // Add Apply Recommendations button
        this.addApplyRecommendationsButton(tile);
    }
    
    addConfidenceIndicator(tile, confidence) {
        // Check if indicator already exists
        if (tile.querySelector('.confidence-indicator')) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'confidence-indicator';
        indicator.textContent = `${confidence}% Match`;
        
        // Find tile content area to append to
        const tileContent = tile.querySelector('.tile-content') || tile;
        tileContent.appendChild(indicator);
    }
    
    addAssetPreviewThumbnails(tile, recommendations) {
        // Check if thumbnails already exist
        if (tile.querySelector('.asset-preview-thumbnails')) return;
        
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'asset-preview-thumbnails';
        
        // Create 3 preview thumbnails
        for (let i = 0; i < 3; i++) {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'preview-thumbnail';
            thumbnailContainer.appendChild(thumbnail);
        }
        
        // Find tile content area to append to
        const tileContent = tile.querySelector('.tile-content') || tile;
        tileContent.appendChild(thumbnailContainer);
    }
    
    addApplyRecommendationsButton(tile) {
        // Check if button already exists
        if (tile.querySelector('[data-action="apply-recommendations"]')) return;
        
        const button = document.createElement('button');
        button.className = 'btn-apply-recommendations';
        button.setAttribute('data-action', 'apply-recommendations');
        button.innerHTML = '✅ Apply AI Recommendations';
        button.style.cssText = `
            background: var(--accent-primary, #1957db);
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: var(--font-sm, 13px);
            font-weight: 600;
            margin-top: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            opacity: 0;
        `;
        
        // Show button on hover
        tile.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
        });
        
        tile.addEventListener('mouseleave', () => {
            button.style.opacity = '0';
        });
        
        // Find tile content area to append to
        const tileContent = tile.querySelector('.tile-content') || tile;
        tileContent.appendChild(button);
    }
    
    getSummerSaleCampaignContext() {
        return {
            campaignId: 'summer-sale-2025',
            targetAudience: {
                demographics: 'Beach lifestyle enthusiasts, 25-40',
                psychographics: ['wellness-focused', 'aspirational', 'active-lifestyle'],
                channels: ['instagram', 'email', 'website']
            },
            launchDate: new Date('2025-06-15'),
            brandGuidelines: {
                colors: ['#FF6B35', '#F7931E', '#FFD23F'],
                mood: 'energetic, fresh, summery',
                values: ['authenticity', 'adventure', 'quality']
            },
            campaignObjectives: ['awareness', 'conversion', 'engagement'],
            budget: 50000,
            duration: 60 // days
        };
    }
    
    async generateSmartRecommendations() {
        console.log('🔍 Generating smart asset recommendations...');
        
        const contextFactors = {
            audience: this.campaignContext.targetAudience,
            seasonality: this.campaignContext.launchDate,
            brandGuidelines: this.campaignContext.brandGuidelines,
            historicalPerformance: await this.getHistoricalData(),
            currentTrends: await this.getCurrentTrends()
        };
        
        // Using mock data for demonstration
        return this.rankAndFilterRecommendations(contextFactors);
    }
    
    async getHistoricalData() {
        // Simulate historical performance data retrieval
        return {
            summerCampaigns: {
                avgCTR: 3.8,
                avgConversion: 2.3,
                topPerformingAssets: ['beach-lifestyle', 'product-in-use', 'seasonal-themes']
            },
            audienceEngagement: {
                preferredFormats: ['instagram-stories', 'email-campaigns', 'hero-images'],
                peakTimes: ['tuesday-10am', 'sunday-6pm'],
                seasonalBoost: 1.31 // 31% boost for summer content
            }
        };
    }
    
    async getCurrentTrends() {
        // Simulate current trend analysis
        return {
            trending: ['minimalist-summer', 'wellness-focus', 'authentic-lifestyle'],
            colors: ['coral', 'ocean-blue', 'sand-beige'],
            formats: ['vertical-video', 'carousel', 'cinemagraph'],
            hashtags: ['#summervibes', '#beachlifestyle', '#wellness']
        };
    }
    
    rankAndFilterRecommendations(contextFactors) {
        const rankedAssets = [
            {
                id: 'beach-lifestyle-hero-v2',
                category: 'hero_image',
                title: 'Beach Lifestyle Hero',
                description: 'Authentic beach lifestyle imagery with brand integration',
                confidence: 96,
                performancePrediction: {
                    ctr: 4.7,
                    improvement: 23,
                    engagement: 8.9
                },
                reasoning: [
                    'Beach lifestyle imagery resonates 94% with target demographic 25-40',
                    'Peak seasonal relevance for June 2025 launch',
                    'Historical performance: 2.3x better than generic beach images'
                ],
                tags: ['summer-2025', 'beach-enthusiasts', 'high-converting'],
                source: 'DAM_SMART_SELECTION'
            },
            {
                id: 'summer-sale-email-v1',
                category: 'email_template',
                title: 'Summer Sale Email Campaign',
                description: 'Mobile-optimized email template with seasonal theming',
                confidence: 91,
                performancePrediction: {
                    openRate: 32,
                    conversionRate: 4.2,
                    engagement: 7.8
                },
                reasoning: [
                    'Subject line optimized for summer campaigns',
                    'Mobile-first design (78% of audience on mobile)',
                    'Optimal send time: Tuesday 10:AM EST'
                ],
                tags: ['email-marketing', 'mobile-optimized', 'seasonal'],
                source: 'AI_GENERATED_TEMPLATE'
            },
            {
                id: 'summer-ig-post-001',
                category: 'social_content',
                title: 'Instagram Summer Post',
                description: 'Instagram-optimized post with beach lifestyle theme',
                confidence: 88,
                performancePrediction: {
                    engagement: 2800,
                    reach: 15000,
                    saves: 420
                },
                reasoning: [
                    'Instagram post format optimized for beach lifestyle audience',
                    'Hashtag strategy based on trending summer content',
                    'Visual style aligns with target demographic preferences'
                ],
                tags: ['instagram', 'lifestyle', 'summer-vibes'],
                source: 'TEMPLATE_PERSONALIZED'
            }
        ];
        
        return rankedAssets;
    }
    
    updateTileWithRecommendations(tile, recommendations) {
        // Update existing tile content or create new structure
        const existingContent = tile.querySelector('.tile-content');
        if (existingContent) {
            // Enhance existing content
            this.enhanceExistingTileContent(tile, recommendations);
        } else {
            // Create new enhanced structure
            this.createEnhancedTileStructure(tile, recommendations);
        }
    }
    
    enhanceExistingTileContent(tile, recommendations) {
        const tileContent = tile.querySelector('.tile-content') || tile;
        
        // Add AI intelligence badge to header
        let header = tile.querySelector('.tile-header');
        if (!header) {
            header = document.createElement('div');
            header.className = 'tile-header';
            tileContent.insertBefore(header, tileContent.firstChild);
        }
        
        if (!header.querySelector('.ai-intelligence-badge')) {
            const aiBadge = document.createElement('div');
            aiBadge.className = 'ai-intelligence-badge';
            aiBadge.innerHTML = `
                <i class="fas fa-brain"></i>
                <span>AI-Optimized</span>
            `;
            header.appendChild(aiBadge);
        }
        
        // Add campaign meta information
        this.addCampaignMeta(tileContent);
        
        // Add AI asset preview
        this.addAssetPreview(tileContent, recommendations);
        
        // Add AI actions
        this.addAIActions(tileContent);
        
        // Add reasoning panel
        this.addReasoningPanel(tileContent, recommendations);
    }
    
    createEnhancedTileStructure(tile, recommendations) {
        tile.innerHTML = `
            <div class="tile-header">
                <div class="project-status-indicator">
                    <div class="status-dot active"></div>
                    <span class="status-text">Active Campaign</span>
                </div>
                <div class="ai-intelligence-badge">
                    <i class="fas fa-brain"></i>
                    <span>AI-Optimized</span>
                </div>
            </div>
            
            <div class="tile-content">
                <h3 class="project-title">Summer Sale 2025</h3>
                <div class="campaign-meta">
                    <div class="launch-timeline">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Launch: June 15, 2025</span>
                    </div>
                    <div class="target-audience">
                        <i class="fas fa-users"></i>
                        <span>Beach lifestyle enthusiasts, 25-40</span>
                    </div>
                </div>
                
                <div class="ai-asset-preview">
                    <div class="preview-header">
                        <div>
                            <i class="fas fa-magic" style="color: var(--accent-purple)"></i>
                            <span>AI-Recommended Assets Ready</span>
                        </div>
                        <div class="confidence-score">
                            <span class="score">96%</span>
                            <span class="label">Match</span>
                        </div>
                    </div>
                    
                    <div class="smart-asset-grid">
                        ${this.generateAssetThumbnails(recommendations)}
                    </div>
                </div>
                
                <div class="ai-actions">
                    <button class="btn-ai-primary" data-action="apply-recommendations">
                        <i class="fas fa-wand-magic"></i>
                        Apply AI Recommendations
                        <span class="action-count">${recommendations.length} assets</span>
                    </button>
                    <button class="btn-ai-secondary" data-action="refine-suggestions">
                        <i class="fas fa-sliders-h"></i>
                        Refine Suggestions
                    </button>
                </div>
            </div>
            
            <div class="ai-reasoning-panel collapsed">
                <div class="reasoning-header">
                    <button class="expand-reasoning">
                        <i class="fas fa-chevron-down"></i>
                        <span>Why these recommendations?</span>
                    </button>
                </div>
                <div class="reasoning-content">
                    ${this.generateReasoningFactors(recommendations)}
                </div>
            </div>
        `;
    }
    
    addCampaignMeta(container) {
        const campaignMeta = document.createElement('div');
        campaignMeta.className = 'campaign-meta';
        campaignMeta.innerHTML = `
            <div class="launch-timeline">
                <i class="fas fa-calendar-alt"></i>
                <span>Launch: June 15, 2025</span>
            </div>
            <div class="target-audience">
                <i class="fas fa-users"></i>
                <span>Beach lifestyle enthusiasts, 25-40</span>
            </div>
        `;
        
        const title = container.querySelector('.project-title');
        if (title) {
            title.insertAdjacentElement('afterend', campaignMeta);
        }
    }
    
    addAssetPreview(container, recommendations) {
        const assetPreview = document.createElement('div');
        assetPreview.className = 'ai-asset-preview';
        assetPreview.innerHTML = `
            <div class="preview-header">
                <div>
                    <i class="fas fa-magic" style="color: var(--accent-purple)"></i>
                    <span>AI-Recommended Assets Ready</span>
                </div>
                <div class="confidence-score">
                    <span class="score">96%</span>
                    <span class="label">Match</span>
                </div>
            </div>
            
            <div class="smart-asset-grid">
                ${this.generateAssetThumbnails(recommendations)}
            </div>
        `;
        
        container.appendChild(assetPreview);
    }
    
    addAIActions(container) {
        const aiActions = document.createElement('div');
        aiActions.className = 'ai-actions';
        aiActions.innerHTML = `
            <button class="btn-ai-primary" data-action="apply-recommendations">
                <i class="fas fa-wand-magic"></i>
                Apply AI Recommendations
                <span class="action-count">3 assets</span>
            </button>
            <button class="btn-ai-secondary" data-action="refine-suggestions">
                <i class="fas fa-sliders-h"></i>
                Refine Suggestions
            </button>
        `;
        
        container.appendChild(aiActions);
    }
    
    addReasoningPanel(container, recommendations) {
        const reasoningPanel = document.createElement('div');
        reasoningPanel.className = 'ai-reasoning-panel collapsed';
        reasoningPanel.innerHTML = `
            <div class="reasoning-header">
                <button class="expand-reasoning">
                    <i class="fas fa-chevron-down"></i>
                    <span>Why these recommendations?</span>
                </button>
            </div>
            <div class="reasoning-content">
                ${this.generateReasoningFactors(recommendations)}
            </div>
        `;
        
        container.appendChild(reasoningPanel);
    }
    
    generateAssetThumbnails(recommendations) {
        return recommendations.map(asset => {
            if (asset.category === 'hero_image') {
                return `
                    <div class="asset-thumbnail hero-image" data-asset-id="${asset.id}">
                        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #FF6B35, #F7931E); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">Beach Hero</div>
                        <div class="asset-overlay">
                            <div class="asset-type">Hero Image</div>
                            <div class="performance-prediction">
                                <i class="fas fa-chart-line"></i>
                                <span>+${asset.performancePrediction.improvement}% CTR predicted</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (asset.category === 'email_template') {
                return `
                    <div class="asset-thumbnail email-template" data-asset-id="${asset.id}">
                        <div class="email-preview">
                            <div class="email-subject">Summer's Hottest Deals Inside! ☀️</div>
                            <div class="email-preview-body">Your perfect beach day starts...</div>
                        </div>
                        <div class="asset-overlay">
                            <div class="asset-type">Email Campaign</div>
                            <div class="performance-prediction">
                                <i class="fas fa-envelope-open"></i>
                                <span>${asset.performancePrediction.openRate}% open rate projected</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (asset.category === 'social_content') {
                return `
                    <div class="asset-thumbnail social-post" data-asset-id="${asset.id}">
                        <div class="social-preview instagram">
                            <div class="post-image"></div>
                            <div class="post-caption">"Beach vibes incoming! 🌊 Summer sale..."</div>
                        </div>
                        <div class="asset-overlay">
                            <div class="asset-type">Instagram Post</div>
                            <div class="performance-prediction">
                                <i class="fas fa-heart"></i>
                                <span>${asset.performancePrediction.engagement} engagement est.</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }).join('');
    }
    
    generateReasoningFactors(recommendations) {
        return `
            <div class="reasoning-factors">
                <div class="factor-item">
                    <i class="fas fa-target" style="color: var(--accent-green)"></i>
                    <div class="factor-content">
                        <span class="factor-title">Audience Analysis</span>
                        <span class="factor-description">Beach lifestyle imagery resonates 94% with target demographic 25-40</span>
                    </div>
                </div>
                <div class="factor-item">
                    <i class="fas fa-clock" style="color: var(--accent-orange)"></i>
                    <div class="factor-content">
                        <span class="factor-title">Seasonal Timing</span>
                        <span class="factor-description">Summer themes peak performance in June campaigns (+31% engagement)</span>
                    </div>
                </div>
                <div class="factor-item">
                    <i class="fas fa-chart-bar" style="color: var(--accent-primary)"></i>
                    <div class="factor-content">
                        <span class="factor-title">Historical Performance</span>
                        <span class="factor-description">Similar campaigns achieved 2.3x ROAS with these asset types</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    toggleReasoningPanel(panel) {
        panel.classList.toggle('collapsed');
    }
    
    async applyAIRecommendations(projectId) {
        if (this.isProcessing) return;
        
        this.isProcessing = true;
        console.log('🚀 Applying AI recommendations for:', projectId);
        
        // Show processing state
        this.showProcessingState(projectId);
        
        try {
            const applicationResults = await this.processAssetApplication();
            this.showApplicationResults(applicationResults);
        } catch (error) {
            console.error('Error applying recommendations:', error);
            this.showErrorState('Failed to apply recommendations');
        } finally {
            this.isProcessing = false;
        }
    }
    
    async processAssetApplication() {
        // Simulate asset application process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return {
            heroImage: {
                applied: true,
                reasoning: "Beach lifestyle imagery aligns with target audience psychographics and seasonal timing",
                performancePrediction: "+23% CTR improvement vs. current assets",
                source: "DAM_SMART_SELECTION",
                assetId: "beach-lifestyle-hero-v2.jpg"
            },
            emailCampaign: {
                applied: true,
                reasoning: "Subject line A/B tested with similar demographics shows 32% open rate",
                performancePrediction: "4.2% conversion rate projected based on seasonal trends",
                source: "AI_GENERATED_TEMPLATE",
                templateId: "summer-sale-email-v1"
            },
            socialContent: {
                applied: true,
                reasoning: "Instagram post format optimized for beach lifestyle audience engagement patterns",
                performancePrediction: "2.8K engagement estimated based on hashtag performance",
                source: "TEMPLATE_PERSONALIZED",
                postId: "summer-ig-post-001"
            }
        };
    }
    
    showProcessingState(projectId) {
        const tile = document.querySelector(`[data-project="${projectId}"]`);
        const aiActions = tile.querySelector('.ai-actions');
        
        if (aiActions) {
            const primaryBtn = aiActions.querySelector('.btn-ai-primary');
            primaryBtn.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                Applying Recommendations...
            `;
            primaryBtn.disabled = true;
        }
    }
    
    showApplicationResults(results) {
        const notification = document.createElement('div');
        notification.className = 'ai-notification success';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div>
                    <h4>AI Recommendations Applied Successfully!</h4>
                    <p>3 assets integrated with 94% average confidence</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Reset button state
        this.resetActionButtons();
    }
    
    showErrorState(message) {
        const notification = document.createElement('div');
        notification.className = 'ai-notification error';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <h4>Application Failed</h4>
                    <p>${message}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        this.resetActionButtons();
    }
    
    resetActionButtons() {
        const primaryBtns = document.querySelectorAll('.btn-ai-primary');
        primaryBtns.forEach(btn => {
            btn.innerHTML = `
                <i class="fas fa-wand-magic"></i>
                Apply AI Recommendations
                <span class="action-count">3 assets</span>
            `;
            btn.disabled = false;
        });
    }
    
    showAssetSelectionModal(projectId) {
        console.log('🖥️ Showing AI Asset Selection Modal for project:', projectId);
        
        try {
            const modal = this.createAssetSelectionModal();
            console.log('📦 Modal created successfully');
            
            document.body.appendChild(modal);
            console.log('✅ Modal added to DOM');
            
            // Add close functionality
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.closest('.modal-close')) {
                    modal.remove();
                }
            });
        } catch (error) {
            console.error('❌ Error creating/showing modal:', error);
        }
    }
    
    createAssetSelectionModal() {
        const modal = document.createElement('div');
        modal.className = 'ai-asset-selection-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <div class="header-left">
                        <h2>Summer Sale 2025</h2>
                        <div class="status-badges">
                            <span class="badge ai-generated">🤖 AI RECOMMENDED</span>
                            <span class="badge target-audience">🏖️ Beach Lifestyle</span>
                        </div>
                    </div>
                    <div class="header-right">
                        <button class="btn-back">← Back to Ideas</button>
                        <button class="modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                
                <div class="modal-body">
                    <div class="left-panel">
                        <div class="campaign-context-section">
                            <h3>CAMPAIGN CONTEXT</h3>
                            <div class="context-details">
                                <h4>Summer Sale 2025 - Beach Lifestyle Focus</h4>
                                <ul class="context-list">
                                    <li>• Target: Beach lifestyle enthusiasts, 25-40</li>
                                    <li>• Launch: June 15, 2025 (T-45 days)</li>
                                    <li>• Channels: Instagram, Email, Website</li>
                                    <li>• Mood: Energetic, fresh, summery</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="reasoning-section">
                            <h3>REASONING</h3>
                            <div class="reasoning-list">
                                <div class="reasoning-item">
                                    <span class="check-icon">✅</span>
                                    <span>Beach lifestyle imagery resonates 94% with target demographic</span>
                                </div>
                                <div class="reasoning-item">
                                    <span class="check-icon">✅</span>
                                    <span>Summer themes peak performance in June campaigns (+31% engagement)</span>
                                </div>
                                <div class="reasoning-item">
                                    <span class="check-icon">✅</span>
                                    <span>Historical performance: 2.3x better ROAS with these asset types</span>
                                </div>
                                <div class="reasoning-item">
                                    <span class="check-icon">✅</span>
                                    <span>Mobile-first design aligns with 78% mobile audience</span>
                                </div>
                                <div class="reasoning-item">
                                    <span class="check-icon">✅</span>
                                    <span>Optimal send time: Tuesday 10 AM EST based on engagement data</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="right-panel">
                        <div class="asset-header">
                            <div class="ai-recommended-badge">🤖 AI RECOMMENDED</div>
                            <h3>Beach Lifestyle Hero Image</h3>
                            <div class="asset-source">
                                <div class="source-info">
                                    <span class="source-icon">📁</span>
                                    <span>Source: Marketing DAM → Summer_Collections</span>
                                </div>
                                <div class="filename">
                                    <span class="file-icon">📄</span>
                                    <span>Filename: Beach_Lifestyle_Hero_2025_v2.jpg</span>
                                </div>
                                <a href="#" class="view-source">🔗 View Source →</a>
                            </div>
                        </div>
                        
                        <div class="performance-metrics">
                            <div class="metric-grid">
                                <div class="metric-item">
                                    <span class="metric-label">Match Score</span>
                                    <span class="metric-value highlight">96% Match</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-label">Past Performance</span>
                                    <span class="metric-value positive">+31%</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-label">Brand Compliance</span>
                                    <span class="metric-value excellent">98%</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-label">Predicted CTR</span>
                                    <span class="metric-value">4.7%</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="asset-preview">
                            <div class="preview-container">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZBNTAwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJlYWNoIExpZmVzdHlsZSBIZXJvPC90ZXh0Pgo8L3N2Zz4K" alt="Beach Lifestyle Hero" />
                                <div class="preview-caption">Retrieved from Marketing DAM</div>
                            </div>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn-primary btn-apply-package" data-action="apply-package">
                                ✅ Apply Complete Package
                            </button>
                            <button class="btn-secondary" data-action="view-alternatives">
                                🔄 View Alternatives
                            </button>
                            <button class="btn-tertiary" data-action="refine-suggestions">
                                ⚙️ Refine Suggestions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    generateDetailedRecommendations() {
        return this.assetRecommendations.map(asset => {
            if (asset.category === 'hero_image') {
                return this.generateHeroImageRecommendation(asset);
            } else if (asset.category === 'email_template') {
                return this.generateEmailTemplateRecommendation(asset);
            } else if (asset.category === 'social_content') {
                return this.generateSocialContentRecommendation(asset);
            }
        }).join('');
    }
    
    generateHeroImageRecommendation(asset) {
        return `
            <div class="recommendation-section">
                <div class="section-header">
                    <h3>Primary Hero Image</h3>
                    <div class="ai-confidence high">
                        <span class="confidence-score">${asset.confidence}%</span>
                        <span class="confidence-label">AI Confidence</span>
                    </div>
                </div>
                
                <div class="smart-asset-card recommended" data-asset-id="${asset.id}">
                    <div class="asset-preview">
                        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #FF6B35, #F7931E); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">Beach Lifestyle Hero</div>
                        <div class="preview-overlay">
                            <button class="btn-preview-large">
                                <i class="fas fa-expand"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="asset-intelligence">
                        <div class="asset-metadata">
                            <h4>${asset.title}</h4>
                            <div class="asset-tags">
                                ${asset.tags.map(tag => `<span class="tag ${this.getTagClass(tag)}">${tag}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="ai-reasoning">
                            ${asset.reasoning.map(reason => `
                                <div class="reasoning-item">
                                    <i class="fas fa-check" style="color: var(--accent-green)"></i>
                                    <span>${reason}</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="performance-predictions">
                            <div class="prediction-metric">
                                <div class="metric-label">Predicted CTR</div>
                                <div class="metric-value">
                                    <span class="value">${asset.performancePrediction.ctr}%</span>
                                    <span class="improvement">+${asset.performancePrediction.improvement}%</span>
                                </div>
                                <div class="metric-bar">
                                    <div class="bar-fill high" style="width: 85%"></div>
                                </div>
                            </div>
                            
                            <div class="prediction-metric">
                                <div class="metric-label">Engagement Score</div>
                                <div class="metric-value">
                                    <span class="value">${asset.performancePrediction.engagement}/10</span>
                                    <span class="improvement">Excellent</span>
                                </div>
                                <div class="metric-bar">
                                    <div class="bar-fill excellent" style="width: 89%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="asset-actions">
                            <button class="btn-use-asset primary">
                                <i class="fas fa-check-circle"></i>
                                Use This Asset
                            </button>
                            <button class="btn-see-alternatives secondary">
                                <i class="fas fa-layer-group"></i>
                                See 3 Alternatives
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateEmailTemplateRecommendation(asset) {
        return `
            <div class="recommendation-section">
                <div class="section-header">
                    <h3>Email Campaign Template</h3>
                    <div class="ai-confidence high">
                        <span class="confidence-score">${asset.confidence}%</span>
                        <span class="confidence-label">AI Confidence</span>
                    </div>
                </div>
                
                <div class="email-template-card" data-asset-id="${asset.id}">
                    <div class="email-preview-container">
                        <div class="email-header">
                            <div class="subject-line">
                                <strong>Subject:</strong> Summer's Hottest Deals Inside! ☀️
                                <div class="predicted-open-rate">${asset.performancePrediction.openRate}% open rate predicted</div>
                            </div>
                        </div>
                        <div class="email-body-preview">
                            <div class="hero-section">
                                <div class="hero-image-placeholder">🏖️ Beach lifestyle hero image</div>
                                <h2>Your Perfect Beach Day Starts Here</h2>
                            </div>
                            <div class="content-preview">
                                <p>Limited-time summer collection now 40% off...</p>
                                <button class="cta-preview">Shop Summer Sale</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="template-intelligence">
                        <div class="ai-optimization-factors">
                            ${asset.reasoning.map(reason => `
                                <div class="factor">
                                    <i class="fas fa-check"></i>
                                    <span>${reason}</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <button class="btn-use-template">
                            <i class="fas fa-envelope"></i>
                            Apply Email Template
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateSocialContentRecommendation(asset) {
        return `
            <div class="recommendation-section">
                <div class="section-header">
                    <h3>Social Media Content</h3>
                    <div class="ai-confidence high">
                        <span class="confidence-score">${asset.confidence}%</span>
                        <span class="confidence-label">AI Confidence</span>
                    </div>
                </div>
                
                <div class="smart-asset-card recommended" data-asset-id="${asset.id}">
                    <div class="asset-preview">
                        <div class="social-preview instagram">
                            <div class="post-image"></div>
                            <div class="post-caption">"Beach vibes incoming! 🌊 Summer sale starts now! ☀️ #summervibes #beachlife"</div>
                        </div>
                    </div>
                    
                    <div class="asset-intelligence">
                        <div class="asset-metadata">
                            <h4>${asset.title}</h4>
                            <div class="asset-tags">
                                ${asset.tags.map(tag => `<span class="tag ${this.getTagClass(tag)}">${tag}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="ai-reasoning">
                            ${asset.reasoning.map(reason => `
                                <div class="reasoning-item">
                                    <i class="fas fa-check" style="color: var(--accent-green)"></i>
                                    <span>${reason}</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="asset-actions">
                            <button class="btn-use-asset primary">
                                <i class="fas fa-check-circle"></i>
                                Use This Asset
                            </button>
                            <button class="btn-see-alternatives secondary">
                                <i class="fas fa-layer-group"></i>
                                See Variations
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getTagClass(tag) {
        const tagClasses = {
            'summer-2025': 'seasonal',
            'beach-enthusiasts': 'audience',
            'high-converting': 'performance',
            'email-marketing': 'seasonal',
            'mobile-optimized': 'performance',
            'seasonal': 'seasonal',
            'instagram': 'audience',
            'lifestyle': 'audience',
            'summer-vibes': 'seasonal'
        };
        
        return tagClasses[tag] || 'audience';
    }
    
    async applySelectedAsset(assetId) {
        console.log('🎯 Applying selected asset:', assetId);
        
        // Show processing state
        const assetCard = document.querySelector(`[data-asset-id="${assetId}"]`);
        const useBtn = assetCard.querySelector('.btn-use-asset');
        
        if (useBtn) {
            useBtn.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                Applying...
            `;
            useBtn.disabled = true;
        }
        
        // Simulate asset application
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success state
        if (useBtn) {
            useBtn.innerHTML = `
                <i class="fas fa-check"></i>
                Applied Successfully
            `;
            useBtn.style.background = 'var(--accent-green)';
        }
        
        // Close modal after short delay
        setTimeout(() => {
            document.querySelector('.ai-asset-selection-modal')?.remove();
        }, 1000);
    }
    
    async applyCompleteAssetPackage() {
        console.log('📦 Applying complete asset package...');
        
        const btn = document.querySelector('.btn-apply-all');
        if (btn) {
            btn.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                Applying Package...
                <span class="application-time">Processing...</span>
            `;
            btn.disabled = true;
        }
        
        // Simulate package application
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Show success and close modal
        this.showApplicationResults({
            totalAssets: 3,
            successRate: 100,
            avgConfidence: 94
        });
        
        document.querySelector('.ai-asset-selection-modal')?.remove();
    }
}

// DAM Smart Connector Class
class DAMSmartConnector {
    constructor() {
        this.damAPI = null; // Would connect to actual DAM system
        this.aiFilter = new AssetAIFilter();
        this.complianceChecker = new BrandComplianceChecker();
    }
    
    async findOptimalAssets(contextFactors) {
        // Simulate smart DAM query based on context
        console.log('🔍 Querying DAM with context factors:', contextFactors);
        
        // In real implementation, this would query the actual DAM system
        const mockAssets = this.generateMockDAMAssets(contextFactors);
        
        // AI filters and ranks assets based on context
        const filteredAssets = await this.aiFilter.filterByContext(mockAssets, contextFactors);
        const compliantAssets = await this.complianceChecker.validateCompliance(filteredAssets);
        
        return this.selectBestAssets(compliantAssets);
    }
    
    generateMockDAMAssets(contextFactors) {
        // Simulate DAM response based on context
        return [
            {
                id: 'beach-lifestyle-hero-v2',
                category: 'hero_image',
                keywords: ['beach', 'lifestyle', 'summer', 'authentic'],
                performance: { historicalCTR: 4.2, brandCompliance: 95 }
            },
            {
                id: 'summer-sale-email-v1',
                category: 'email_template',
                keywords: ['summer', 'sale', 'mobile', 'conversion'],
                performance: { historicalOpenRate: 29, brandCompliance: 92 }
            },
            {
                id: 'summer-ig-post-001',
                category: 'social_content',
                keywords: ['instagram', 'summer', 'lifestyle', 'engagement'],
                performance: { historicalEngagement: 2600, brandCompliance: 88 }
            }
        ];
    }
    
    selectBestAssets(assets) {
        // Return the highest-performing, most compliant asset per category
        return assets.filter((asset, index, self) =>
            index === self.findIndex(a => a.category === asset.category)
        );
    }
}

// Asset AI Filter Class
class AssetAIFilter {
    async filterByContext(assets, contextFactors) {
        // Simulate AI-powered asset filtering
        return assets.filter(asset => {
            const relevanceScore = this.calculateRelevanceScore(asset, contextFactors);
            return relevanceScore > 0.7; // 70% relevance threshold
        });
    }
    
    calculateRelevanceScore(asset, contextFactors) {
        // Simulate relevance calculation based on context
        let score = 0.5; // Base score
        
        // Audience alignment
        if (contextFactors.audience && asset.keywords) {
            const audienceKeywords = contextFactors.audience.psychographics || [];
            const overlap = asset.keywords.filter(keyword =>
                audienceKeywords.some(aud => keyword.includes(aud) || aud.includes(keyword))
            );
            score += (overlap.length / asset.keywords.length) * 0.3;
        }
        
        // Seasonal relevance
        if (contextFactors.seasonality) {
            const month = contextFactors.seasonality.getMonth();
            if (month >= 5 && month <= 7 && asset.keywords.includes('summer')) {
                score += 0.2;
            }
        }
        
        return Math.min(score, 1.0);
    }
}

// Brand Compliance Checker Class
class BrandComplianceChecker {
    async validateCompliance(assets) {
        // Simulate brand compliance validation
        return assets.filter(asset => {
            return asset.performance.brandCompliance > 85; // 85% compliance threshold
        });
    }
}

// Asset Performance Predictor Class
class AssetPerformancePredictor {
    async predictAssetPerformance(assets) {
        // Simulate performance prediction based on historical data and AI models
        return assets.map(asset => {
            const prediction = this.generatePerformancePrediction(asset);
            return {
                ...asset,
                performancePrediction: prediction
            };
        });
    }
    
    generatePerformancePrediction(asset) {
        // Simulate ML-based performance prediction
        const basePerformance = asset.performance || {};
        
        if (asset.category === 'hero_image') {
            return {
                ctr: (basePerformance.historicalCTR || 3.0) * 1.2, // 20% boost prediction
                improvement: 23,
                engagement: 8.9
            };
        } else if (asset.category === 'email_template') {
            return {
                openRate: (basePerformance.historicalOpenRate || 25) * 1.15, // 15% boost
                conversionRate: 4.2,
                engagement: 7.8
            };
        } else if (asset.category === 'social_content') {
            return {
                engagement: (basePerformance.historicalEngagement || 2000) * 1.1, // 10% boost
                reach: 15000,
                saves: 420
            };
        }
        
        return {};
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, checking for workspace tiles...');
    
    // Initialize AI Asset Intelligence if on appropriate page
    const creativeAreas = document.querySelector('.creative-areas');
    const workspaceTiles = document.querySelector('.workspace-tile');
    
    console.log('Creative areas found:', !!creativeAreas);
    console.log('Workspace tiles found:', !!workspaceTiles);
    
    if (creativeAreas || workspaceTiles) {
        console.log('🎯 Initializing AI Asset Intelligence...');
        try {
            window.aiAssetIntelligence = new AIAssetIntelligence();
            console.log('✅ AI Asset Intelligence successfully initialized');
        } catch (error) {
            console.error('❌ Error initializing AI Asset Intelligence:', error);
        }
    } else {
        console.log('⚠️ No workspace tiles found, skipping AI Asset Intelligence initialization');
    }
});

// Export for global access
window.AIAssetIntelligence = AIAssetIntelligence;