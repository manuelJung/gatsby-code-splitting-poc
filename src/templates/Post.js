import * as React from 'react'
import { graphql, Link } from "gatsby"

export default function Post (props) {
  return (
    <div className='Post'>
      <div><Link to='/'>homepage</Link></div>

      {/* map over post widgets and render with given props */}
      {props.data.post.widgets.map(widget => {
        const Widget = props.widgets[widget.name]
        if(!Widget) return <p>widget {widget.name} not found</p>
        return <Widget {...widget.props}/>
      })}
    </div>
  )
}

export const query = graphql`
  query Post($slug: String!) {
    post:postsJson(slug:{eq:$slug}) {
      widgets
    }
  }
`