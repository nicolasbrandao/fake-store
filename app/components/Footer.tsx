'use client'

import React, { useEffect, useContext } from 'react'
import classNames from 'classnames'
import { AiOutlineStar } from 'react-icons/ai'
import { BiGitRepoForked } from 'react-icons/bi'
import { FiShoppingBag } from 'react-icons/fi'
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
    'h-[10rem]',
    'items-center',
    'justify-between',
    'py-8',
    'px-[10rem]',
    'relative',
    'bottom-0'
  )

  const logosContainerClass = classNames(
    'flex',
    'flex-col',
    'gap-4',
    'items-center'
  )

  const apiContainerClass = classNames('flex', 'gap-2', 'items-center')

  const apiLogoWrapperClass = classNames(
    'text-3xl',
    'before:content-["{"]',
    'after:content-["}"]',
    'flex',
    'items-center',
    'gap-1'
  )

  const statsWrapperClass = classNames(
    'flex',
    'items-center',
    'justify-center',
    'gap-4'
  )

  const statsContainer = classNames('flex', 'items-center', 'justify-center')

  return (
    <footer className={footerClass}>
      <div className={logosContainerClass}>
        <Brand />
        <a
          className={apiContainerClass}
          href="https://fakestoreapi.com/"
          target="_blank"
          rel="noreferrer"
        >
          <div className={apiLogoWrapperClass}>
            <FiShoppingBag />
          </div>
          Fake Store API
        </a>
      </div>
      <a
        href="https://github.com/nicolasbrandao/fake-store"
        target="_blank"
        rel="noreferrer"
      >
        <p>Designed & Built by Nícolas Brandão</p>
        <div className={statsWrapperClass}>
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
