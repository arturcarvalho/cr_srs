import React from "react"
import { Link, graphql } from "gatsby"
import { connect } from "react-redux"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { answer } from "../store/progressActions"

function CardsIndex(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const articles = data.allMarkdownRemark.edges

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="All Cards"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />

      {articles.map(({ node }) => {
        const title = `${node.fields.articleId}. ${node.frontmatter.title}`

        return (
          <div className="cards-item" key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
          </div>
        )
      })}
    </Layout>
  )
}


export default connect(
  null,
  { answer }
)(CardsIndex)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [fields___order], order: ASC }
      filter: { fields: { type: { eq: "cards" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            order
            slug
            cardId
            articleId
          }
          frontmatter {
            tags
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
