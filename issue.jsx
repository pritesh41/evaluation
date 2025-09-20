import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const issuecard= React.memo(function issuecard ({issue})){
    return (
        <div>
            <div>
                <strong>{issue.title}</strong>
            </div>
            <div>
                Lable: {issue.labels.map((1) => 1.name).join(', ') || 'None'}
            </div>
        </div>
    )
}

function issue() {
  return (
    <div>
      
    </div>
  )
}

export default issue
