# Marketing SuperAgent v4 - Claude Code Instructions

## Overview

Marketing SuperAgent v4 is an AI-native marketing platform that provides a comprehensive suite of tools for campaign creation, asset generation, and marketing automation. The application features a two-panel interface with specialized AI agents for different marketing functions.

**Tagline**: "One SuperAgent. Every Task. Marketing Made AI-Native."

## Quick Start

### Running the Application
```bash
# Open the application
open index.html
# OR serve locally
python -m http.server 8000
# OR with Node.js
npx serve .
```

### No Build Process Required
This is a vanilla HTML/CSS/JavaScript application with no build step needed. Simply open `index.html` in a browser to run the application.

## Architecture

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, ES6+ JavaScript
- **Styling**: CSS Grid, Flexbox, custom CSS variables
- **Typography**: Figtree font family
- **Icons**: Font Awesome 6.0
- **Architecture**: Component-based JavaScript classes
- **State Management**: Object-based state within class instances

### Core Components

#### Main Application (`js/app.js`)
- **Class**: `MarketingSuperAgentV4`
- **Purpose**: Main application controller and routing
- **Key Features**:
  - Two-panel interface management
  - Message history and storage
  - Autopilot task system
  - Universal navigation routing
  - Creative suite integration

#### Brief to Assets Chat (`js/components/BriefToAssetsChat.js`)
- **Class**: `BriefToAssetsChat`
- **Purpose**: AI-powered conversational interface for creative brief creation
- **Key Features**:
  - Campaign-aware conversations
  - Multi-agent AI specialists (Strategy, Creative, Copy, Design)
  - Smart suggestions and contextual help
  - Progress tracking and thread management

### File Structure
```
/
├── index.html              # Main application entry point
├── css/
│   ├── styles.css         # Main application styles (Adobe-inspired design system)
│   └── chat-interface.css # Chat component-specific styles
├── js/
│   ├── app.js            # Main application class (MarketingSuperAgentV4)
│   └── components/
│       └── BriefToAssetsChat.js  # Chat interface component
├── notes/                 # Development documentation
├── changelog.md          # Implementation history
└── README.md            # Basic project documentation
```

## Design System

### Color Palette
```css
--primary-bg: #fafafa;        /* Main background */
--card-bg: #ffffff;           /* Card backgrounds */
--border-color: #e1e5e9;      /* Standard borders */
--text-primary: #2c2c2c;      /* Primary text */
--text-secondary: #6e6e6e;    /* Secondary text */
--accent-primary: #1957db;    /* Primary brand accent */
--accent-secondary: #4475e6;  /* Secondary brand accent */
--accent-red: #e34850;        /* Error/destructive actions */
--accent-green: #2d9d78;      /* Success/positive actions */
--accent-orange: #e68619;     /* Warning/attention */
--accent-purple: #9256d9;     /* Special features */
```

### Typography Scale
```css
--font-xs: 12px;    /* Labels, metadata */
--font-sm: 13px;    /* Small text */
--font-base: 14px;  /* Body text */
--font-lg: 16px;    /* Large body text */
--font-xl: 20px;    /* Subheadings */
--h1: 28px;         /* Main headings */
--h2: 20px;         /* Section headings */
--h3: 16px;         /* Subsection headings */
```

## Key Features

### 1. AI Agent System
- **Strategy Agent**: Campaign planning and market analysis
- **Creative Agent**: Visual design and creative direction
- **Copy Agent**: Messaging and content creation
- **Design Agent**: Asset production and brand consistency
- **Performance Agent**: Analytics and optimization
- **Audience Agent**: Targeting and segmentation

### 2. Two-Panel Interface
- **Left Panel**: Navigation, agent status, and conversation history
- **Right Panel**: Main working interface (chat, forms, outputs)
- **Responsive Design**: Collapses to single panel on mobile

### 3. Campaign Management
- **Campaign Context**: Persistent campaign awareness across all interactions
- **Progress Tracking**: Visual indicators for campaign completion stages
- **Thread Management**: Multiple conversation threads per campaign

### 4. Autopilot System
- **Task Templates**: Pre-configured marketing task workflows
- **Automated Execution**: AI-driven task completion
- **Progress Monitoring**: Real-time status updates

## Development Guidelines

### Code Style
- Use ES6+ class-based components
- Follow Adobe-inspired design patterns
- Implement responsive-first CSS
- Use semantic HTML structure
- Maintain component modularity

### Adding New Features
1. **Create Component**: Add new JavaScript class in `js/components/`
2. **Add Styles**: Extend `css/styles.css` or create component-specific CSS
3. **Update Main App**: Integrate component into `MarketingSuperAgentV4` class
4. **Test Integration**: Ensure proper navigation and state management

### State Management
- Use object-based state within class instances
- Implement localStorage for persistence
- Maintain campaign context across components
- Handle agent status and conversation history

### Responsive Design
- **Mobile First**: Base styles for mobile devices
- **Tablet**: 768px+ breakpoint adjustments
- **Desktop**: 1024px+ optimizations
- **Touch**: Touch-friendly interaction targets

## Integration Points

### Creative Suite Integration
- **Entry Point**: Creative Suite "Brief to Assets" button launches chat interface
- **Navigation**: Seamless transitions between suite and chat
- **Context Preservation**: Campaign data persists across interfaces

### Agent Communication
```javascript
// Agent activation pattern
this.activeAgents = ['strategy', 'creative', 'copy', 'design'];

// Agent status management
this.agentStatus = {
    strategy: { active: true, confidence: 0.85 },
    creative: { active: true, confidence: 0.78 }
};
```

### Message Handling
```javascript
// Message structure
const message = {
    id: generateId(),
    content: userInput,
    sender: 'user',
    timestamp: new Date(),
    campaign: this.selectedCampaign
};
```

## Testing

### Manual Testing Checklist
- [ ] Application loads without errors
- [ ] Navigation between screens works
- [ ] Chat interface launches from Creative Suite
- [ ] Message sending and receiving functions
- [ ] Campaign switching preserves context
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Agent status indicators update correctly

### Browser Compatibility
- **Chrome**: Full support (primary development browser)
- **Safari**: Full support with webkit prefixes
- **Firefox**: Full support
- **Edge**: Modern Edge full support

## Deployment

### Local Development
1. Clone repository
2. Open `index.html` in browser
3. Use browser developer tools for debugging

### Production Deployment
1. Upload all files to web server
2. Ensure proper MIME types for JavaScript/CSS
3. Configure HTTPS if using external APIs
4. Test all functionality in production environment

## Troubleshooting

### Common Issues
1. **JavaScript not loading**: Check script paths in `index.html`
2. **CSS not applying**: Verify CSS file paths and browser cache
3. **Chat not launching**: Check browser console for JavaScript errors
4. **Responsive issues**: Test viewport meta tag and CSS media queries

### Debug Mode
- Open browser developer console
- Check for JavaScript errors
- Use `console.log()` statements in components
- Verify localStorage for persistence issues

## Recent Changes

- Always append changes to the codebase to the changelog.md

### Latest Implementation (2025-10-05)
- **Added**: Brief to Assets Chat Interface with AI agent support
- **Enhanced**: Campaign-aware conversations and progress tracking
- **Improved**: Mobile responsiveness and touch interactions
- **Fixed**: Navigation between Creative Suite and chat interface

See `changelog.md` for detailed implementation history.

## Future Roadmap

### Planned Enhancements
1. **Real AI Integration**: Connect to actual AI services for responses
2. **Advanced Analytics**: Performance tracking and campaign metrics
3. **Asset Management**: Direct integration with creative asset libraries
4. **Collaboration**: Multi-user support and team features
5. **API Integration**: Connect with marketing platforms and tools

### Migration Considerations
- **React Migration**: Framework upgrade for enhanced component architecture
- **TypeScript**: Type safety and improved developer experience
- **State Management**: Redux or Context API for complex state
- **Testing Framework**: Jest and React Testing Library integration

---

*This documentation is maintained for Claude Code instances working on the Marketing SuperAgent v4 codebase. Update as features are added or modified.*