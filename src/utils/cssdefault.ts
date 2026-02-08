
type hh=Record<string,string>
export let cssdefalult :Record<string,
hh>={
div: {
  /* SIZE */
  width: "100px",
 height:"100px",
  padding: "20px",

  /* BACKGROUND */
  backgroundColor: "#ffffff",
  backgroundImage: "none",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",

  /* BORDER */
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "16px",
  outline: "none",

  /* SHADOW */
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",

  /* TEXT */
  color: "#0f172a",
  fontFamily: "system-ui, sans-serif",
  fontSize: "15px",
  fontWeight: "400",
  lineHeight: "1.6",
  letterSpacing: "0.2px",
  textAlign: "left",
  whiteSpace: "normal",

  /* LAYOUT */
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "flex-start",
  justifyContent: "flex-start",

  /* EFFECTS */
  opacity: "1",
  transform: "none",
  transition: "all 0.25s ease",
position: "relative", // needed for zIndex to work
  zIndex: "10",
  /* BEHAVIOR */
  overflow: "hidden",
  cursor: "default",
}
,
button: {
  width: "160px",
  height: "48px",

  padding: "10px 18px",

  backgroundImage: "url('https://example.com/button-bg.png')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",

  backgroundColor: "#2563eb",
  color: "#ffffff",

  border: "1px solid transparent",
  borderRadius: "10px",
  outline: "none",

  fontFamily: "system-ui, sans-serif",
  fontSize: "15px",
  fontWeight: "600",
  lineHeight: "1.2",
  letterSpacing: "0.4px",
  textAlign: "center",
  textDecoration: "none",
  textTransform: "none",
  whiteSpace: "nowrap",

  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
  opacity: "1",

  transition: "all 0.3s ease",
  transform: "none",
  position: "relative", // needed for zIndex to work
  zIndex: "10",
}




}

 export type eleent= keyof typeof cssdefalult 