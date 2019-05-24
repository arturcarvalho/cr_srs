import React from "react"
import { graphql } from "gatsby"
import { connect } from "react-redux"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Progress from "../components/progress"
import { resetProgress } from "../store/cardsActions"

function Index(props) {
  const { data } = props

  const siteTitle = data.site.siteMetadata.title
  const cards = data.allMarkdownRemark.edges.map(el => el.node.frontmatter.id)
  let correctCardsCount = Object.keys(props.cardsById).length

  const progressArgs = {
    totalCards: cards.length,
    correctCardsCount,
    resetProgress: props.resetProgress,
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="All cards" keywords={[`javascript`, `react`]} />

      <section className="home">
        <section className="home-left">
          <h1>What is this?</h1>
          <p>
            A site with tech <b>articles</b>, each with <b>exercises</b> that
            are <b>tracked</b>.
          </p>
        </section>
        <section className="home-right">
          <h2>
            <i>
              TODO <br />
              BONUS TRAINING
            </i>
          </h2>
        </section>
      </section>
      <Progress {...progressArgs} />
    </Layout>
  )
}

const mapState = state => {
  return {
    cardsById: state.cards.cardsById,
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
    allMarkdownRemark(filter: { fields: { type: { eq: "cards" } } }) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`
