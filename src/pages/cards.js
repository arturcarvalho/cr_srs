import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { connect } from "react-redux"
import union from "lodash.union"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { answer } from "../store/progressActions"
import isCardCorrect from "../utils/isCardCorrect"
import StatusBall from "../components/statusBall"
import TagFilter from "../components/tagFilter"

function CardsIndex(props) {
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
        title="All Cards"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />

      <TagFilter {...{ allTags, excludeTags, setExcludeTags }} />

      {articles.map(({ node }) => {
        const num = node.fields.id
        const title = `${num}. ` + node.frontmatter.title
        // const id = node.frontmatter.id
        const tags = node.frontmatter.tags

        if (tags) {
          const areAllExcluded = tags.some(t => excludeTags.includes(t))
          if (areAllExcluded) return null
        }

        // DUPLICATING CODE HERE AND ON CARD CONTAINER. REFACTOR
        const isCorrect = false; //isCardCorrect(id, props.answersById)

        return (
          <div className="cards-item" key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                <StatusBall isCorrect={isCorrect} />
                {title}
              </Link>
            </h3>
          </div>
        )
      })}
    </Layout>
  )
}

const mapState = state => {
  return {
    answersById: state.progress.answersById,
  }
}

export default connect(
  mapState,
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
      sort: { fields: [fields___id], order: ASC }
      filter: { fields: { type: { eq: "cards" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            id
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
