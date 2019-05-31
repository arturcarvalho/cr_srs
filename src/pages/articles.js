import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import union from "lodash.union"
import { connect } from "react-redux"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import TagFilter from "../components/tagFilter"
import StatusBall from "../components/statusBall/statusBall"
import showArticleStatus from "../utils/showArticleStatus"

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
        const id = node.fields.id

        const articleCards = data.cards.edges.filter(
          c => c.node.fields.articleId === id
        )

        const status = showArticleStatus(articleCards, props.cardsById)

        const tags = node.frontmatter.tags

        if (tags) {
          const areAllExcluded = tags.some(t => excludeTags.includes(t))
          if (areAllExcluded) return null
        }

        return (
          <section key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  <StatusBall status={status} />
                  {node.frontmatter.title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </section>
        )
      })}
    </Layout>
  )
}

const mapState = state => {
  return {
    cardsById: state.cards.cardsById,
  }
}

export default connect(mapState)(ArticlesIndex)

export const pageQuery = graphql`
  query ArticlesQuery {
    site {
      siteMetadata {
        title
      }
    }
    cards: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { type: { eq: "cards" } } }
    ) {
      edges {
        node {
          fields {
            id
            articleId
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { type: { eq: "articles" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
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
