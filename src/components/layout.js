import React from "react"

import { rhythm } from "../utils/typography"
import Menu from "../components/menu"

function Layout(props) {
  const { title, children } = props
  // const rootPath = `${__PATH_PREFIX__}/`

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `0 ${rhythm(3 / 4)} ${rhythm(1)} ${rhythm(3 / 4)}`,
      }}
    >
      <Menu title={title} />

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
