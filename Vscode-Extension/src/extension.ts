import * as vscode from "vscode";
import axios from "axios";

interface Issue {
  line: number;
  message: string;
}

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 CodeInsight Reviewer activated!");

  // Main command
  const disposable = vscode.commands.registerCommand("codeinsight.reviewCode", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("No active file to review!");
      return;
    }

    const document = editor.document;
    const code = document.getText();
    const filename = document.fileName;

    const config = vscode.workspace.getConfiguration("codeinsight");
    const backendUrl = config.get("backendUrl") as string || "http://localhost:5000/api/review";

    vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification, title: "CodeInsight: Reviewing your code..." },
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

        } catch (err: any) {
          vscode.window.showErrorMessage("Error fetching code review: " + (err.response?.data?.error || err.message));
        }
      }
    );
  });

  // Auto review on save
  const autoReview = vscode.workspace.onDidSaveTextDocument(async (doc) => {
    const config = vscode.workspace.getConfiguration("codeinsight");
    const autoReviewEnabled = config.get("autoReviewOnSave") as boolean;
    if (autoReviewEnabled && doc === vscode.window.activeTextEditor?.document) {
      vscode.commands.executeCommand("codeinsight.reviewCode");
    }
  });

  context.subscriptions.push(disposable, autoReview);
}

export function deactivate() {}

// Highlight problem lines
function showInlineComments(editor: vscode.TextEditor, issues: Issue[]) {
  const decorations: vscode.DecorationOptions[] = [];

  for (const issue of issues) {
    const line = issue.line - 1;
    if (line < 0 || line >= editor.document.lineCount) continue;

    const range = new vscode.Range(line, 0, line, editor.document.lineAt(line).range.end.character);
    decorations.push({ range, hoverMessage: `💡 ${issue.message}` });
  }

  const decorationType = vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    border: "1px solid rgba(255, 215, 0, 0.3)"
  });

  editor.setDecorations(decorationType, decorations);
}

// Webview content
function getSidebarHTML(review: string, issues: Issue[]): string {
  const issueList = issues && issues.length > 0
    ? issues.map(i => `<li>Line ${i.line}: ${i.message}</li>`).join("")
    : "<li>No issues found 🎉</li>";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: system-ui, sans-serif; color: #ddd; background: #1e1e1e; padding: 1rem; }
        h2 { color: #4FC3F7; }
        li { background: #252526; margin: 6px 0; padding: 8px; border-radius: 6px; }
        pre { background: #252526; padding: 10px; border-radius: 6px; white-space: pre-wrap; }
      </style>
    </head>
    <body>
      <h2>AI Review Summary</h2>
      <pre>${review}</pre>
      <h3>🔍 Issues Found</h3>
      <ul>${issueList}</ul>
    </body>
    </html>`;
}
