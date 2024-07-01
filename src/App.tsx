import * as stylex from "@stylexjs/stylex";

const links = [
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/ritik-khatri-673b62115/",
  },
  {
    name: "Github",
    url: "https://github.com/RKRitik",
  },
  {
    name: "Leetcode",
    url: "https://leetcode.com/u/KhatriRitik/",
  },
] as const;

function SocialLinks() {
  return (
    <ul {...stylex.props(styles.links)}>
      {links.map((link) => (
        <a key={link.name} href={link.url} {...stylex.props(styles.a)}>
          {link.name}
        </a>
      ))}
    </ul>
  );
}

function Header() {
  return (
    <div {...stylex.props(styles.header)}>
      <img width={40} src={"./logo.svg"} alt="header-logo"></img>
      <SocialLinks />
      <div>About Me</div>
    </div>
  );
}

function App() {
  //https://lawsofux.com
  return (
    <div {...stylex.props(styles.root)}>
      <Header />
      {/* <AllComponents /> */}
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#101014",
    padding: "20px 200px",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#F4F1D0",
  },
  links: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  a: {
    color: "#F4F1D0",
    textDecoration: "none",
  },
});

export default App;

