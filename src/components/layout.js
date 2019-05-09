import React from "react"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

function Layout(props) {
  const { title, children } = props
  // const rootPath = `${__PATH_PREFIX__}/`
  let header = (
    <h3
      style={{
        fontFamily: `Montserrat, sans-serif`,
        marginTop: 0,
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </h3>
  )

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <Link to={"/"}>Home</Link>
      &nbsp;&nbsp;&nbsp;
      <Link to={"/lessons"}>Lessons</Link>
      &nbsp;&nbsp;&nbsp;
      <Link to={"/cards"}>Training</Link>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
