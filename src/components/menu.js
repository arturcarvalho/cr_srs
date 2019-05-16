import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

function Menu({ title }) {
  return (
    <StaticQuery
      query={menuQuery}
      render={data => {
        return (
          <header className="menu">
            <nav className="menu-nav">
              <Link className="menu-nav-title" to={`/`}>
                <Image
                  fixed={data.avatar.childImageSharp.fixed}
                  alt={"logo"}
                  style={{
                    marginRight: rhythm(1 / 5),
                    marginTop: 0,
                    marginBottom: 0,
                    maxWidth: 40,
                    maxHeight: 40,
                  }}
                />
                <span>{title}</span>
              </Link>

              <Link
                activeClassName="active-menu-item"
                className="menu-nav-item"
                to={"/articles"}
              >
                Articles
              </Link>
              {/* <Link
                activeClassName="active-menu-item"
                className="menu-nav-item"
                to={"/cards"}
              >
                Cards
              </Link> */}
            </nav>
          </header>
        )
      }}
    />
  )
}

const menuQuery = graphql`
  query menuQuery {
    avatar: file(absolutePath: { regex: "assets/indy-icon.png/" }) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Menu
