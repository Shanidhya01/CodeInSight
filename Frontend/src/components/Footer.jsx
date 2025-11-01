export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-xl text-center py-2 border-t border-gray-700">
      <p>
        © {new Date().getFullYear()} <span className="text-indigo-400 font-semibold">CodeInsight</span> — Built with 💙 by Shanidhya Kumar
      </p>
    </footer>
  );
}
