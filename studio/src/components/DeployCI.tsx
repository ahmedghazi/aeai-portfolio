import React, {ComponentType, useState} from 'react'
import {type Tool} from 'sanity'
import {Card, Inline, Button, Avatar} from '@sanity/ui'
import {DashboardIcon} from '@sanity/icons/Dashboard'

const DeployComponent = () => {
  const [status, setStatus] = useState<string>('')

  const _onClick = async () => {
    //https://github.com/settings/tokens/new
    setStatus('sending...')
    const response = await fetch(
      'https://api.github.com/repos/ahmedghazi/aeai-portfolio/dispatches',
      {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          Accept: 'application/vnd.github+json',
          Authorization: `token ${import.meta.env.SANITY_STUDIO_TOKEN_GITHUB}`,
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
      setStatus('done')
      // alert('done')
      setTimeout(() => {
        setStatus('')
      }, 20000)
    }
  }

  return (
    <Card padding={4}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={_onClick}>Deploy!</Button>
        <div className="">{status}</div>
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
      </div>
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
