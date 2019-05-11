import React from "react"
import { Link, graphql } from "gatsby"
import { connect } from "react-redux"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { answer } from "../state/progressActions"
import isCardCorrect from "../utils/isCardCorrect"
import StatusBall from "../components/statusBall"

function CardsIndex(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const lessons = data.allMarkdownRemark.edges

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="All Cards"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />

      {lessons.map(({ node }) => {
        const num = node.fields.basename
        const title = `${num}. ` + node.frontmatter.title
        const id = node.frontmatter.id
        
        // DUPLICATING CODE HERE AND ON CARD CONTAINER. REFACTOR
        const isCorrect = isCardCorrect(id, props.answersById)

        return (
          <div key={node.fields.slug}>
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
      sort: { fields: [fields___basename], order: ASC }
      filter: { fields: { folder: { eq: "cards" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            basename
          }
          frontmatter {
            id
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
