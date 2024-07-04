import stylex from "@stylexjs/stylex";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div {...stylex.props(styles.root)}>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});

const links = [
  {
    name: "LINKEDIN",
    url: "https://www.linkedin.com/in/ritik-khatri-673b62115/",
  },
  {
    name: "GITHUB",
    url: "https://github.com/RKRitik",
  },
  {
    name: "LEETCODE",
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
      <Link to="/">
        <img width={40} src={"./logo.svg"} alt="header-logo"></img>
      </Link>
      <SocialLinks />
      <Link to="/about" {...stylex.props(styles.a)}>
        About me
      </Link>
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#101014",
    padding: {
      default: "20px 200px",
      "@media (max-width: 852px)": "20px",
    },
    boxSizing: "border-box",
    color: "#F4F1D0",
    letterSpacing: "0.1em",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#F4F1D0",
    paddingBottom: 64,
  },
  links: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  a: {
    color: {
      default: "#9BA0B3",
      ":hover": "#F4F1D0",
    },
    textDecoration: "underline 0.15em rgba(255, 0, 0, 0)",
    transition: "text-decoration-color 300ms ease-in-out",
    ":hover": {
      textDecorationColor: "#F4F1D0",
    },
  },
});

