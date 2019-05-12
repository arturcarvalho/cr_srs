import React from "react"
import { graphql } from "gatsby"
import { connect } from "react-redux"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Progress from "../components/progress"
import { resetProgress } from "../store/progressActions"

function Index(props) {
  const { data } = props

  const siteTitle = data.site.siteMetadata.title
  const cards = data.allMarkdownRemark.edges.map(el => el.node.frontmatter.id)
  let correctCardsCount = 0
  Object.keys(props.answersById).forEach(c => {
    if (props.answersById[c].correct) correctCardsCount++
  })

  const progressArgs = {
    totalCards: cards.length,
    correctCardsCount,
    resetProgress: props.resetProgress,
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="All cards" keywords={[`javascript`, `react`]} />

      <h2>What is this?</h2>
      <p>Let me tell you!</p>
      
      <Progress {...progressArgs} />
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
  { resetProgress }
)(Index)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fields: { folder: { eq: "cards" } } }) {
      edges {
        node {
          frontmatter {
            id
          }
        }
      }
    }
  }
`
