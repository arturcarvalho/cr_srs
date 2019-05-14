import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import union from "lodash.union"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import TagFilter from "../components/tagFilter"

function ArticlesIndex(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const articles = data.allMarkdownRemark.edges

  let allTags = []
  articles.forEach(({ node }) => {
    allTags = union(allTags, node.frontmatter.tags)
  })

  const [excludeTags, setExcludeTags] = useState([])

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="All Articles"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />

      <TagFilter {...{ allTags, excludeTags, setExcludeTags }} />

      {articles.map(({ node }) => {
        const num = node.fields.id
        const title = `${num}. ` + node.frontmatter.title

        const tags = node.frontmatter.tags

        if (tags) {
          const areAllExcluded = tags.some(t => excludeTags.includes(t))
          if (areAllExcluded) return null
        }

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
      sort: { fields: [fields___order], order: ASC }
      filter: { fields: { type: { eq: "articles" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            order
            id
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
