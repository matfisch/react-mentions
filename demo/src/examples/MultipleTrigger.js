import React from 'react'

import { Mention, MentionsInput } from '../../../src'

import { provideExampleValue } from './higher-order'

import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'

// use first/outer capture group to extract the full entered sequence to be replaced
// and second/inner capture group to extract search string from the match
const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/

function MultipleTriggers({ value, data, onChange, onAdd }) {
  return (
    <div className="multiple-triggers">
      <h3>Multiple trigger patterns</h3>
      <p>Mention people using '@' + username or type an email address</p>

      <MentionsInput
        value={value}
        onChange={onChange}
        style={defaultStyle}
        markup="@[__display__](__type__:__id__)"
        placeholder={"Mention people using '@'"}
      >
        <Mention
          type="user"
          trigger="@"
          data={data}
          renderSuggestion={(suggestion, search, highlightedDisplay) => (
            <div style={{ display: 'flex', 'align-items': 'center' }}>
              <img src="https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg" alt="funny cat" height="24" width="24" style={{ 'margin-right': '0.8rem'}}/>
              <span>{suggestion.display}</span>
              <span style={{ 'margin': '0 0.8rem' }}>.</span>
              <span>username</span>
            </div>
          )}
          onAdd={onAdd}
          style={defaultMentionStyle}
        />

        <Mention
          type="email"
          trigger={emailRegex}
          data={search => [{ id: search, display: search }]}
          onAdd={onAdd}
          style={{ backgroundColor: '#d1c4e9' }}
        />
      </MentionsInput>
    </div>
  )
}

const asExample = provideExampleValue(
  "Hi @[John Doe](user:johndoe), \n\nlet's add @[joe@smoe.com](email:joe@smoe.com) and @[John Doe](user:johndoe) to this conversation... "
)

export default asExample(MultipleTriggers)
