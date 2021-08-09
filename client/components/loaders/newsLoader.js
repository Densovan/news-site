import React from 'react'
import ContentLoader from 'react-content-loader'
import { Card } from "antd";

const Medium = props => (
    <div>
        {[0,1,2,4,5,6].map(data  => {
            return(
                <Card className="card-article" key={data}>
                   <ContentLoader viewBox="0 0 660 130" height="100%" width="100%" {...props}>
                     <circle cx="25" cy="21" r="20" />
                     <rect x="50" y="12" rx="3" ry="3" width="88" height="5" /> 
                     <rect x="49" y="25" rx="3" ry="3" width="52" height="6" />
                     <rect x="497" y="10" rx="0" ry="0" width="144" height="144" />
                     <rect x="10" y="52" rx="0" ry="0" width="464" height="8" />
                     <rect x="10" y="72" rx="0" ry="0" width="364" height="8" />
                     <rect x="10" y="92" rx="0" ry="0" width="264" height="8" />
                     <rect x="10" y="122" rx="0" ry="0" width="464" height="32" />
                   </ContentLoader>
                </Card>
            )
        })} 
    </div>
)

Medium.metadata = {
  name: 'DaniloWoz',
  github: 'danilowoz',
  description: 'Medium',
  filename: 'Medium',
}

export default Medium