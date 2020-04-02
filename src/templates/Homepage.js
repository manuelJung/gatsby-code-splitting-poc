import * as React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'

export default function Homepage ({widgets}) {
  // console.log(widgets)
  return (
    <Wrapper className='Homepage'>
      <h1>Gatsby Code-Splitting POC</h1>
      <p>
        Welcome to the gatsby code splitting POC. Here I will describe a
        way how we could code-split dynamic react components. Normally gatsby
        splits code by pages. That is fine for most use-cases. But there is one
        situation where this does not work: 
      </p>

      <p>
        <b>
          Based on cms data like json, markdown or any data from an api that relies
          on specific react-components we have to add all possible components into the
          bundle to archieve an correct prerendering of the page
        </b>
      </p>

      <p>
        Following are some components that are already code-splitted:
      </p>

      <widgets.WidgetExample1/>
      <widgets.WidgetExample2/>

      <p>
        These widgets are manually added in gatsby-node under 
        the <b>widgets</b> key. All these widgets are added to the page 
        and won't get added to any other page. When you build the app
        you can see, that these widgets are added as an async script to the dom
        and are loaded seperatly with the prefix <b>widget--</b>. Check your network
        tab
      </p>

      <p>
        That is an very basic example and won't happen in real apps. So let's get
        more realistic: We create some blog posts that can render custom components.
        I've created some posts under <b>src/cms/posts/[post].json</b>.
        These posts are picked um by the graphql-layer and we create pages for each post:
      </p>

      <ul>
        <li><Link to='/posts/post-1'>Post 1</Link></li>
        <li><Link to='/posts/post-2'>Post 2</Link></li>
      </ul>

      <p>
        If you inspect the network you can see, that all widgets that are used by my
        posts are injected with a preload flag. that is done similar than gatsby preloads
        pages. When you click on a post the post will only render when all widgets are
        fetched --- just like page-components
      </p>

      <p>
        Some interresting feature that is missing is, that we could enable "widget-queries"
        just like normal page queries. That could be a killer feature because it could enable
        dyamic queries deep within your component tree.<br/>
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  p {
    font-size: 18px;
  }
`