const vscode = require('vscode');
const axios = require('axios');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("🚀 CodeInsight Reviewer activated!");

  // Main command
  const disposable = vscode.commands.registerCommand("codeinsight.codeinsight", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("No active file to review!");
      return;
    }

    const document = editor.document;
    const code = document.getText();
    const filename = document.fileName;

    const config = vscode.workspace.getConfiguration("codeinsight");
    const backendUrl =
      config.get("backendUrl") || "http://localhost:5000/api/review";

    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "CodeInsight: Reviewing your code...",
      },
      async () => {
        try {
          const response = await axios.post(backendUrl, { filename, code });
          const { review, issues } = response.data;

          // Sidebar with full review
          const panel = vscode.window.createWebviewPanel(
            "codeInsightSidebar",
            "CodeInsight Review",
            vscode.ViewColumn.Beside,
            {}
          );
          panel.webview.html = getSidebarHTML(review, issues);

          // Inline issues
          if (issues && issues.length > 0) {
            showInlineComments(editor, issues);
          } else {
            vscode.window.showInformationMessage("✅ No issues found!");
          }
        } catch (err) {
          vscode.window.showErrorMessage(
            "Error fetching code review: " +
              (err.message)
          );
        }
      }
    );
  });

  // Auto review on save
  const autoReview = vscode.workspace.onDidSaveTextDocument(async (doc) => {
    const config = vscode.workspace.getConfiguration("codeinsight");
    const autoReviewEnabled = config.get("autoReviewOnSave");
    if (
      autoReviewEnabled &&
      doc === vscode.window.activeTextEditor?.document
    ) {
      vscode.commands.executeCommand("codeinsight.reviewCode");
    }
  });

  context.subscriptions.push(disposable, autoReview);
}

function deactivate() {}

// Highlight problem lines
function showInlineComments(editor, issues) {
  const decorations = [];

  for (const issue of issues) {
    const line = issue.line - 1;
    if (line < 0 || line >= editor.document.lineCount) continue;

    const range = new vscode.Range(
      line,
      0,
      line,
      editor.document.lineAt(line).range.end.character
    );
    decorations.push({ range, hoverMessage: `💡 ${issue.message}` });
  }

  const decorationType = vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    border: "1px solid rgba(255, 215, 0, 0.3)",
  });

  editor.setDecorations(decorationType, decorations);
}

// Webview content
function getSidebarHTML(review, issues) {
  const issueList =
    issues && issues.length > 0
      ? issues.map((i) => `<li>Line ${i.line}: ${i.message}</li>`).join("")
      : "<li>No issues found 🎉</li>";

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>AI Code Review</title>
    <style>
      body {
        font-family: 'Segoe UI', system-ui, sans-serif;
        color: #ddd;
        background: #1e1e1e;
        padding: 1.5rem;
        line-height: 1.6;
      }

      h1 {
        color: #4FC3F7;
        margin-bottom: 1rem;
        font-size: 1.6rem;
      }

      h2 {
        color: #81D4FA;
        margin-top: 1.2rem;
        margin-bottom: 0.4rem;
        cursor: pointer;
        user-select: none;
      }

      h2::after {
        content: ' ▼';
        font-size: 0.8rem;
        color: #aaa;
      }

      .collapsed h2::after {
        content: ' ▶';
      }

      .section {
        background: #252526;
        border-radius: 10px;
        margin-bottom: 1rem;
        padding: 1rem;
        transition: all 0.3s ease;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
      }

      .section-content {
        margin-top: 0.5rem;
        display: block;
      }

      .collapsed .section-content {
        display: none;
      }

      pre, code {
        background: #2d2d2d;
        border-radius: 6px;
        color: #81D4FA;
        padding: 8px;
        overflow-x: auto;
        font-family: monospace;
      }

      ul {
        list-style-type: none;
        padding-left: 0;
      }

      li {
        background: #2d2d2d;
        margin: 6px 0;
        padding: 8px;
        border-radius: 6px;
      }

      hr {
        border: none;
        border-top: 1px solid #333;
        margin: 20px 0;
      }

      .footer {
        margin-top: 2rem;
        color: #777;
        font-size: 0.9rem;
        text-align: center;
      }

      blockquote {
        border-left: 4px solid #4FC3F7;
        padding-left: 10px;
        color: #aaa;
        margin: 10px 0;
      }

      a {
        color: #4FC3F7;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h1>🚀 CodeInsight — AI Review</h1>

    <div class="section">
      <h2 onclick="toggleSection(this)">💡 Summary</h2>
      <div class="section-content" id="review-content"></div>
    </div>

    <div class="section">
      <h2 onclick="toggleSection(this)">🔍 Issues Found</h2>
      <div class="section-content">
        <ul>${issueList}</ul>
      </div>
    </div>

    <hr>
    <div class="footer">⚙️ Powered by CodeInsight • Built with ❤️</div>

    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
      const markdown = \`${review.replace(/`/g, "\\`")}\`;
      const html = marked.parse(markdown);
      document.getElementById("review-content").innerHTML = html;

      function toggleSection(el) {
        const section = el.parentElement;
        section.classList.toggle("collapsed");
      }
    </script>
  </body>
  </html>`;
}


module.exports = {
  activate,
  deactivate,
};
