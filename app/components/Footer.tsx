'use client'

import React, { useEffect, useContext } from 'react'
import classNames from 'classnames'
import { AiOutlineStar } from 'react-icons/ai'
import { BiGitRepoForked } from 'react-icons/bi'
import Brand from './common/Brand'
import fetchGithubStats from '../lib/fetchGithubStats'
import { actionTypes, StoreContext } from '../context/store'

export default function Footer() {
  const { state, dispatch } = useContext(StoreContext)

  useEffect(() => {
    fetchGithubStats().then(({ stargazers_count, forks_count }) => {
      dispatch({
        type: actionTypes.fetchGithubStats,
        payload: { stargazers_count, forks_count },
      })
    })
  }, [dispatch])

  const footerClass = classNames(
    'flex',
    'h-[15rem]',
    'items-center',
    'justify-between',
    'py-8',
    'px-[10rem]'
  )

  const statsWrapper = classNames(
    'flex',
    'items-center',
    'justify-center',
    'gap-4'
  )

  const statsContainer = classNames('flex', 'items-center', 'justify-center')

  return (
    <footer className={footerClass}>
      <div>
        <Brand />
      </div>
      <a
        href="https://github.com/nicolasbrandao/fake-store"
        target="_blank"
        rel="noreferrer"
      >
        <p>Designed & Built by Nícolas Brandão</p>
        <div className={statsWrapper}>
          <div className={statsContainer}>
            <AiOutlineStar />
            <span>{state.githubStats.stars}</span>
          </div>
          <div className={statsContainer}>
            <BiGitRepoForked />
            <span>{state.githubStats.forks}</span>
          </div>
        </div>
      </a>
    </footer>
  )
}
