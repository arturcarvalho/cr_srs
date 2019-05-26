import React from "react"
import { Link, graphql } from "gatsby"
import { connect } from "react-redux"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { answerInArticle } from "../store/cardsActions"

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
        return (
          <div className="cards-item" key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {node.frontmatter.title}
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
  { answerInArticle }
)(CardsIndex)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { type: { eq: "cards" } } }
    ) {
      edges {
        node {
          fields {
            slug
            cardId
            articleId
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
