export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 px-4 md:h-24 md:flex-row md:py-0 md:px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <p className="text-center text-xs sm:text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Sogrub. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
