export function AppFooter() {
  const currentYear = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <span className="text-white text-[10px] font-bold font-display">
              S
            </span>
          </div>
          <span className="text-sm font-medium text-foreground font-display">
            Suggestify
          </span>
          <span className="text-xs text-muted-foreground">
            — Smart Campus Feedback
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {currentYear}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
