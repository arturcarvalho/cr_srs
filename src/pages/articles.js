import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

function ArticlesIndex(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const articles = data.allMarkdownRemark.edges

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="All Articles"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />

      {articles.map(({ node }) => {
        const num = node.fields.basename
        const title = `${num}. ` + node.frontmatter.title

        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

export default ArticlesIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [fields___basename], order: ASC }
      filter: { fields: { folder: { eq: "articles" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            basename
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
