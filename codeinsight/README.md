# 🧠 CodeInsight VS Code Extension

[![Version](https://img.shields.io/visual-studio-marketplace/v/shanidhya.codeinsight)](https://marketplace.visualstudio.com/items?itemName=shanidhya.codeinsight)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/shanidhya.codeinsight)](https://marketplace.visualstudio.com/items?itemName=shanidhya.codeinsight)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/shanidhya.codeinsight)](https://marketplace.visualstudio.com/items?itemName=shanidhya.codeinsight)

AI-powered code review directly in your VS Code editor. Get instant feedback, suggestions, and best practices for your code without leaving your development environment.

## ✨ Features

- **🤖 AI-Powered Analysis**: Advanced code review using state-of-the-art language models
- **⚡ Instant Feedback**: Real-time analysis with improvement suggestions
- **🔍 Multi-Language Support**: Works with JavaScript, Python, Java, C++, and more
- **📝 Detailed Reports**: Comprehensive feedback with explanations and best practices
- **🎯 Context-Aware**: Understands your code's purpose and provides relevant suggestions
- **🔒 Secure**: Your code is processed securely without permanent storage

## 🚀 Quick Start

1. **Install the Extension**
   - Open VS Code
   - Go to Extensions (`Ctrl+Shift+X`)
   - Search for "CodeInsight"
   - Click Install

2. **Start Reviewing Code**
   - Select code in your editor
   - Right-click and choose "Review with CodeInsight"
   - Or use the command palette (`Ctrl+Shift+P`) and search "CodeInsight: Review Selected Code"

3. **View Results**
   - Review appears in a new panel
   - Get suggestions for improvements
   - Learn best practices and coding standards

## 📋 Commands

| Command | Description | Shortcut |
|---------|-------------|----------|
| `CodeInsight: Review Selected Code` | Analyze selected code | `Ctrl+Shift+R` |
| `CodeInsight: Review Current File` | Analyze the entire current file | `Ctrl+Alt+R` |
| `CodeInsight: Open Settings` | Configure extension settings | - |

## ⚙️ Configuration

Configure CodeInsight through VS Code settings:

```json
{
  "codeinsight.apiUrl": "https://your-api-endpoint.com",
  "codeinsight.autoReview": false,
  "codeinsight.showInlineHints": true,
  "codeinsight.reviewOnSave": false
}
```

### Available Settings

- **`codeinsight.apiUrl`**: Custom API endpoint for CodeInsight service
- **`codeinsight.autoReview`**: Automatically review code as you type
- **`codeinsight.showInlineHints`**: Show inline suggestions in editor
- **`codeinsight.reviewOnSave`**: Trigger review when saving files

## 🔧 Requirements

- **VS Code**: Version 1.80.0 or higher
- **Internet Connection**: Required for AI analysis
- **Supported Languages**: JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP, and more

## 📖 How It Works

1. **Code Selection**: Select the code you want to review or use the entire file
2. **AI Analysis**: Your code is sent to our secure AI service for analysis
3. **Smart Review**: Advanced language models analyze your code for:
   - Syntax errors and potential bugs
   - Performance optimizations
   - Security vulnerabilities
   - Code quality and maintainability
   - Best practices and conventions
4. **Actionable Feedback**: Receive detailed suggestions with explanations

## 🌟 Use Cases

### For Individual Developers
- **Code Quality**: Improve code quality before commits
- **Learning**: Learn best practices and new techniques
- **Debugging**: Identify potential issues early
- **Performance**: Optimize code for better performance

### For Teams
- **Code Reviews**: Streamline the review process
- **Standards**: Maintain consistent coding standards
- **Mentoring**: Help junior developers learn
- **Quality Assurance**: Catch issues before production

## 🔒 Privacy & Security

- **No Permanent Storage**: Code is not stored after analysis
- **Secure Transmission**: All data is encrypted in transit
- **Anonymous Processing**: No personal information is collected
- **GDPR Compliant**: Follows data protection regulations

## 🐛 Troubleshooting

### Extension Not Working?

1. **Check Internet Connection**: Ensure you have a stable internet connection
2. **Restart VS Code**: Sometimes a restart resolves issues
3. **Check Settings**: Verify your configuration settings
4. **Update Extension**: Make sure you have the latest version

### Common Issues

**Issue**: "No code selected"
**Solution**: Select code in the editor before running the command

**Issue**: "API connection failed"
**Solution**: Check your internet connection and API settings

**Issue**: "Analysis timeout"
**Solution**: Try with smaller code selections

## 📝 Changelog

### v1.0.0
- ✨ Initial release
- 🤖 AI-powered code analysis
- 📝 Detailed feedback reports
- 🔧 Configurable settings

### v1.0.1
- 🐛 Bug fixes and performance improvements
- 🔧 Enhanced error handling
- 📖 Updated documentation

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, and pull requests.

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Open in VS Code
4. Press F5 to run in Extension Development Host

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **🌐 Website**: [CodeInsight Official](https://codeinsight.dev)
- **📖 Documentation**: [Full Documentation](https://docs.codeinsight.dev)
- **🐛 Issues**: [Report Issues](https://github.com/Shanidhya01/codeinsight/issues)
- **💬 Support**: [Get Support](mailto:support@codeinsight.dev)

## 🙏 Acknowledgments

- Thanks to the VS Code team for the excellent extension APIs
- Powered by advanced AI language models
- Built with ❤️ by [Shanidhya Kumar](https://github.com/Shanidhya01)

---

**Made with 💙 by [Shanidhya Kumar](https://github.com/Shanidhya01)**

*Happy Coding! 🚀*
