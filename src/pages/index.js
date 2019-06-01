import React from "react"
import { graphql } from "gatsby"
import { connect } from "react-redux"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Progress from "../components/progress"
import BonusTraining from "../components/bonusTraining"
import { resetProgress } from "../store/cardsActions"
import { getCorrectCardsCount, getCardsToReview } from "../store/rootReducer"

function Index(props) {
  const { data, correctCardsCount, cardsToReview } = props

  const siteTitle = data.site.siteMetadata.title
  const cards = data.allMarkdownRemark.edges.map(el => el.node.frontmatter.id)

  const progressArgs = {
    totalCards: cards.length,
    correctCardsCount,
    resetProgress: props.resetProgress,
    points: props.points
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
          <h1>Bonus Training</h1>
          <BonusTraining cardsToReview={cardsToReview} />
        </section>
      </section>
      <Progress {...progressArgs} />
    </Layout>
  )
}

const mapState = state => {
  return {
    correctCardsCount: getCorrectCardsCount(state),
    cardsToReview: getCardsToReview(state),
    points: state.cards.points,
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
