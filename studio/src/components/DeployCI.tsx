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

  console.log(process.env.SANITY_STUDIO_TOKEN_GITHUB)
  const _onClick = async () => {
    //https://github.com/settings/tokens/new
    const response = await fetch(
      'https://api.github.com/repos/ahmedghazi/aeai-portfolio/dispatches',
      {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          Accept: 'application/vnd.github+json',
          Authorization: `token ${process.env.SANITY_STUDIO_TOKEN_GITHUB}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          // owner: 'ahmedghazi',
          // repo: 'aeai-portfolio',
          event_type: 'deploy-from-sanity',
          client_payload: {
            message: `trigger from deploy ci inside sanity on ${new Date()}`,
          },
        }),
      },
    )
    console.log(response)
    // const json = await response.json()
    // console.log(json)
    if (response.status === 204) {
      alert('done')
    }
  }

  return (
    <Card padding={4}>
      <Inline space={[3, 3, 4]}>
        <Button onClick={_onClick}>My custom tool!</Button>
        <a
          href="https://github.com/ahmedghazi/aeai-portfolio/actions"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://github.com/ahmedghazi/aeai-portfolio/actions/workflows/dploy.yml/badge.svg"
            alt=""
          />
        </a>
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
