export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Powered by{' '}
            <span className="text-foreground/70 font-medium">CARIA Research</span>
            {' — '}Scopus 2024, SUT
          </p>
          <p className="text-xs text-muted-foreground">
            © {year} CARIA-GAP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
