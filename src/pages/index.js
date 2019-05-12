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

      <br />
      <br />
      <br />

      <blockquote>
        Do you ever get stuck while coding? Do you google the solution?
      </blockquote>

      <p>
        I do that all the time. But I want to avoid these interruptions.
        <br />
        So I built this
        <b>
          {" "}
          lessons + exercises + <a href="https://sivers.org/srs>">SRS</a>{" "}
        </b>
        (not yet) site.
      </p>

      <h3>Why?</h3>

      <ul>
        <li>If you remember stuff, you avoid the googling interruptions.</li>
        <li>
          Questions makes you think in a different angle about the topic. way.
        </li>

        <li>
          You can <i>toilet learn</i> on your phone.
        </li>
      </ul>

      <p>TL;DR deeper learning, without forgetting. </p>
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
