export const decodeBase64 = (str: string): string =>
  decodeURIComponent(
    escape(
      window.atob(
        str
          .replace(/-/g, "+")
          .replace(/_/g, "/")
          .replace(/,/g, "=")
      )
    )
  );
