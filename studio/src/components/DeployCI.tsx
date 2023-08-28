import React, {ComponentType, useState} from 'react'
import {type Tool} from 'sanity'
import {Card, Inline, Button, Avatar} from '@sanity/ui'
import {DashboardIcon} from '@sanity/icons'

/*

curl -H "Authorization: token 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" \
    -H 'Accept: application/vnd.github.everest-preview+json' \
    "https://api.github.com/repos/ahmedghazi/aeai-portfolio/dispatches" \
    -d '{"event_type": "awesomeness", "client_payload": {"foo": "bar"}}'
*/

const DeployComponent = () => {
  const [status, setStatus] = useState<string>('')

  const _onClick = async () => {
    const response = await fetch(
      'https://api.github.com/repos/ahmedghazi/aeai-portfolio/dispatches',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'token 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',
          Accept: 'application/vnd.github.everest-preview+json',
        },
        body: JSON.stringify({
          event_type: 'deploy from sanity',
          client_payload: {},
        }),
      },
    )
  }

  return (
    <Card padding={4}>
      <Inline space={[3, 3, 4]}>
        <Button onClick={_onClick}>My custom tool!</Button>
        <img
          src="https://github.com/ahmedghazi/aeai-portfolio/actions/workflows/dploy.yml/badge.svg"
          alt=""
        />
      </Inline>
    </Card>
  )
}

const DeployCI: any = () => {
  return {
    title: 'Deploy CI',
    name: 'deploy-ci', // localhost:3333/my-custom-tool
    icon: DashboardIcon,
    component: DeployComponent,
  }
}

export default DeployCI
