import React from "react"
import { css, cx } from 'emotion';
import {neutral, space} from '@guardian/src-foundations'

// CSS

const leftCol = css`float: left; width: 25%;`;
const rightCol = css`float: right; width: 75%;`;

const avatar = (avatarSize: number): string => css`
  border-radius: ${avatarSize}px;
  width: ${avatarSize}px;
  height: ${avatarSize}px;
`
const pick = css`
  width: 200px;
`

const pickComment = css`
  padding: ${space[3]}px;
  background-color: ${neutral[97]};
`

const filterBar = css`
  padding: ${space[3]}px 0;
  border-bottom: 1px solid ${neutral[97]};
  border-top: 1px solid ${neutral[97]};
  display: flex;
  list-style: none;

  li  {
    flex: 1;
  }
`

const commentControls = css`
  display: flex;

  li {
    flex: 1;
  }
`

// Components
const TinyGu = () => (<>
  <svg width="36" height="36" viewBox="0 0 36 36">
    <path d="M18 0a18 18 0 1 0 0 36 18 18 0 0 0 0-36"></path>
    <path fill="#FFF" d="M21.2 4.4c2.3.4 5.3 2 6.3 3.1v5.2H27L21.2 5v-.6zm-2.2.4c-4 0-6.3 5.6-6.3 13.2 0 7.7 2.2 13.3 6.3 13.3v.6c-6 .4-14.4-4.2-14-13.8A13.3 13.3 0 0 1 19 4v.7zm10.4 14.4l-1.9.9v8.6c-1 1-3.8 2.6-6.3 3.1V19.9l-2.2-.7v-.6h10.4v.6z"></path>
</svg>
</>);

// Test Data
const comments = [
  {
    name: 'Nic',
    avatar: 'https://i.pravatar.cc/300?1',
    message: "I love Go, go go go.",
    upvotes: 0
  },
  {
    name: 'Gareth',
    avatar: 'https://i.pravatar.cc/300?2',
    message: "This is a test comment, test test test.",
    upvotes: 10
  }
]

function App() {
  return (
    <div className="App">
      <div className={leftCol}>
        {/* User Details */}
        <img src="https://i.pravatar.cc/300" alt="" className={avatar(80)} />
        <p>You are signed in as  <a href="">Username</a></p>

      </div>
      <div className={rightCol}>

        {/* Comment Form */}
        <div>
          <textarea placeholder="Join the discussion"></textarea>
          <button>Post your comment</button>
        </div>


        {/* All Picks */}
        <div>
          {/* Single Pick */}
          <div className={pick}>
            <div className={pickComment}>
              <h3>Guardian Pick</h3>
              <p>Comments on this piece are premoderated to ensure discussion remains on topics raised by the writer. Please be aware there may be a short delay in comments appearing on the site.</p>
                <a href="https://discussion.theguardian.com/comment-permalink/137730537">Jump to this comment</a>
            </div>
            <div>
              <img src="https://i.pravatar.cc/300?random" alt="" className={avatar(60)} />
              <p>Community Mod</p>
              <time>1 hr ago</time>
              <p><TinyGu /> staff pick</p>
              <p>Commentvotes</p>
            </div>
          </div>
        </div>


        {/* Filter bar */}
        <ul className={filterBar}>
          <li>Order by</li>
          <li>Show</li>
          <li>Threads</li>
        </ul>

        {/* Comments */}
        {comments.map(comment => (

          <div className={css`border-bottom: 1px solid ${neutral[97]}`}>
            <img src={comment.avatar} alt={comment.name} className={cx(avatar(60), css`float: left;`)} />
            <p className={css`float: left;`}>{comment.name}</p>
            <p className={css`display: block; clear: left;`}>{comment.message}</p>
            <p>{comment.upvotes}</p>
            <div className={commentControls}>
              <li>reply</li>
              <li>share</li>
              <li>pick</li>
              <li>report</li>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default App;