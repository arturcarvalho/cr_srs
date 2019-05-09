import React from "react"
import { StaticQuery, Link } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

function Menu(props) {
  const { title } = props
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
                to={"/lessons"}
              >
                Lessons
              </Link>
              <Link
                activeClassName="active-menu-item"
                className="menu-nav-item"
                to={"/cards"}
              >
                Training
              </Link>
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
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Menu
