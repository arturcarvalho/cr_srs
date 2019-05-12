import React from "react"

const TagFilter = ({ allTags, excludeTags, setExcludeTags }) => {
  const toggleAllTags = () => {
    if (excludeTags.length === 0) {
      setExcludeTags(allTags)
    } else {
      setExcludeTags([])
    }
  }
  const toggleTag = e => {
    const tag = e.target.value
    const tagIdx = excludeTags.indexOf(tag)
    if (tagIdx === -1) {
      // add tag
      setExcludeTags([...excludeTags, tag])
    } else {
      // remove tag
      setExcludeTags(excludeTags.filter(t => t !== tag))
    }
  }
  return (
    <>
      <b>Filter: </b>
      <button className="tag tag-all" onClick={toggleAllTags}>
        Show All
      </button>
      {allTags.map(tag => {
        const cls = excludeTags.includes(tag) ? "tag-off" : "tag-on"
        return (
          <button
            onClick={toggleTag}
            className={"tag " + cls}
            value={tag}
            key={tag}
          >
            {tag}
          </button>
        )
      })}
    </>
  )
}

export default TagFilter
